package com.example.identityservice.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Data
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UpdateClientRequest extends CreateClientRequest{
    @NotNull(message = "ID_IS_REQUIRED")
    Long id;
    String clientCategoryTypeName;
    Double clientCategoryDiscount;
    String clientCategoryDiscountType;
    Double clientCategoryTotalRequire;
}
