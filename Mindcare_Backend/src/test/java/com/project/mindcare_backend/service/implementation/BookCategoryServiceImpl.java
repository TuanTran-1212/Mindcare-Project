package com.project.mindcare_backend.service.implementation;

import com.project.mindcare_backend.dto.request.BookCategoryRequest;
import com.project.mindcare_backend.dto.response.BookCategoryResponse;
import com.project.mindcare_backend.modal.BookCategory;
import com.project.mindcare_backend.repository.BookCategoryRepository;
import com.project.mindcare_backend.repository.BookRepository;
import jakarta.persistence.EntityExistsException;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookCategoryServiceImpl implements BookCategoryService {

    private final BookCategoryRepository bookCategoryRepository;
    private final BookRepository bookRepository;

    @Override
    @Transactional(readOnly = true)
    public List<BookCategoryResponse> getAllWithBookCount() {

        return bookCategoryRepository.findAllWithBookCount();
    }

    @Override
    public BookCategoryResponse getById(Integer id) {
        BookCategory bookCategory = bookCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book Category with id: " + id + " not found"));

        return BookCategoryResponse.builder()
                .id(bookCategory.getId())
                .name(bookCategory.getName())
                .isActive(bookCategory.isActive())
                .build();
    }

    @Override
    public BookCategoryResponse create(BookCategoryRequest request) {
        if (bookCategoryRepository.existsByName(request.getName())) {
            throw new EntityExistsException("Book Category with name: " + request.getName() + " already exists");
        }

        BookCategory bookCategory = new BookCategory();

        bookCategory.setName(request.getName());
        bookCategory.setActive(request.isActive());

        // save to database
        bookCategory = bookCategoryRepository.save(bookCategory);

        //return by response
        return BookCategoryResponse.builder()
                .id(bookCategory.getId())
                .name(bookCategory.getName())
                .isActive(bookCategory.isActive())
                .build();
    }

    @Override
    public BookCategoryResponse update(Integer id, BookCategoryRequest request) {
        BookCategory bookCategory = bookCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Book Category with id: " + id + " not found"));

        if (!bookCategory.getName().equalsIgnoreCase(request.getName())
        && bookCategoryRepository.existsByName(request.getName())) {
            throw new EntityExistsException("Book Category with name: " + request.getName() + " already exists");
        }

        bookCategory.setName(request.getName());
        bookCategory.setActive(request.isActive());

        bookCategory = bookCategoryRepository.save(bookCategory);

        return BookCategoryResponse.builder()
                .id(bookCategory.getId())
                .name(bookCategory.getName())
                .isActive(bookCategory.isActive())
                .build();
    }

    @Override
    public void delete(Integer id) {
        BookCategory bookCategory = bookCategoryRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("BookCategory with id: " + id + " not found"));

        bookCategoryRepository.delete(bookCategory);

    }
}