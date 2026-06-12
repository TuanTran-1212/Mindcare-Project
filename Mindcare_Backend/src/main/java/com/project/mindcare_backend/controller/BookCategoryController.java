package com.project.mindcare_backend.controller;

import com.project.mindcare_backend.dto.request.BookCategoryRequest;
import com.project.mindcare_backend.dto.response.BookCategoryResponse;
import com.project.mindcare_backend.service.BookCategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/book-categories")
@RequiredArgsConstructor
public class BookCategoryController {

    private final BookCategoryService service;

    //get all with book count
    @GetMapping
    public ResponseEntity<List<BookCategoryResponse>> getAll() {
        List<BookCategoryResponse> responses = service.getAll();
        return ResponseEntity.ok(responses);//200
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookCategoryResponse> getById(@PathVariable int id) {
        BookCategoryResponse response = service.getById(id);
        return ResponseEntity.ok(response);//200
    }

    @PostMapping
    public ResponseEntity<BookCategoryResponse> save(@Valid @RequestBody BookCategoryRequest request) {
        BookCategoryResponse response = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);//201 + create
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookCategoryResponse> update(@PathVariable int id, @Valid @RequestBody BookCategoryRequest request) {
        BookCategoryResponse response = service.update(id, request);
        return ResponseEntity.ok(response);//200
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.ok("Book category with id: " + id + " deleted successfully");//200 + message
    }
}