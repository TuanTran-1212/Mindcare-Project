package com.project.mindcare_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/course-categories")
@RequiredArgsConstructor
public class CourseCategoryController {

    private final CourseCategoryService service;

    @GetMapping
    public ResponseEntity<List<CourseCategoryResponse>> getAll() {
        List<CourseCategoryResponse> responses = service.getAll();
        return ResponseEntity.ok(responses);//200
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseCategoryResponse> getById(@PathVariable int id) {
        CourseCategoryResponse response = service.getById(id);
        return ResponseEntity.ok(response);//200
    }

    @PostMapping
    public ResponseEntity<CourseCategoryResponse> save(@Valid @RequestBody CourseCategoryRequest request) {
        CourseCategoryResponse response = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);//201 + create
    }

    @PutMapping("/{id}")
    public ResponseEntity<CourseCategoryResponse> update(@PathVariable int id, @Valid @RequestBody CourseCategoryRequest request) {
        CourseCategoryResponse response = service.update(id, request);
        return ResponseEntity.ok(response);//200
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> delete(@PathVariable int id) {
        service.delete(id);
        return ResponseEntity.ok("Course category with id: " + id + " deleted successfully");//200 + message
    }
}