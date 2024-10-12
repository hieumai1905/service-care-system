package com.example.identityservice.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class SearchClientCategoryRequest extends PaginationRequest {
    String typeName;
    Boolean isActive;
    String discountType;

    public void validateInput(){
        super.validateInput();
        if(typeName != null){
            typeName = typeName.trim().toLowerCase();
        }
        if(discountType != null){
            discountType = discountType.trim().toLowerCase();
        }
    }
}
