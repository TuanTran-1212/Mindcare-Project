package com.project.mindcare_backend.repository;

import com.project.mindcare_backend.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUserName(String username);
    boolean existsByEmail(String email);
    boolean existsByUserName(String username);
}
