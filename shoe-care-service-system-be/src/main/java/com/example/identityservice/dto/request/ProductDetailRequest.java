package com.example.identityservice.dto.request;

import com.example.identityservice.dto.ColorDTO;
import com.example.identityservice.dto.SizeDTO;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ProductDetailRequest {

    Long id;

    @NotNull(message = "PRODUCT_ID_IS_REQUIRED")
    Long productId;

    @NotNull(message = "INPUT_PRICE_IS_REQUIRED")
    Double inputPrice;

    @NotNull(message = "SELL_PRICE_IS_REQUIRED")
    Double sellPrice;

    @NotNull(message = "QUANTITY_IS_REQUIRED")
    Integer quantity;

    @NotNull(message = "COLOR_ID_IS_REQUIRED")
    Long colorId;

    ColorDTO colorName;

    SizeDTO sizeName;

    @NotNull(message = "SIZE_ID_IS_REQUIRED")
    Long sizeId;
}
