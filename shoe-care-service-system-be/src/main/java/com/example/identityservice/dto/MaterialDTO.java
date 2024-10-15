package com.example.identityservice.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MaterialDTO {
    Long id;
    @NotNull(message = "NAME_IS_REQUIRED")
    @NotBlank(message = "NAME_IS_REQUIRED")
    String name;
}
