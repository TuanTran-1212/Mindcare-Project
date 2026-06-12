package com.project.mindcare_backend.dto.response;

import com.project.mindcare_backend.enums.UserRole;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class UserResponse {
    private Integer id;
    private UserRole role;
    private String fullName;
    private String email;
    private String phone;
    private String address;
    private String avatarUrl;
    private boolean isActive;
    private LocalDateTime createdAt;
}
