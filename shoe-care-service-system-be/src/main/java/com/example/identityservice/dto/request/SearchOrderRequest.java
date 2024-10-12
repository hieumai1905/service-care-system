package com.example.identityservice.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SearchOrderRequest extends PaginationRequest{
    String keyWord;
    Date orderDate;
    Boolean isActive;

    public void validateInput(){
        super.validateInput();
        if(keyWord != null)
            keyWord = keyWord.trim().toLowerCase();
    }
}
