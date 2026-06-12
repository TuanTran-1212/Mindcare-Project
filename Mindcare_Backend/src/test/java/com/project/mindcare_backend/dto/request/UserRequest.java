package com.project.mindcare_backend.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UserRequest {
    @NotNull(message = "full name is required")
    private String fullName;

    @Email(message = "Invalid email format")
    private String email;

    private String phone;
    @NotNull(message = "address is required")

    private String address;

    private String avatarUrl;

    private boolean isActive = true;

    @NotNull(message = "password is required")
    private String password;
}
