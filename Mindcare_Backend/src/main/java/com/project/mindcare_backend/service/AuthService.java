package com.project.mindcare_backend.service;

import com.project.mindcare_backend.config.JwtUtil;
import com.project.mindcare_backend.dto.request.LoginRequest;
import com.project.mindcare_backend.dto.request.RegisterRequest;
import com.project.mindcare_backend.dto.response.AuthResponse;
import com.project.mindcare_backend.enums.UserRole;
import com.project.mindcare_backend.modal.User;
import com.project.mindcare_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepo;
    private final PasswordEncoder encoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;
    private final UserDetailsServiceImpl userDetailsService;


    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail()))
            throw new RuntimeException("Email đã tồn tại");
        if (userRepo.existsByUserName(req.getUsername()))
            throw new RuntimeException("UserName đã tồn tại");

        User user = User.builder()
                .fullName(null)
                .email(req.getEmail())
                .userName(req.getUsername())
                .password(encoder.encode(req.getPassword()))
                .phone(null)
                .address(null)
                .role(UserRole.customer)
                .isActive(true)
                .profileCompleted(false)
                .build();

        userRepo.save(user);
        String token = jwtUtil.generateToken(user);
        return new AuthResponse(token, user.getRole().name(), user.getFullName(), user.getId(), user.getProfileCompleted());
    }

    public AuthResponse login(LoginRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getEmailOrUserName(), req.getPassword()));

        User user = (User) userDetailsService.loadUserByUsername(req.getEmailOrUserName());
        String token = jwtUtil.generateToken(user);
        return new AuthResponse(token, user.getRole().name(), user.getFullName(), user.getId(), user.getProfileCompleted());
    }
}
