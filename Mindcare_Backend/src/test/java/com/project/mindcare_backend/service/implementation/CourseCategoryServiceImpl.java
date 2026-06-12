package com.project.mindcare_backend.service.implementation;

import com.project.mindcare_backend.modal.CourseCategory;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseCategoryServiceImpl implements CourseCategoryService {

    private final CourseCategoryRepository CourseCategoryRepository;


    @Override
    public List<CourseCategoryResponse> getAll() {
        List<CourseCategory> bookCategories = CourseCategoryRepository.findAll();

        return bookCategories.stream().map(
                CourseCategory -> CourseCategoryResponse.builder()
                        .id(CourseCategory.getId())
                        .name(CourseCategory.getName())
                        .isActive(CourseCategory.isActive())
                        .build()

        ).collect(Collectors.toList());
    }

    @Override
    public CourseCategoryResponse getById(Integer id) {
        CourseCategory CourseCategory = CourseCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CourseCategory with id: " + id + " not found"));

        return CourseCategoryResponse.builder()
                .id(CourseCategory.getId())
                .name(CourseCategory.getName())
                .isActive(CourseCategory.isActive())
                .build();
    }

    @Override
    public CourseCategoryResponse create(CourseCategoryRequest request) {
        if (CourseCategoryRepository.existsByName(request.getName())) {
            throw new EntityExistsException("CourseCategory with name: " + request.getName() + " already exists");
        }

        CourseCategory CourseCategory = new CourseCategory();

        CourseCategory.setName(request.getName());
        CourseCategory.setActive(request.isActive());

        // save to database
        CourseCategory = CourseCategoryRepository.save(CourseCategory);

        //return by response
        return CourseCategoryResponse.builder()
                .id(CourseCategory.getId())
                .name(CourseCategory.getName())
                .isActive(CourseCategory.isActive())
                .build();
    }

    @Override
    public CourseCategoryResponse update(Integer id, CourseCategoryRequest request) {
        CourseCategory CourseCategory = CourseCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book Category with id: " + id + " not found"));

        if (!CourseCategory.getName().equalsIgnoreCase(request.getName())
                && CourseCategoryRepository.existsByName(request.getName())) {
            throw new EntityExistsException("Book Category with name: " + request.getName() + " already exists");
        }

        CourseCategory.setName(request.getName());
        CourseCategory.setActive(request.isActive());

        CourseCategory = CourseCategoryRepository.save(CourseCategory);

        return CourseCategoryResponse.builder()
                .id(CourseCategory.getId())
                .name(CourseCategory.getName())
                .isActive(CourseCategory.isActive())
                .build();
    }

    @Override
    public void delete(Integer id) {
        CourseCategory CourseCategory = CourseCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("CourseCategory with id: " + id + " not found"));

        CourseCategoryRepository.delete(CourseCategory);

    }
}