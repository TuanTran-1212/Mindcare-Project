package com.project.mindcare_backend.service;



import com.project.mindcare_backend.dto.request.UpdateProfileRequest;
import com.project.mindcare_backend.dto.response.UserResponse;
import com.project.mindcare_backend.modal.Book;
import com.project.mindcare_backend.modal.User;
import com.project.mindcare_backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {
    @Value("${file.upload-dir}")
    private String uploadDir;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse getUserById(Integer id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return convertToDTO(user);
    }

    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return convertToDTO(user);
    }

    public User findUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    @Transactional
    public UserResponse updateProfile(String email, UpdateProfileRequest request) throws IOException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("Book id: " + email + " not found"));

        // Xóa file cũ nếu có ảnh mới được gửi lên
        String oldImgUrl = user.getAvatarUrl();
        if (request.getAvatarUrl() != null && !request.getAvatarUrl().isEmpty()) {
            // Xóa file cũ
            if (oldImgUrl != null && !oldImgUrl.isEmpty()) {
                String oldFileName = oldImgUrl.substring(oldImgUrl.lastIndexOf("/") + 1);
                Path oldFilePath = Paths.get(uploadDir).resolve("BookImg").resolve(oldFileName);
                try {
                    Files.deleteIfExists(oldFilePath);
                } catch (IOException e) {
                    throw new IOException("Could not delete old file: {}" + oldFilePath);
                }
            }
            // Lưu file mới
            String newFileName = saveFile(request.getAvatarUrl());
            user.setAvatarUrl("/uploads/BookImg/" + newFileName);
        }


        user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setProfileCompleted(true);   // đánh dấu đã hoàn thành profile
        userRepository.save(user);
        return convertToDTO(user);
    }

    @Transactional
    public void changePassword(String email, String oldPassword, String newPassword) {
        User user = findUserByEmail(email);
        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Mật khẩu cũ không đúng");
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    private UserResponse convertToDTO(User user) {
        return UserResponse.builder()
                .id(Long.valueOf(user.getId()))
                .email(user.getEmail())
                .avatarUrl(user.getAvatarUrl())
                .username(user.getUsername())
                .fullName(user.getFullName())
                .phone(user.getPhone())
                .address(user.getAddress())
                .role(user.getRole().name())
                .isActive(user.isActive())
                .profileCompleted(user.getProfileCompleted())
                .build();
    }
    private String saveFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) return null;

        // Lấy thư mục gốc của project (nơi chứa pom.xml)
        String projectRoot = System.getProperty("user.dir");
        Path uploadPath = Paths.get(projectRoot, uploadDir, "BookImg").normalize();

        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String original = file.getOriginalFilename();
        String extension = original.substring(original.lastIndexOf("."));
        String newFileName = UUID.randomUUID().toString() + extension;
        Path filePath = uploadPath.resolve(newFileName);
        file.transferTo(filePath.toFile());

        return newFileName;
    }
}
