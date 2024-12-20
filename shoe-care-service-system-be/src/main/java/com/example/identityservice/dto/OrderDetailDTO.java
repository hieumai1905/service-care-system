package com.example.identityservice.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class OrderDetailDTO {
    Long id;
    Long productDetailId;
    String productName;
    String image;
    Double price;
    Integer quantity;
    String productDetailColorName;
    String productDetailSizeName;
}
