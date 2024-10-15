package com.example.identityservice.dto.request;

import com.example.identityservice.dto.ScheduleDetailDTO;
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
public class CreateScheduleRequest {
    Date scheduleAt;
    Date returnAt;
    String phoneNumber;
    String status;
    Boolean paid;
    Double cost;
    String getLocation;
    String note;
    Boolean isHomeReturn;
    Long branchId;
    Long clientId;
    String userId;
    List<ScheduleDetailDTO> scheduleDetails;
}
