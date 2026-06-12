package com.project.mindcare_backend.service;

import com.project.mindcare_backend.dto.request.CourseRequest;
import com.project.mindcare_backend.dto.response.CourseResponse;
import com.project.mindcare_backend.enums.CourseLevel;
import com.project.mindcare_backend.modal.Course;
import com.project.mindcare_backend.modal.category.CourseCategory;
import com.project.mindcare_backend.repository.CourseCategoryRepository;
import com.project.mindcare_backend.repository.CourseRepository;
import com.project.mindcare_backend.repository.CourseRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class CourseService {

    @Value("${file.upload-dir}")
    private String uploadDir;
    private final CourseRepository courseRepository;
    private final CourseCategoryRepository categoryRepository;

    //get all with category
    @Transactional(readOnly = true)
    public List<CourseResponse> getAll() {
        List<Course> Courses = courseRepository.findAllWithCategory();
        return Courses.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    //getAll with is deleted = false + category
    @Transactional(readOnly = true)
    public List<CourseResponse> getAllIsDeletedFalse() {
        return courseRepository.findByIsDeletedFalse();
    }

    //get by id
    @Transactional(readOnly = true)
    public CourseResponse getById(Integer id) {
        Course Course = courseRepository.findByIdWithCategory(id)
                .orElseThrow(() -> new EntityNotFoundException("Course id: " + id + " not found"));
        return convertToResponse(Course);
    }

    //create new Course
    @Transactional
    public CourseResponse create(CourseRequest request) throws IOException {
        Course course = new Course();

        //check category exist
        if (request.getCourseCategoryId() != null) {
            CourseCategory category = categoryRepository.findById(request.getCourseCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category id: " + request.getCourseCategoryId() + " not found"));
            course.setCategory(category);
        } else {
            course.setCategory(null);
        }
        String fileName = saveFile(request.getImgUrl());

        course.setTitle(request.getTitle());
        course.setAuthor(request.getAuthor());
        course.setDescription(request.getDescription());
        course.setImgUrl("/uploads/BookImg/" + fileName);
        course.setOriginalPrice(request.getOriginalPrice());
        course.setDiscountPercent(request.getDiscountPercent());
        course.setLevel(CourseLevel.valueOf(String.valueOf(request.getLevel())));

        courseRepository.save(course);
        return convertToResponse(course);
    }

    //update Course
    @Transactional
    public CourseResponse update(Integer id, CourseRequest request) throws IOException {
        Course course = courseRepository.findByIdWithCategory(id)
                .orElseThrow(() -> new EntityNotFoundException("Course id: " + id + " not found"));

        // Xóa file cũ nếu có ảnh mới được gửi lên
        String oldImgUrl = course.getImgUrl();
        if (request.getImgUrl() != null && !request.getImgUrl().isEmpty()) {
            // Xóa file cũ
            if (oldImgUrl != null && !oldImgUrl.isEmpty()) {
                String oldFileName = oldImgUrl.substring(oldImgUrl.lastIndexOf("/") + 1);
                Path oldFilePath = Paths.get(uploadDir).resolve("BookImg").resolve(oldFileName);
                try {
                    Files.deleteIfExists(oldFilePath);
                } catch (IOException e) {
                    throw new IOException("Could not delete old file: {}" + oldFilePath);
                }
            }
            // Lưu file mới
            String newFileName = saveFile(request.getImgUrl());
            course.setImgUrl("/uploads/BookImg/" + newFileName);
        }

        //check category exist
        if (request.getCourseCategoryId() != null) {
            CourseCategory category = categoryRepository.findById(request.getCourseCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category id: " + request.getCourseCategoryId() + " not found"));
            course.setCategory(category);
        } else {
            course.setCategory(null);
        }
        String fileName = saveFile(request.getImgUrl());
        course.setTitle(request.getTitle());
        course.setAuthor(request.getAuthor());
        course.setDescription(request.getDescription());
//        Course.setImgUrl("/uploads/BookImg/" + fileName);
        course.setActive(request.isActive());
        course.setOriginalPrice(request.getOriginalPrice());
        course.setDiscountPercent(request.getDiscountPercent());
        course.setLevel(CourseLevel.valueOf(String.valueOf(request.getLevel())));

        courseRepository.save(course);

        return convertToResponse(course);
    }

    //delete
    @Transactional
    public void delete(Integer id) {
        courseRepository.deleteById(id);
    }

    //delete soft
    @Transactional
    public void softDelete(Integer id) {
        if (!courseRepository.existsById(id)) {
            throw new EntityNotFoundException("Course id: " + id + " not found");
        }
        courseRepository.softDeletedById(id);


    }

    private CourseResponse convertToResponse(Course Course) {
        BigDecimal finalPrice = Course.getFinalPrice();
        String description = Course.getDescription();
        if (description == null || description.isEmpty()) {
            description = "Coming soon";
        }
        CourseResponse dto = CourseResponse.builder()
                .id(Course.getId())
                .title(Course.getTitle())
                .author(Course.getAuthor())
                .description(description)
                .imgUrl(Course.getImgUrl())
                .finalPrice(finalPrice)
                .originalPrice(Course.getOriginalPrice())
                .discountPercent(Course.getDiscountPercent())
                .level(Course.getLevel())
                .isActive(Course.isActive())
                .isDeleted(Course.isDeleted())
                .createdAt(Course.getCreatedAt())
                .updatedAt(Course.getUpdatedAt())
                .build();
        if (Course.getCategory() != null) {
            dto.setCourseCategoryId(Course.getCategory().getId());
            dto.setCourseCategoryName(Course.getCategory().getName());
        } else {
            dto.setCourseCategoryId(null);
            dto.setCourseCategoryName(null);
        }

        return dto;
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        // Lấy thư mục gốc của project (nơi chứa pom.xml)
        String projectRoot = System.getProperty("user.dir");
        Path uploadPath = Paths.get(projectRoot, uploadDir, "BookImg").normalize();

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String original = file.getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString() + extension;
        Path filePath = uploadPath.resolve(newFileName);
        file.transferTo(filePath.toFile());

        return newFileName;
    }
}
