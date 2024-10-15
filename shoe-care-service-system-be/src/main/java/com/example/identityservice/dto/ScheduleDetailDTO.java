package com.example.identityservice.dto;

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
public class ScheduleDetailDTO {
    Long id;
//    String size;
    String description;
    Long materialId;
    String materialName;
    Long shoeServiceId;
    String shoeServiceName;
    Long colorId;
    String colorName;
    Long _sizeId;
    String _sizeName;
}
