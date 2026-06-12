package com.project.mindcare_backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String role;
    private String fullName;
    private Integer userId;
    private boolean profileCompleted;
}
