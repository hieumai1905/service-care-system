package com.example.identityservice.dto.request;

import com.example.identityservice.enums.OrderStatus;
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
public class UpdateOrderRequest extends CreateOrderRequest{
    Long id;
    String userFullName;
    String couponCode;
    String clientName;
    OrderStatus status;
    Boolean couponIsPercent;
}
