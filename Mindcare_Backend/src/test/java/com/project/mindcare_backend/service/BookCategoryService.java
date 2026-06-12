package com.project.mindcare_backend.service;

import com.project.mindcare_backend.dto.request.BookCategoryRequest;
import com.project.mindcare_backend.dto.response.BookCategoryResponse;

import java.util.List;

public interface BookCategoryService {

    List<BookCategoryResponse> getAllWithBookCount();

    BookCategoryResponse getById(Integer id);

    BookCategoryResponse create(BookCategoryRequest request);

    BookCategoryResponse update(Integer id, BookCategoryRequest request);

    void delete(Integer id);
}