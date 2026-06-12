package com.project.mindcare_backend.modal;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "books")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "book_category_id")
    private BookCategory bookCategory;

    @Column(name = "title", length = 200, nullable = false)
    private String title;

    @Column(name = "author", length = 30, nullable = false)
    private String author;

    @Column(name = "publisher", length = 40, nullable = false)
    private String publisher;

    @Column(name = "published_year",nullable = false)
    private Integer publishedYear;

    @Column(name="description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "img_url", length = 400)
    private String imgUrl;

    @Column(name = "stock",nullable = false)
    private Integer stock;

    @Column(name = "original_price", precision = 10, scale = 2,nullable = false)
    private BigDecimal originalPrice;

    @Column(name = "discount_percent", precision = 5, scale = 2)
    private BigDecimal discountPercent;

    @Column(name = "pages")
    private Integer pages;//INterger wrapper can null

    @Column(name = "isActive")
    private boolean isActive;

    @Column(name = "isDeleted")
    private boolean isDeleted;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
}
