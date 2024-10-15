package com.example.identityservice.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BranchDTO {
    Long id;
    @NotNull(message = "NAME_IS_REQUIRED")
    String name;
}
