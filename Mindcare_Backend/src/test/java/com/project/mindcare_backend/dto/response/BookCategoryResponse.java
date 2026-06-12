package com.project.mindcare_backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BookCategoryResponse {
    private Integer id;
    private String name;
    private Long bookCount;
    private boolean isActive;
}