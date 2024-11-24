package com.example.identityservice.dto.response;

import com.example.identityservice.entity.ProductDetail;
import com.example.identityservice.enums.ProductStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ProductResponse {

    @NotNull(message = "ID_IS_REQUIRED")
    Long id;
    String productCategoryName;
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

    Date createAt = new Date();

    ProductStatus status;

    @jakarta.validation.constraints.Size(max =  255, message = "INVALID_LENGTH_OF_DESCRIPTION")
    String description;

    @NotNull(message = "PRODUCT_CATEGORY_ID_IS_REQUIRED")
    Long productCategoryId;

    List<ProductDetailResponse> productDetails;
}
