package com.project.mindcare_backend.service;

import com.project.mindcare_backend.dto.request.BookRequest;
import com.project.mindcare_backend.dto.response.BookResponse;

import java.util.List;

public interface BookService {
    List<BookResponse> findAll();
    List<BookResponse> findByIsDeletedFalse();
    BookResponse getById(Integer id);
    BookResponse create(BookRequest bookRequest);
    BookResponse update(BookRequest bookRequest);
    void delete(Integer id);
    void deleteByIsDeleted(Integer id);//solf delete
}
