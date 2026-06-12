package com.project.mindcare_backend.dto.request;

import com.project.mindcare_backend.enums.CourseLevel;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

@Data

public class CourseRequest {
    private Integer CourseCategoryId;
    // có thể null, nếu không có category
    @NotNull(message = "Book title is required")
    private String title;

    @NotNull(message = "Book author is required")
    private String author;
    private String description;

    private MultipartFile imgUrl;
    @NotNull(message = "Book price is required")
    private BigDecimal originalPrice;

    private BigDecimal discountPercent;
    private CourseLevel level;

    private boolean isActive;
}
