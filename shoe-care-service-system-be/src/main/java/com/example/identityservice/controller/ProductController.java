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
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ProductController {

    ProductService productService;

    @PostMapping
    public ApiResponse<?> create(
            @ModelAttribute @Valid CreateProductRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        return ApiResponse.<Long>builder()
                .result(productService.createProduct(request, file))
                .build();
    }

    @PutMapping
    public ApiResponse<?> update(@ModelAttribute @Valid UpdateProductRequest request,
                                 @RequestPart(value = "file", required = false) MultipartFile file) {
        return ApiResponse.<Long>builder()
                .result(productService.updateProduct(request, file))
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
