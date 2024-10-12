package com.example.identityservice.dto.request;

import com.example.identityservice.entity.Color;
import com.example.identityservice.entity.ProductCategory;
import com.example.identityservice.entity.Size;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class CreateProductRequest {
    @NotNull(message = "NAME_IS_REQUIRED")
    @NotBlank(message = "NAME_IS_REQUIRED")
    @jakarta.validation.constraints.Size(min = 1, max = 255, message = "INVALID_LENGTH_OF_NAME")
    String name;

    @jakarta.validation.constraints.Size(min = 1, max = 255, message = "INVALID_LENGTH_OF_IMAGE")
    String image;
    @NotNull(message = "CODE_IS_REQUIRED")
    @NotBlank(message = "CODE_IS_REQUIRED")
    @jakarta.validation.constraints.Size(min = 1, max = 255, message = "INVALID_LENGTH_OF_CODE")
    String code;
    @NotNull(message = "INPUT_PRICE_IS_REQUIRED")
    Double inputPrice;
    @NotNull(message = "SELL_PRICE_IS_REQUIRED")
    Double sellPrice;

    Date createAt = new Date();

    Boolean isActive = true;
    @jakarta.validation.constraints.Size(min = 0, max =  255, message = "INVALID_LENGTH_OF_DESCRIPTION")
    String description;
    @NotNull(message = "QUANTITY_IS_REQUIRED")
    Integer quantity;
    @NotNull(message = "PRODUCT_CATEGORY_ID_IS_REQUIRED")
    Long productCategoryId;
    @NotNull(message = "COLOR_ID_IS_REQUIRED")
    Long colorId;
    @NotNull(message = "SIZE_ID_IS_REQUIRED")
    Long sizeId;
}
