package com.project.mindcare_backend.dto.response;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
    public class UserResponse {
        private Long id;
        private String email;
        private String fullName;
        private String username;
        private String phone;
        private String address;
        private String role;
        private String avatarUrl;
        private Boolean isActive;
        private Boolean profileCompleted;
    }
