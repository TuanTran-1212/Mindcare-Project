package com.project.mindcare_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MindcareBackendApplication {

    public static void main(String[] args) {

        SpringApplication.run(MindcareBackendApplication.class, args);
        System.out.println("🚀 Product Management API is running on http://localhost:8080");
        System.out.println("http://localhost:8080/swagger-ui.html");
    }

}
