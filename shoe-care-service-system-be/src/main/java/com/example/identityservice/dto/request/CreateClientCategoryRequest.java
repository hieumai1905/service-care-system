package com.example.identityservice.dto.request;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CreateClientCategoryRequest {

    @NotNull(message = "TYPE_NAME_IS_REQUIRED")
    @NotBlank(message = "TYPE_NAME_IS_REQUIRED")
    @Size(min = 1, max = 255, message = "INVALID_LENGTH_OF_TYPE_NAME")
    String typeName;
    Boolean isActive;
    @DecimalMin(value = "0.0", message = "DISCOUNT_CANNOT_BE_LESS_THAN_ZERO")
    Double discount;
    @NotNull(message = "DISCOUNT_TYPE_IS_REQUIRED")
    @NotBlank(message = "TYPE_NAME_IS_REQUIRED")
    @Size(min = 1, max = 255, message = "INVALID_LENGTH_OF_DISCOUNT_TYPE")
    String discountType;
    @Size(min = 0, max = 255, message = "INVALID_LENGTH_OF_NOTE")
    String note;
    @DecimalMin(value = "0.0", message = "TOTAL_REQUIRE_CANNOT_BE_NEGATIVE")
    Double totalRequire;

//    public void validateInput(){
//        ValidateUtils.checkNullOrEmpty(typeName, "Type name");
//        ValidateUtils.checkNullOrEmpty(discount, "Discount");
//        ValidateUtils.checkNullOrEmpty(discountType, "Discount Type");
//        ValidateUtils.checkNullOrEmpty(totalRequire, "Total Require");
//
//        typeName = ValidateUtils.checkLength(typeName, "Type name", LENGTH_1, LENGTH_255);
//        discountType = ValidateUtils.checkLength(discountType, "Discount Type", LENGTH_1, LENGTH_255);
//        note = ValidateUtils.checkLength(note, "Note", LENGTH_0, LENGTH_255);
//        isActive = isActive != null && isActive;
//    }
}
