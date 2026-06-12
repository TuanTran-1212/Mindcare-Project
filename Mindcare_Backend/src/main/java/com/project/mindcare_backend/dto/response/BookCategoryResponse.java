package com.project.mindcare_backend.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BookCategoryResponse {
    private Integer id;
    private String name;
    private Long bookCount;
    private boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}