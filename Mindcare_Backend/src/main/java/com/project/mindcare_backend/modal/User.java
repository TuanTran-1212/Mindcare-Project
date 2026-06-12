package com.project.mindcare_backend.modal;

import com.project.mindcare_backend.enums.UserRole;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role = UserRole.customer;

    @Column(name = "full_name", length = 200)
    private String fullName;

    @Column(name = "user_name",length = 200, unique = true, nullable = false)
    private String userName;

    @Column(length = 200, unique = true, nullable = false)
    private String email;

    @Column(length = 30, unique = true)
    private String phone;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "avatar_url", length = 400)
    private String avatarUrl;

    @Column(length = 255, nullable = false)
    private String password;

    @Column(name = "is_profile_completed", nullable = false)
    private Boolean profileCompleted = false;

    @Column(name = "isActive")
    private boolean isActive = true;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;


    @PrePersist
    protected void onCreate() {

        if (role == null) {
            role = UserRole.customer;
        }
    }

    // UserDetails methods
    @Override public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }
    @Override public String getUsername() { return email; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return isActive; }
}


