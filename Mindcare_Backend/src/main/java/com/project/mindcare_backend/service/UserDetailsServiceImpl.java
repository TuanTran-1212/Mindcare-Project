package com.project.mindcare_backend.service;

import com.project.mindcare_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service("userDetailsService")
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepo;

    @Override
    public UserDetails loadUserByUsername(String emailOrUserName) throws UsernameNotFoundException {
        return userRepo.findByEmail(emailOrUserName)
                .or(() -> userRepo.findByUserName(emailOrUserName))
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + emailOrUserName));
    }
}