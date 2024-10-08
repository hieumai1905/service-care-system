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
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserCreationRequest {
    @Size(min = 3, message = "USERNAME_INVALID")
    String username;

    @Size(min = 8, message = "INVALID_PASSWORD")
    String password;

    String fullName;
    String email;
    String phone;

    @DobConstraint(min = 16, message = "INVALID_DOB")
    LocalDate dob;

    String role;
}
