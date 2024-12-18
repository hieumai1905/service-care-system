package com.example.identityservice.dto.request;

import com.example.identityservice.enums.PaymentMethod;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ScheduleCreationRequest {
    Long clientId;
    String userId;
    Long materialId;
    Long brandId;
    Long colorId;
    Long sizeId;
    Double paid;
    Double cost;
    Double discount;
    PaymentMethod paymentType;
    String note;
    Set<Integer> shoeServiceIds;
    Date returnAt;
}
