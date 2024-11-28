package com.example.identityservice.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UpdateProductRequest extends CreateProductRequest {
    @NotNull(message = "ID_IS_REQUIRED")
    Long id;
    String productCategoryName;

    String rangePrice;

    String quantity;
}
