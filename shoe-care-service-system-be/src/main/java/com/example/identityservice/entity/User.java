package com.example.identityservice.entity;

import java.time.LocalDate;

import jakarta.persistence.*;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity(name = "users")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;

    @Column(unique = true, columnDefinition = "varchar(50) COLLATE utf8_unicode_ci")
    String username;

    String password;

    String fullName;

    String email;

    LocalDate dob;

    String phone;

    @Column(name = "created_at")
    LocalDate createdAt;

    @Column(name = "is_active", nullable = false)
    Boolean isActive;

    @ManyToOne
    Role role;

    @PrePersist
    public void prePersist() {
        this.createdAt = LocalDate.now();
        this.isActive = true;
    }
}
