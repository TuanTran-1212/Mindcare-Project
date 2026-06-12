package com.project.mindcare_backend.service.implementation;

import com.project.mindcare_backend.dto.request.BookRequest;
import com.project.mindcare_backend.dto.response.BookResponse;
import com.project.mindcare_backend.modal.Book;
import com.project.mindcare_backend.repository.BookRepository;
import com.project.mindcare_backend.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public List<BookResponse> findAll() {
        List<Book> books = bookRepository.findAll();

//        return books.stream().map(
//                book -> BookResponse.builder()
//                        .id(book.getId())
//                        .bookCategory()
//
//        ).collect(Collectors.toList());
        return List.of();
    }

    @Override
    public List<BookResponse> findByIsDeletedFalse() {
        return List.of();
    }

    @Override
    public BookResponse getById(Integer id) {
        return null;
    }

    @Override
    public BookResponse create(BookRequest bookRequest) {
        return null;
    }

    @Override
    public BookResponse update(BookRequest bookRequest) {
        return null;
    }

    @Override
    public void delete(Integer id) {

    }

    @Override
    public void deleteByIsDeleted(Integer id) {

    }
}
