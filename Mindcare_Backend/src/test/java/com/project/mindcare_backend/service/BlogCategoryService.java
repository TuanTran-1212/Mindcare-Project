package com.project.mindcare_backend.service;

import java.util.List;

public interface BlogCategoryService {
    List<BlogCategoryResponse> getAll();

    BlogCategoryResponse getById(Integer id);

    BlogCategoryResponse create(BlogCategoryRequest request);

    BlogCategoryResponse update(Integer id, BlogCategoryRequest request);


    void delete(Integer id);
}