package com.project.mindcare_backend.modal;

import com.project.mindcare_backend.enums.CourseLevel;
import com.project.mindcare_backend.modal.category.BookCategory;
import com.project.mindcare_backend.modal.category.CourseCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

@Entity
@Table(name = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_category_id")
    private CourseCategory category;

    @Column(name = "title", length = 200, nullable = false)
    private String title;

    @Column(name = "author", length = 30, nullable = false)
    private String author;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "img_url", length = 400)
    private String imgUrl;


    @Column(name = "original_price", precision = 10, scale = 2, nullable = false)
    private BigDecimal originalPrice;

    @Column(name = "discount_percent", precision = 5, scale = 2)
    private BigDecimal discountPercent = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "level")
    private CourseLevel level;

    @Column(name = "isActive")
    private boolean isActive = true;

    @Column(name = "isDeleted", nullable = false)
    private boolean isDeleted = false;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;


    //compute price
    public BigDecimal getFinalPrice() {
        if (originalPrice == null) return BigDecimal.ZERO;

        BigDecimal discount = discountPercent != null ? discountPercent : BigDecimal.ZERO;

        BigDecimal multiply = BigDecimal.ONE.subtract
                (discount.divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP));//1 - (discount/100,0000)
        return originalPrice.multiply(multiply).setScale(2, RoundingMode.HALF_UP);// original * multiply
    }
}
