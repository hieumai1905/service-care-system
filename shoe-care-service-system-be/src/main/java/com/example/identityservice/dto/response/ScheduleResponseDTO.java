package com.example.identityservice.dto.response;

import com.example.identityservice.enums.PaymentMethod;
import com.example.identityservice.enums.ScheduleStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ScheduleResponseDTO {
    Long id;
    Date createdAt;
    Date returnAt;
    ScheduleStatus status;
    Double paid;
    Double cost;
    String note;
    Long clientId;
    String clientName;
    Double discount;
    String clientTel;
    String clientEmail;
    PaymentMethod paymentType;
    String userId;
    String userName;
    Long materialId;
    String materialName;
    Long brandId;
    String brandName;
    Long colorId;
    String colorName;
    Long sizeId;
    String sizeName;
    long scheduleDetailId;
    String scheduleDetailShoeServiceAsString;
}
