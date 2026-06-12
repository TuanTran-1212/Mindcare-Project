package com.project.mindcare_backend.repository;

import com.project.mindcare_backend.enums.UserRole;
import com.project.mindcare_backend.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByRole(UserRole role);
    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);
}
