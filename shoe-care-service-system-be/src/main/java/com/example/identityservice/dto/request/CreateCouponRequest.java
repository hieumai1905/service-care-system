package com.example.identityservice.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CreateCouponRequest {
    Date expireAt;
    Boolean isActive = true;
    @NotNull(message = "TITLE_IS_REQUIRED")
    @NotBlank(message = "TITLE_IS_REQUIRED")
    @Size(max = 255, message = "INVALID_LENGTH_OF_TITLE")
    String title;
    @Min(value = 0, message = "DISCOUNT_MUST_BE_POSITIVE")
    Double discount;
    @Min(value = 0, message = "REQUIRE_VALUE_MUST_BE_POSITIVE")
    Double requireValue;
    @NotNull(message = "IS_PERCENT_IS_REQUIRED")
    Boolean isPercent;
    @NotNull(message = "NUMBER_OF_ITEMS_IS_REQUIRED")
    @Min(value = 0, message = "NUMBER_OF_ITEMS_MUST_BE_POSITIVE")
    Integer numberOfItems;
}
