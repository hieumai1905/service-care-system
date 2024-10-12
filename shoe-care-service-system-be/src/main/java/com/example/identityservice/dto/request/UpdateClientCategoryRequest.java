package com.example.identityservice.dto.request;

import jakarta.validation.constraints.NotNull;
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
public class UpdateClientCategoryRequest extends CreateClientCategoryRequest {
    @NotNull(message = "ID_IS_REQUIRED")
    Long id;

//    public void validateInput(){
//        super.validateInput();
//        ValidateUtils.checkNullOrEmpty(id, "Client category id");
//    }
}
