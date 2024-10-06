package com.example.identityservice.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CreateClientRequest {
    @NotNull(message = "NAME_IS_REQUIRED")
    @NotBlank(message = "TYPE_NAME_IS_REQUIRED")
    @Size(min = 1, max = 255, message = "INVALID_LENGTH_OF_NAME")
    String name;
    @NotNull(message = "TEL_IS_REQUIRED")
    @NotBlank(message = "TYPE_NAME_IS_REQUIRED")
    @Size(min = 10, max = 11, message = "INVALID_LENGTH_OF_TEL")
    String tel;
    Date createAt = new Date();
    @NotNull(message = "EMAIL_IS_REQUIRED")
    @NotBlank(message = "TYPE_NAME_IS_REQUIRED")
    @Size(min = 1, max = 255, message = "INVALID_LENGTH_OF_EMAIL")
    String email;
    @NotNull(message = "ADDRESS_IS_REQUIRED")
    @NotBlank(message = "TYPE_NAME_IS_REQUIRED")
    @Size(min = 1, max = 255, message = "INVALID_LENGTH_OF_ADDRESS")
    String address;

    @Size(min = 0, max = 255, message = "INVALID_LENGTH_OF_NOTE")
    String note;
    @NotNull(message = "BIRTHDAY_IS_REQUIRED")
    Date birthday;
    @NotNull(message = "CLIENT_CATEGORY_IS_REQUIRED")
    Long clientCategoryId;

}
