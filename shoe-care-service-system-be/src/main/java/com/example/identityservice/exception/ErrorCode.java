package com.example.identityservice.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Lỗi chưa được phân loại", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Lỗi chưa được phân loại", HttpStatus.BAD_REQUEST),
    USER_EXISTED(1002, "Người dùng đã tồn tại", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Tên người dùng phải có ít nhất {min} ký tự", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1004, "Mật khẩu phải có ít nhất {min} ký tự", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1005, "Người dùng không tồn tại", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Chưa xác thực", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "Bạn không có quyền truy cập", HttpStatus.FORBIDDEN),
    INVALID_DOB(1008, "Tuổi của bạn phải ít nhất {min}", HttpStatus.BAD_REQUEST),
    RECORD_NOT_FOUND(1009, "Không tìm thấy bản ghi", HttpStatus.NOT_FOUND),
    ID_IS_REQUIRED(1010, "ID là bắt buộc", HttpStatus.BAD_REQUEST),
    NAME_IS_REQUIRED(1011, "Tên là bắt buộc", HttpStatus.BAD_REQUEST),
    TEL_IS_REQUIRED(1012, "Số điện thoại là bắt buộc", HttpStatus.BAD_REQUEST),
    EMAIL_IS_REQUIRED(1013, "Email là bắt buộc", HttpStatus.BAD_REQUEST),
    ADDRESS_IS_REQUIRED(1014, "Địa chỉ là bắt buộc", HttpStatus.BAD_REQUEST),
    BIRTHDAY_IS_REQUIRED(1015, "Ngày sinh là bắt buộc", HttpStatus.BAD_REQUEST),
    CLIENT_CATEGORY_IS_REQUIRED(1016, "Loại khách hàng là bắt buộc", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_NAME(1017, "Độ dài tên phải trong khoảng từ 1 đến 255 ký tự", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_TEL(1018, "Độ dài số điện thoại phải từ 10 đến 11 ký tự", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_EMAIL(1019, "Độ dài email phải trong khoảng từ 1 đến 255 ký tự", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_ADDRESS(1020, "Độ dài địa chỉ phải trong khoảng từ 1 đến 255 ký tự", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_NOTE(1021, "Độ dài ghi chú phải trong khoảng từ 0 đến 255 ký tự", HttpStatus.BAD_REQUEST),
    DISCOUNT_CANNOT_BE_LESS_THAN_ZERO(1022, "Chiết khấu phải là số dương", HttpStatus.BAD_REQUEST),
    TOTAL_REQUIRE_CANNOT_BE_NEGATIVE(1023, "Tổng yêu cầu phải là số dương", HttpStatus.BAD_REQUEST),
    NAME_ALREADY_EXIST(1024, "Tên đã tồn tại", HttpStatus.BAD_REQUEST),
    PRICE_IS_REQUIRED(1025, "Giá là bắt buộc", HttpStatus.BAD_REQUEST),
    SERVICE_CODE_IS_REQUIRED(1026, "Mã dịch vụ là bắt buộc", HttpStatus.BAD_REQUEST),
    INPUT_PRICE_IS_REQUIRED(1027, "Giá nhập là bắt buộc", HttpStatus.BAD_REQUEST),
    SELL_PRICE_IS_REQUIRED(1028, "Giá bán là bắt buộc", HttpStatus.BAD_REQUEST),
    PROFITS_IS_REQUIRED(1029, "Lợi nhuận là bắt buộc", HttpStatus.BAD_REQUEST),
    CONSUMING_TIME_IS_REQUIRED(1030, "Thời gian tiêu tốn là bắt buộc", HttpStatus.BAD_REQUEST),
    CATEGORY_SERVICE_ID_IS_REQUIRED(1031, "ID danh mục dịch vụ là bắt buộc", HttpStatus.BAD_REQUEST),
    BRAND_ID_IS_REQUIRED(1032, "ID thương hiệu là bắt buộc", HttpStatus.BAD_REQUEST),
    CODE_ALREADY_EXIST(1033, "Mã đã tồn tại", HttpStatus.BAD_REQUEST),
    IS_ACTIVE_IS_REQUIRED(1034, "Trạng thái kích hoạt là bắt buộc", HttpStatus.BAD_REQUEST),
    COLOR_HEX_IS_REQUIRED(1035, "Mã màu là bắt buộc", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_IMAGE(1036, "Độ dài hình ảnh phải trong khoảng từ 0 đến 255 ký tự", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_CODE(1037, "Độ dài mã phải trong khoảng từ 0 đến 255 ký tự", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_DESCRIPTION(1038, "Độ dài mô tả phải trong khoảng từ 0 đến 255 ký tự", HttpStatus.BAD_REQUEST),
    CODE_IS_REQUIRED(1039, "Mã là bắt buộc", HttpStatus.BAD_REQUEST),
    QUANTITY_IS_REQUIRED(1040, "Số lượng là bắt buộc", HttpStatus.BAD_REQUEST),
    PRODUCT_CATEGORY_ID_IS_REQUIRED(1041, "ID danh mục sản phẩm là bắt buộc", HttpStatus.BAD_REQUEST),
    COLOR_ID_IS_REQUIRED(1042, "ID màu là bắt buộc", HttpStatus.BAD_REQUEST),
    SIZE_ID_IS_REQUIRED(1043, "ID kích thước là bắt buộc", HttpStatus.BAD_REQUEST),
    TITLE_IS_REQUIRED(1043, "Tiêu đề là bắt buộc", HttpStatus.BAD_REQUEST),
    DISCOUNT_MUST_BE_POSITIVE(1043, "Chiết khấu phải là số dương", HttpStatus.BAD_REQUEST),
    REQUIRE_VALUE_MUST_BE_POSITIVE(1043, "Giá trị yêu cầu phải là số dương", HttpStatus.BAD_REQUEST),
    IS_PERCENT_IS_REQUIRED(1043, "Trường phần trăm là bắt buộc", HttpStatus.BAD_REQUEST),
    INVALID_LENGTH_OF_TITLE(1043, "Độ dài tiêu đề phải trong khoảng từ 0 đến 255 ký tự", HttpStatus.BAD_REQUEST),
    NUMBER_OF_ITEMS_IS_REQUIRED(1043, "Số lượng vật phẩm là bắt buộc", HttpStatus.BAD_REQUEST),
    NUMBER_OF_ITEMS_MUST_BE_POSITIVE(1043, "Số lượng vật phẩm phải là số dương", HttpStatus.BAD_REQUEST),
    TITLE_IS_ALREADY_EXIST(1043, "Tiêu đề đã tồn tại", HttpStatus.BAD_REQUEST),
    QUANTITY_IS_NOT_ENOUGH(1043, "Số lượng không đủ", HttpStatus.BAD_REQUEST),
    ROLE_NOT_EXISTED(1044, "Vai trò không tồn tại", HttpStatus.BAD_REQUEST),
    ROLE_NOT_FOUND(1045, "Không tìm thấy vai trò", HttpStatus.NOT_FOUND),
    ROLE_EXISTED(1046, "Vai trò đã tồn tại", HttpStatus.BAD_REQUEST),
    PERMISSION_EXISTED(1047, "Quyền đã tồn tại", HttpStatus.BAD_REQUEST),
    PERMISSION_IN_USE(1048, "Không thể xóa do quyền đang được sử dụng", HttpStatus.BAD_REQUEST),
    PERMISSION_NOT_EXISTED(1049, "Quyền không tồn tại", HttpStatus.BAD_REQUEST),
    FEE_MUST_BE_POSITIVE(1050, "Phí phải là số dương", HttpStatus.BAD_REQUEST),
    SHIPPING_PROVINCE_NOT_FOUND(1051, "Tỉnh vận chuyển không tồn tại", HttpStatus.NOT_FOUND);

    int code;
    String message;
    HttpStatusCode statusCode;
}
