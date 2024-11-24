package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.CreateProductRequest;
import com.example.identityservice.dto.request.ProductDetailRequest;
import com.example.identityservice.dto.request.SearchProductRequest;
import com.example.identityservice.dto.request.UpdateProductRequest;
import com.example.identityservice.dto.response.ProductResponse;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ProductController {

    ProductService productService;

    @GetMapping
    public ApiResponse<?> getProducts() {
        return ApiResponse.<List<UpdateProductRequest>>builder()
                .result(productService.getProducts())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getProduct(@PathVariable Long id) {
        return ApiResponse.<ProductResponse>builder()
                .result(productService.findById(id))
                .build();
    }

    @PostMapping
    public ApiResponse<?> create(
            @ModelAttribute @Valid CreateProductRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file) throws JsonProcessingException {

        return ApiResponse.<Long>builder()
                .result(productService.createProduct(request, file))
                .build();
    }

    @PutMapping
    public ApiResponse<?> update(@ModelAttribute @Valid UpdateProductRequest request,
                                 @RequestPart(value = "file", required = false) MultipartFile file) throws JsonProcessingException {
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

    @GetMapping("search")
    public ApiResponse<List<UpdateProductRequest>> searchProducts(@RequestParam String q) {
        return ApiResponse.<List<UpdateProductRequest>>builder()
                .result(productService.searchProducts(q))
                .build();
    }
}
