package com.project.mindcare_backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class BookResponse {
    private Integer id;
    private Integer bookCategoryId;
    private String bookCategoryName;
    private String title;
    private String author;
    private String publisher;
    private Integer publishedYear;
    private String description;
    private String imgUrl;
    private Integer stock;
    private BigDecimal originalPrice;
    private BigDecimal discountPercent;
    private Integer pages;//INterger wrapper can null
    private boolean isActive;
    private boolean isDeleted;
    private LocalDateTime createdAt;
}
