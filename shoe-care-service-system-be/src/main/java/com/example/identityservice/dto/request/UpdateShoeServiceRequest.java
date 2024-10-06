package com.example.identityservice.dto.request;

import jakarta.validation.constraints.NotNull;
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
public class UpdateShoeServiceRequest extends CreateShoeServiceRequest {
    @NotNull(message = "ID_IS_REQUIRED")
    Long id;
    String brandName;
    String categoryServiceName;

}
