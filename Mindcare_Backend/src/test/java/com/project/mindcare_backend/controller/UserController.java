package com.project.mindcare_backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponse>> getAll(@RequestParam(required = false) String role) {
        List<UserResponse> userResponseList;

        if (role == null) {
            userResponseList = userService.getAll();
        }else {
            userResponseList = userService.getByRole(role);
        }
        return ResponseEntity.ok(userResponseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getById(@PathVariable int id){
        UserResponse userResponse = userService.getById(id);
        return ResponseEntity.ok(userResponse);
    }



    @PostMapping
    public ResponseEntity<UserResponse> create(@Valid @RequestBody UserRequest userRequest){
        UserResponse userResponse = userService.create(userRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(userResponse);
    }

    @PutMapping
    public ResponseEntity<UserResponse> update(@Valid @RequestBody UserRequest userRequest){
        UserResponse userResponse = userService.create(userRequest);
        return ResponseEntity.ok(userResponse);
    }

    @DeleteMapping
    public ResponseEntity<String> delete(@PathVariable int id){
        userService.delete(id);
        return ResponseEntity.ok("User with id: " + id + " deleted successfully");
    }
}
