package com.project.mindcare_backend.dto.request;


import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest {
    private MultipartFile avatarUrl;

    @NotBlank(message = "Name not blank")
    private String fullName;

    @NotBlank(message = "phone not blank")
    private String phone;

    @NotBlank(message = "address not blank")
    private String address;
}
