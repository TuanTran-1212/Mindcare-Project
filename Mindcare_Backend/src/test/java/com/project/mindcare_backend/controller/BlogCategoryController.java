package com.project.mindcare_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog-categories")
@RequiredArgsConstructor
public class BlogCategoryController {

    private final BlogCategoryService service;

    @GetMapping
    public ResponseEntity<List<BlogCategoryResponse>> getAll() {
        List<BlogCategoryResponse> responses = service.getAll();
        return ResponseEntity.ok(responses);//200
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogCategoryResponse> getById(@PathVariable int id) {
        BlogCategoryResponse response = service.getById(id);
        return ResponseEntity.ok(response);//200
    }

    @PostMapping
    public ResponseEntity<BlogCategoryResponse> save(@Valid @RequestBody BlogCategoryRequest request) {
        BlogCategoryResponse response = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);//201 + create
    }

    @PutMapping("/{id}")
    public ResponseEntity<BlogCategoryResponse> update(@PathVariable int id, @Valid @RequestBody BlogCategoryRequest request) {
        BlogCategoryResponse response = service.update(id, request);
        return ResponseEntity.ok(response);//200
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.ok("Blog category with id: " + id + " deleted successfully");//200 + message
    }
}