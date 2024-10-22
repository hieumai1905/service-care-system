package com.example.identityservice.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShippingProvinceDTO {
    Long id;
    @NotNull(message = "NAME_IS_REQUIRED")
    String name;
    @Min(message = "FEE_MUST_BE_POSITIVE", value = 0L)
    Double fee;
}
