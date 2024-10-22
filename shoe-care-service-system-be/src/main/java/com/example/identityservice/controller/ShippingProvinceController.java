package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.ShippingProvinceDTO;
import com.example.identityservice.entity.ShippingProvince;
import com.example.identityservice.service.ShippingProvinceService;
import com.example.identityservice.utils.ConvertUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/shipping-provinces")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ShippingProvinceController {
    private ShippingProvinceService ShippingProvinceService;

    @GetMapping
    public ApiResponse<?> getAllShippingProvinces() {
        return ApiResponse.<List<ShippingProvinceDTO>>builder()
                .result(ShippingProvinceService.getAllShippingProvinces())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getShippingProvinceById(@PathVariable Long id) {
        ShippingProvince ShippingProvince = ShippingProvinceService.getShippingProvinceById(id);
        return ApiResponse.<ShippingProvinceDTO>builder()
                .result(ConvertUtils.convert(ShippingProvince, ShippingProvinceDTO.class))
                .build();
    }

    @PostMapping
    public ApiResponse<?> createShippingProvince(@Valid @RequestBody ShippingProvinceDTO request) {
        return ApiResponse.<ShippingProvinceDTO>builder()
                .result(ShippingProvinceService.createShippingProvince(request))
                .build();
    }

    @PutMapping
    public ApiResponse<?> updateShippingProvince(@Valid @RequestBody ShippingProvinceDTO request) {
        return ApiResponse.<ShippingProvinceDTO>builder()
                .result(ShippingProvinceService.updateShippingProvince(request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteShippingProvince(@PathVariable Long id) {
        ShippingProvinceService.deleteShippingProvince(id);
        return ApiResponse.<String>builder()
                .result("Xóa vận chuyển tỉnh thành công!")
                .build();
    }
}
