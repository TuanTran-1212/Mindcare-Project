package com.project.mindcare_backend.repository;

import com.project.mindcare_backend.enums.StatusEnum;
import com.project.mindcare_backend.modal.CourseCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CourseCategoryRepository extends JpaRepository<CourseCategory, Integer> {
    boolean existsByName(String name);
    List<CourseCategory> findByStatus(StatusEnum status);
}