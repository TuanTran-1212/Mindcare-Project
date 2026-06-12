package com.project.mindcare_backend.controller;

import com.project.mindcare_backend.dto.request.BookRequest;
import com.project.mindcare_backend.dto.response.BookResponse;
import com.project.mindcare_backend.modal.Book;
import com.project.mindcare_backend.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService service;

    @GetMapping
    public ResponseEntity<List<BookResponse>> getAll() {

        return ResponseEntity.ok(service.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getById(@PathVariable int id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> create(@Valid @ModelAttribute BookRequest request) throws IOException {
        return ResponseEntity.ok(service.create(request));
    }


    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<BookResponse> update(@PathVariable Integer id, @Valid @ModelAttribute BookRequest bookRequest) throws IOException {
        return ResponseEntity.ok(service.update(id, bookRequest));
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
