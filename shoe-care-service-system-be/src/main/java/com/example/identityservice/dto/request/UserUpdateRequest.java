package com.example.identityservice.dto.request;

import java.time.LocalDate;

import jakarta.validation.constraints.Size;

import com.example.identityservice.validator.DobConstraint;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserUpdateRequest {
    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;

    String fullName;
    String email;
    String phone;
    Boolean isActive;

    @DobConstraint(min = 16, message = "INVALID_DOB")
    LocalDate dob;

    String role;
}
