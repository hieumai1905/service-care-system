package com.example.identityservice.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} characters", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Password must be at least {min} characters", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "User not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Your age must be at least {min}", HttpStatus.BAD_REQUEST),
    RECORD_NOT_FOUND(1009, "Record not found", HttpStatus.NOT_FOUND),
    ID_IS_REQUIRED(1010, "Id is required!", HttpStatus.BAD_REQUEST),
    NAME_IS_REQUIRED(1011, "Name is required!", HttpStatus.BAD_REQUEST),
    TEL_IS_REQUIRED(1012, "Tel is required!", HttpStatus.BAD_REQUEST),
    EMAIL_IS_REQUIRED(1013, "Email is required!", HttpStatus.BAD_REQUEST),
    ADDRESS_IS_REQUIRED(1014, "Address is required!", HttpStatus.BAD_REQUEST),
    BIRTHDAY_IS_REQUIRED(1015, "Birthday is required!", HttpStatus.BAD_REQUEST),
    CLIENT_CATEGORY_IS_REQUIRED(1016, "Client category is required!", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_NAME(1017, "Length of name must be in range 1 to 255!", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_TEL(1018, "Length of tel must be in range 10 to 11!", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_EMAIL(1019, "Length of email must be in range 1 to 255!", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_ADDRESS(1020, "Length of address must be in range 1 to 255!", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_NOTE(1021, "Length of note must be in range 0 to 255!", HttpStatus.BAD_REQUEST),
    DISCOUNT_CANNOT_BE_LESS_THAN_ZERO(1022, "Discount must be positive number!", HttpStatus.BAD_REQUEST),
    TOTAL_REQUIRE_CANNOT_BE_NEGATIVE(1023, "Total require must be positive number!", HttpStatus.BAD_REQUEST),
    NAME_ALREADY_EXIST(1024, "Name is already existed!", HttpStatus.BAD_REQUEST),
    PRICE_IS_REQUIRED(1025, "Price is required!", HttpStatus.BAD_REQUEST),
    SERVICE_CODE_IS_REQUIRED(1026, "Service code is required!", HttpStatus.BAD_REQUEST),
    INPUT_PRICE_IS_REQUIRED(1027, "Input price is required!", HttpStatus.BAD_REQUEST),
    SELL_PRICE_IS_REQUIRED(1028, "Sell price is required!", HttpStatus.BAD_REQUEST),
    PROFITS_IS_REQUIRED(1029, "Profits is required!", HttpStatus.BAD_REQUEST),
    CONSUMING_TIME_IS_REQUIRED(1030, "Consuming time is required!", HttpStatus.BAD_REQUEST),
    CATEGORY_SERVICE_ID_IS_REQUIRED(1031, "Category service id is required!", HttpStatus.BAD_REQUEST),
    BRAND_ID_IS_REQUIRED(1032, "Brand id is required!", HttpStatus.BAD_REQUEST),
    CODE_ALREADY_EXIST(1033, "Code is already existed!", HttpStatus.BAD_REQUEST),
    IS_ACTIVE_IS_REQUIRED(1034, "Active is required!", HttpStatus.BAD_REQUEST),
    COLOR_HEX_IS_REQUIRED(1035, "Color hex is required!", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_IMAGE(1036, "Length of image must be in range 0 to 255!", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_CODE(1037, "Length of code must be in range 0 to 255!", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_DESCRIPTION(1038, "Length of description must be in range 0 to 255!", HttpStatus.BAD_REQUEST),
    CODE_IS_REQUIRED(1039, "Code is required!", HttpStatus.BAD_REQUEST),
    QUANTITY_IS_REQUIRED(1040, "Quantity is required!", HttpStatus.BAD_REQUEST),
    PRODUCT_CATEGORY_ID_IS_REQUIRED(1041, "Product category id is required!", HttpStatus.BAD_REQUEST),
    COLOR_ID_IS_REQUIRED(1042, "Color id is required!", HttpStatus.BAD_REQUEST),
    SIZE_ID_IS_REQUIRED(1043, "Size id is required!", HttpStatus.BAD_REQUEST),
    TITLE_IS_REQUIRED(1043, "Title is required!", HttpStatus.BAD_REQUEST),
    DISCOUNT_MUST_BE_POSITIVE(1043, "Discount must be positive!", HttpStatus.BAD_REQUEST),
    REQUIRE_VALUE_MUST_BE_POSITIVE(1043, "Require value must be positive!", HttpStatus.BAD_REQUEST),
    IS_PERCENT_IS_REQUIRED(1043, "IsPercent is required!", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_TITLE(1043, "Length of title must be in range 0 to 255!", HttpStatus.BAD_REQUEST),
    NUMBER_OF_ITEMS_IS_REQUIRED(1043, "Number of items is required!", HttpStatus.BAD_REQUEST),
    NUMBER_OF_ITEMS_MUST_BE_POSITIVE(1043, "Number of items must be positive!", HttpStatus.BAD_REQUEST),
    TITLE_IS_ALREADY_EXIST(1043, "Title is already existed!", HttpStatus.BAD_REQUEST),
    QUANTITY_IS_NOT_ENOUGH(1043, "Quantity is not enough!", HttpStatus.BAD_REQUEST),
    ;

    int code;
    String message;
    HttpStatusCode statusCode;
}
