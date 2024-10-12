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
public class ColorDTO {
    Long id;
    @NotNull(message = "NAME_IS_REQUIRED")
    @NotBlank(message = "NAME_IS_REQUIRED")
    String name;
    @NotNull(message = "NAME_IS_REQUIRED")
    @NotBlank(message = "COLOR_HEX_IS_REQUIRED")
    String colorHex;
}
