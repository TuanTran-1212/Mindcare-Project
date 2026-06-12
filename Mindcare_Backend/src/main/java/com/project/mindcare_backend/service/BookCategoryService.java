package com.project.mindcare_backend.service;

import com.project.mindcare_backend.dto.request.BookCategoryRequest;
import com.project.mindcare_backend.dto.response.BookCategoryResponse;
import com.project.mindcare_backend.modal.category.BookCategory;
import com.project.mindcare_backend.repository.BookCategoryRepository;
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
public class BookCategoryService {
    private final BookCategoryRepository categoryRepository;

    //get all with book count
    @Transactional(readOnly = true)
    public List<BookCategoryResponse> getAll() {
        return categoryRepository.findAllWithBookCount().stream()
                .map(row -> BookCategoryResponse.builder()
                        .id((Integer) row[0])
                        .name((String) row[1])
                        .isActive((Boolean) row[2])
                        .createdAt((LocalDateTime) row[3])
                        .updatedAt((LocalDateTime) row[4])
                        .bookCount((Long) row[5])
                        .build())
                .collect(Collectors.toList());
    }

    //get by id
    @Transactional(readOnly = true)
    public BookCategoryResponse getById(Integer categoryId) {
        Object[] row = categoryRepository.findbyIdWithBookCount(categoryId);
        if (row == null) {
            throw new EntityNotFoundException("Category with " + categoryId + " not found");
        }

        return BookCategoryResponse.builder()
                .id((Integer) row[0])
                .name((String) row[1])
                .isActive((Boolean) row[2])
                .createdAt((LocalDateTime) row[3])
                .updatedAt((LocalDateTime) row[4])
                .bookCount((Long) row[5])
                .build();
    }

    // create new book category
    @Transactional
    public BookCategoryResponse create(BookCategoryRequest request) {

        if (categoryRepository.existsByName(request.getName())) {
            throw new EntityExistsException("Category with " + request.getName() + " already exists");
        }

        BookCategory bookCategory = new BookCategory();
        bookCategory.setName(request.getName());
        bookCategory.setIsActive(request.isActive());

        categoryRepository.save(bookCategory);

        return BookCategoryResponse.builder()
                .id(bookCategory.getId())
                .name(bookCategory.getName())
                .isActive(request.isActive())
                .createdAt(bookCategory.getCreatedAt())
                .updatedAt(bookCategory.getUpdatedAt())
                .build();
    }

    //update category
    @Transactional
    public BookCategoryResponse update(Integer id, BookCategoryRequest request) {
        BookCategory updateCategory = categoryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category with " + id + " not found"));

        if (!updateCategory.getName().equalsIgnoreCase(request.getName()) &&
                categoryRepository.existsByName(request.getName())) {
            throw new EntityExistsException("Category with " + request.getName() + " already exists");
        }

        updateCategory.setName(request.getName());
        updateCategory.setIsActive(request.isActive());
        categoryRepository.save(updateCategory);
        return BookCategoryResponse.builder()
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
        BookCategory deleteCategory = categoryRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Category with " + id + " not found"));

        categoryRepository.delete(deleteCategory);
    }


}
