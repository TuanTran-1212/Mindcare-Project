package com.project.mindcare_backend.service;

import com.project.mindcare_backend.dto.request.BookRequest;
import com.project.mindcare_backend.dto.response.BookResponse;
import com.project.mindcare_backend.modal.Book;
import com.project.mindcare_backend.modal.category.BookCategory;
import com.project.mindcare_backend.repository.BookCategoryRepository;
import com.project.mindcare_backend.repository.BookRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookService {
    @Value("${file.upload-dir}")
    private String uploadDir;
    private final BookRepository bookRepository;
    private final BookCategoryRepository categoryRepository;

    //get all with category
    @Transactional(readOnly = true)
    public List<BookResponse> getAll() {
        List<Book> books = bookRepository.findAllWithCategory();
        return books.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    //getAll with is deleted = false + category
    @Transactional(readOnly = true)
    public List<BookResponse> getAllIsDeletedFalse() {
        return bookRepository.findByIsDeletedFalse();
    }

    //get by id
    @Transactional(readOnly = true)
    public BookResponse getById(Integer id) {
        Book book = bookRepository.findByIdWithCategory(id)
                .orElseThrow(() -> new EntityNotFoundException("Book id: " + id + " not found"));
        return convertToResponse(book);
    }

    //create new Book
    @Transactional
    public BookResponse create(BookRequest request) throws IOException {
        Book book = new Book();

        //check category exist
        if (request.getBookCategoryId() != null) {
            BookCategory category = categoryRepository.findById(request.getBookCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category id: " + request.getBookCategoryId() + " not found"));
            book.setCategory(category);
        } else {
            book.setCategory(null);
        }
        String fileName = saveFile(request.getImgUrl());

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setPublisher(request.getPublisher());
        book.setPublishedYear(request.getPublishedYear());
        book.setDescription(request.getDescription());
        book.setImgUrl("/uploads/BookImg/" + fileName);
        book.setStock(request.getStock());
        book.setOriginalPrice(request.getOriginalPrice());
        book.setDiscountPercent(request.getDiscountPercent());
        book.setPages(request.getPages());

        bookRepository.save(book);
        return convertToResponse(book);
    }

    //update book
    @Transactional
    public BookResponse update(Integer id, BookRequest request) throws IOException {
        Book book = bookRepository.findByIdWithCategory(id)
                .orElseThrow(() -> new EntityNotFoundException("Book id: " + id + " not found"));

        // Xóa file cũ nếu có ảnh mới được gửi lên
        String oldImgUrl = book.getImgUrl();
        if (request.getImgUrl() != null && !request.getImgUrl().isEmpty()) {
            // Xóa file cũ
            if (oldImgUrl != null && !oldImgUrl.isEmpty()) {
                String oldFileName = oldImgUrl.substring(oldImgUrl.lastIndexOf("/") + 1);
                Path oldFilePath = Paths.get(uploadDir).resolve("BookImg").resolve(oldFileName);
                try {
                    Files.deleteIfExists(oldFilePath);
                } catch (IOException e) {
                    throw new IOException("Could not delete old file: {}" + oldFilePath);
                }
            }
            // Lưu file mới
            String newFileName = saveFile(request.getImgUrl());
            book.setImgUrl("/uploads/BookImg/" + newFileName);
        }

        //check category exist
        if (request.getBookCategoryId() != null) {
            BookCategory category = categoryRepository.findById(request.getBookCategoryId())
                    .orElseThrow(() -> new EntityNotFoundException("Category id: " + request.getBookCategoryId() + " not found"));
            book.setCategory(category);
        } else {
            book.setCategory(null);
        }
        String fileName = saveFile(request.getImgUrl());

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setPublisher(request.getPublisher());
        book.setPublishedYear(request.getPublishedYear());
        book.setDescription(request.getDescription());
//        book.setImgUrl("/uploads/BookImg/" + fileName);
        book.setStock(request.getStock());
        book.setActive(request.isActive());
        book.setOriginalPrice(request.getOriginalPrice());
        book.setDiscountPercent(request.getDiscountPercent());
        book.setPages(request.getPages());

        bookRepository.save(book);

        return convertToResponse(book);
    }

    //delete
    @Transactional
    public void delete(Integer id) {
        bookRepository.deleteById(id);
    }

    //delete soft
    @Transactional
    public void softDelete(Integer id) {
        if (!bookRepository.existsById(id)) {
            throw new EntityNotFoundException("Book id: " + id + " not found");
        }
        bookRepository.softDeletedById(id);


    }

    private BookResponse convertToResponse(Book book) {
        BigDecimal finalPrice = book.getFinalPrice();
        String description = book.getDescription();
        if (description == null || description.isEmpty()) {
            description = "Coming soon";
        }
        BookResponse dto = BookResponse.builder()
                .id(book.getId())
                .title(book.getTitle())
                .author(book.getAuthor())
                .publisher(book.getPublisher())
                .publishedYear(book.getPublishedYear())
                .description(description)
                .imgUrl(book.getImgUrl())
                .stock(book.getStock())
                .finalPrice(finalPrice)
                .originalPrice(book.getOriginalPrice())
                .discountPercent(book.getDiscountPercent())
                .pages(book.getPages())
                .isActive(book.isActive())
                .isDeleted(book.isDeleted())
                .createdAt(book.getCreatedAt())
                .updatedAt(book.getUpdatedAt())
                .build();
        if (book.getCategory() != null) {
            dto.setBookCategoryId(book.getCategory().getId());
            dto.setBookCategoryName(book.getCategory().getName());
        } else {
            dto.setBookCategoryId(null);
            dto.setBookCategoryName(null);
        }

        return dto;
    }

    private String saveFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        // Lấy thư mục gốc của project (nơi chứa pom.xml)
        String projectRoot = System.getProperty("user.dir");
        Path uploadPath = Paths.get(projectRoot, uploadDir, "BookImg").normalize();

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String original = file.getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString() + extension;
        Path filePath = uploadPath.resolve(newFileName);
        file.transferTo(filePath.toFile());

        return newFileName;
    }

}
