package com.project.mindcare_backend.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CourseCategoryResponse {
    private Integer id;
    private String name;
    private boolean isActive; // active/inactive
}