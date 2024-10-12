package com.example.identityservice.dto.request;

import com.example.identityservice.dto.OrderDetailDTO;
import com.example.identityservice.entity.Client;
import com.example.identityservice.entity.CouponItem;
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
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CreateOrderRequest {
    Date createdAt = new Date();
    Double total;
    Double discount;
    String paymentType;
    String note;
    Long clientId;
    Long couponItemId;
    String userId;
    List<OrderDetailDTO> orderDetails;
}
