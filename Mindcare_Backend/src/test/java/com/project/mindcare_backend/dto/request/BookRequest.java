package com.project.mindcare_backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BookRequest {

    private Integer bookCategoryId;   // có thể null, nếu không có category
    @NotNull(message = "Book title is required")
    private String title;

    @NotNull(message = "Book author is required")
    private String author;

    @NotNull(message = "Book publisher is required")
    private String publisher;

    @NotNull(message = "Book published year is required")
    private Integer publishedYear;

    private String description;

    private String imgUrl;
    private Integer stock;
    @NotNull(message = "Book price is required")
    private BigDecimal originalPrice;

    private BigDecimal discountPercent;

    private Integer pages;//INterger wrapper can null

}
