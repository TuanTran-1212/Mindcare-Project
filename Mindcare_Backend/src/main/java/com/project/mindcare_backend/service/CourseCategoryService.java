package com.project.mindcare_backend.service;

import com.project.mindcare_backend.dto.request.CourseCategoryRequest;
import com.project.mindcare_backend.dto.response.CourseCategoryResponse;
import com.project.mindcare_backend.modal.category.CourseCategory;
import com.project.mindcare_backend.repository.CourseCategoryRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseCategoryService {
    private final CourseCategoryRepository categoryRepository;

    //get all with Course count
    @Transactional(readOnly = true)
    public List<CourseCategoryResponse> getAll() {
        return categoryRepository.findAllWithCourseCount().stream()
                .map(row -> CourseCategoryResponse.builder()
                        .id((Integer) row[0])
                        .name((String) row[1])
                        .isActive((Boolean) row[2])
                        .createdAt((LocalDateTime) row[3])
                        .updatedAt((LocalDateTime) row[4])
                        .courseCount((Long) row[5])
                        .build())
                .collect(Collectors.toList());
    }

    //get by id
    @Transactional(readOnly = true)
    public CourseCategoryResponse getById(Integer categoryId) {
        Object[] row = categoryRepository.findbyIdWithCourseCount(categoryId);
        if (row == null) {
            throw new EntityNotFoundException("Category with " + categoryId + " not found");
        }

        return CourseCategoryResponse.builder()
                .id((Integer) row[0])
                .name((String) row[1])
                .isActive((Boolean) row[2])
                .createdAt((LocalDateTime) row[3])
                .updatedAt((LocalDateTime) row[4])
                .courseCount((Long) row[5])
                .build();
    }

    // create new Course category
    @Transactional
    public CourseCategoryResponse create(CourseCategoryRequest request) {

        if (categoryRepository.existsByName(request.getName())) {
            throw new EntityExistsException("Category with " + request.getName() + " already exists");
        }

        CourseCategory CourseCategory = new CourseCategory();
        CourseCategory.setName(request.getName());
        CourseCategory.setIsActive(request.isActive());

        categoryRepository.save(CourseCategory);

        return CourseCategoryResponse.builder()
                .id(CourseCategory.getId())
                .name(CourseCategory.getName())
                .isActive(request.isActive())
                .createdAt(CourseCategory.getCreatedAt())
                .updatedAt(CourseCategory.getUpdatedAt())
                .build();
    }

    //update category
    @Transactional
    public CourseCategoryResponse update(Integer id, CourseCategoryRequest request) {
        CourseCategory updateCategory = categoryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category with " + id + " not found"));

        if (!updateCategory.getName().equalsIgnoreCase(request.getName()) &&
                categoryRepository.existsByName(request.getName())) {
            throw new EntityExistsException("Category with " + request.getName() + " already exists");
        }

        updateCategory.setName(request.getName());
        updateCategory.setIsActive(request.isActive());
        categoryRepository.save(updateCategory);
        return CourseCategoryResponse.builder()
                .id(updateCategory.getId())
                .name(updateCategory.getName())
                .isActive(updateCategory.getIsActive())
                .createdAt(updateCategory.getCreatedAt())
                .updatedAt(updateCategory.getUpdatedAt())
                .build();
    }

    //delete soft active = false
    @Transactional
    public void delete(Integer id) {
        CourseCategory deleteCategory = categoryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category with " + id + " not found"));

        categoryRepository.delete(deleteCategory);
    }
}
