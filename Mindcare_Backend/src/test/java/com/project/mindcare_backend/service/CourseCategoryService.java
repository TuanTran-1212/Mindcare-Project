package com.project.mindcare_backend.service;


import java.util.List;

public interface CourseCategoryService {
    List<CourseCategoryResponse> getAll();

    CourseCategoryResponse getById(Integer id);

    CourseCategoryResponse create(CourseCategoryRequest request);

    CourseCategoryResponse update(Integer id, CourseCategoryRequest request);

    void delete(Integer id);
}