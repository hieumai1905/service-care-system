package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.response.ProductDetailResponse;
import com.example.identityservice.service.ProductDetailService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/product-details")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ProductDetailController {
    ProductDetailService productDetailService;

    @RequestMapping("/{productId}")
    public ApiResponse<List<ProductDetailResponse>> getProductDetails(@PathVariable Long productId) {
        return ApiResponse.<List<ProductDetailResponse>>builder()
                .result(productDetailService.getAllByProductId(productId))
                .build();
    }

    @GetMapping
    public ApiResponse<ProductDetailResponse> getProductDetailByProductIdAndColorIdAndSizeId(
            @RequestParam("productId") Long productId, @RequestParam("sizeId") Long sizeId, @RequestParam("colorId") Long colorId) {
        return ApiResponse.<ProductDetailResponse>builder()
                .result(productDetailService.getProductDetailByProductIdAndColorIdAndSizeId(productId, sizeId, colorId))
                .build();
    }
}
