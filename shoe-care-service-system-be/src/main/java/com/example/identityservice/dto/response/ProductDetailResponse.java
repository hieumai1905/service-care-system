package com.example.identityservice.dto.response;

import com.example.identityservice.dto.ColorDTO;
import com.example.identityservice.dto.SizeDTO;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductDetailResponse {
    Long id;
    Long productId;
    String productName;
    Double inputPrice;
    Double sellPrice;
    Long quantity;
    ColorDTO color;
    SizeDTO size;
}
