package com.project.mindcare_backend.controller;

import com.project.mindcare_backend.dto.request.CourseRequest;
import com.project.mindcare_backend.dto.response.CourseResponse;
import com.project.mindcare_backend.service.CourseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/Courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService service;

    @GetMapping
    public ResponseEntity<List<CourseResponse>> getAll() {

        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getById(@PathVariable int id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> create(@Valid @ModelAttribute CourseRequest request) throws IOException {
        return ResponseEntity.ok(service.create(request));
    }


    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<CourseResponse> update(@PathVariable Integer id, @Valid @ModelAttribute CourseRequest CourseRequest) throws IOException {
        return ResponseEntity.ok(service.update(id, CourseRequest));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }

    @DeleteMapping("/soft{id}")
    public void softDelete(@PathVariable Integer id) {
        service.softDelete(id);
    }
}
