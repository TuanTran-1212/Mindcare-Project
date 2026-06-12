package com.project.mindcare_backend.service;

import java.util.List;

public interface UserService {
    List<UserResponse> getAll();

    List<UserResponse> getByRole(String role);

    UserResponse getById(Integer id);

    UserResponse create(UserRequest request);

    UserResponse update(Integer id, UserRequest request);

    void delete(Integer id);
}
