package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.response.ProductDetailResponse;
import com.example.identityservice.service.ProductDetailService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
//
//    @PostMapping
//    public ApiResponse<ProductDetailResponse> createProductDetail(@RequestBody ProductDetailRequest productDetailRequest) {
//        return ApiResponse.<ProductDetailResponse>builder()
//                .result(productDetailService.createProductDetail(productDetailRequest))
//                .build();
//    }
}
