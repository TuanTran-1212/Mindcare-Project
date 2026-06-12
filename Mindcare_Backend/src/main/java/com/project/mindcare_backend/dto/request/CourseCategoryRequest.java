package com.project.mindcare_backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CourseCategoryRequest {
    @NotBlank(message = "Category name is required")
    private String name;

    private boolean isActive; // active/inactive
}
