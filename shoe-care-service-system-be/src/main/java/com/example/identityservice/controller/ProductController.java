package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.*;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ProductController {

    ProductService productService;

    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody CreateProductRequest request) {
        return ApiResponse.<Long>builder()
                .result(productService.createProduct(request))
                .build();
    }

    @PutMapping
    public ApiResponse<?> update(@Valid @RequestBody UpdateProductRequest request) {
        return ApiResponse.<Long>builder()
                .result(productService.updateProduct(request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ApiResponse.<String>builder()
                .result("Delete product successfully!")
                .build();
    }

    @PostMapping("/search")
    public ApiResponse<?> search(@RequestBody SearchProductRequest request) {
        return ApiResponse.<SearchResponse<UpdateProductRequest>>builder()
                .result(productService.searchProduct(request))
                .build();
    }

}
