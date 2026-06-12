package com.project.mindcare_backend.dto.response;

import com.project.mindcare_backend.enums.CourseLevel;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class CourseResponse {
    private Integer id;
    private Integer courseCategoryId;
    private String courseCategoryName;
    private String title;
    private String author;
    private String description;
    private String imgUrl;
    private BigDecimal originalPrice;
    private BigDecimal discountPercent;
    private BigDecimal finalPrice;
    private CourseLevel level;
    private boolean isActive;
    private boolean isDeleted;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
