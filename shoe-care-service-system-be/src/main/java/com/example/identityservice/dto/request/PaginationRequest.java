package com.example.identityservice.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import static com.example.identityservice.constant.DefaultValue.PAGE_INDEX;
import static com.example.identityservice.constant.DefaultValue.PAGE_SIZE;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class PaginationRequest {
    Integer pageIndex;
    Integer pageSize;

    public void validateInput(){
        if(pageIndex == null || pageIndex < 1)
            pageIndex = PAGE_INDEX;

        if(pageSize == null || pageSize <= 0)
            pageSize = PAGE_SIZE;
    }
}
