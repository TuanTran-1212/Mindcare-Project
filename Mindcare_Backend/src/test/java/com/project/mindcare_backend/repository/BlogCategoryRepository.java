package com.project.mindcare_backend.repository;

import com.project.mindcare_backend.enums.StatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Integer> {
    boolean existsByName(String name);
    List<BlogCategory> findByStatus(StatusEnum status);
}