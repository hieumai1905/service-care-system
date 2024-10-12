package com.example.identityservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CreateShoeServiceRequest {
    @NotNull(message = "NAME_IS_REQUIRED")
    @NotBlank(message = "NAME_IS_REQUIRED")
    String name;
    @NotNull(message = "PRICE_IS_REQUIRED")
    Double price;
    @NotNull(message = "SERVICE_CODE_IS_REQUIRED")
    String serviceCode;
    @NotNull(message = "INPUT_PRICE_IS_REQUIRED")
    Double inputPrice;
    @NotNull(message = "SELL_PRICE_IS_REQUIRED")
    Double sellPrice;
    @NotNull(message = "PROFITS_IS_REQUIRED")
    Double profits;
    Date createAt = new Date();
//    @NotNull(message = "IS_ACTIVE_IS_REQUIRED")
    Boolean isActive = true;
    @Size(min = 0, max =  255, message = "INVALID_LENGTH_OF_NOTE")
    String note;
    @NotNull(message = "CONSUMING_TIME_IS_REQUIRED")
    Double consumingTime;
    @NotNull(message = "CATEGORY_SERVICE_ID_IS_REQUIRED")
    Long categoryServiceId;
    @NotNull(message = "BRAND_ID_IS_REQUIRED")
    Long brandId;
}
