package com.example.identityservice.dto;

import com.example.identityservice.dto.request.UpdateCouponRequest;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CouponItemDTO {
    String code;
    boolean isActive;
    UpdateCouponRequest coupon;
}
