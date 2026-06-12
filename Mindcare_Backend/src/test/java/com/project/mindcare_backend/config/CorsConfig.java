package com.project.mindcare_backend.config;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Áp dụng cho tất cả API /api/**
                .allowedOrigins("http://localhost:5173")  // Cho phép frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // Methods cho phép
                .allowedHeaders("*")  // Cho phép tất cả headers
                .allowCredentials(true)  // Cho phép gửi cookie/auth
                .maxAge(3600);  // Cache CORS preflight trong 1 giờ
    }
}