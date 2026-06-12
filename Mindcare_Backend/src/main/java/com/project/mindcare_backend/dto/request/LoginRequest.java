package com.project.mindcare_backend.dto.request;

import lombok.Data;

@Data
public class LoginRequest {
    private String emailOrUserName;
    private String password;
}
