package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.ProductCategoryDTO;
import com.example.identityservice.dto.SizeDTO;
import com.example.identityservice.entity.ProductCategory;
import com.example.identityservice.entity.Size;
import com.example.identityservice.service.ProductCategoryService;
import com.example.identityservice.service.SizeService;
import com.example.identityservice.utils.ConvertUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/product-categories")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ProductCategoryController {
    private ProductCategoryService productCategoryService;

    @GetMapping
    public ApiResponse<?> getAllProductCategories() {
        return ApiResponse.<List<ProductCategoryDTO>>builder()
                .result(productCategoryService.getAllProductCategories())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getProductCategoryById(@PathVariable Long id) {
        ProductCategory productCategory = productCategoryService.getProductCategoryById(id);
        return ApiResponse.<ProductCategoryDTO>builder()
                .result(ConvertUtils.convert(productCategory, ProductCategoryDTO.class))
                .build();
    }

    @PostMapping
    public ApiResponse<?> createProductCategory(@Valid @RequestBody ProductCategoryDTO brand) {
        return ApiResponse.<ProductCategoryDTO>builder()
                .result(productCategoryService.createProductCategory(brand))
                .build();
    }

    @PutMapping
    public ApiResponse<?> updateSize(@Valid @RequestBody ProductCategoryDTO brand) {
        return ApiResponse.<ProductCategoryDTO>builder()
                .result(productCategoryService.updateProductCategory(brand))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteSize(@PathVariable Long id) {
        productCategoryService.deleteProductCategory(id);
        return ApiResponse.<String>builder()
                .result("Delete product category successfully!")
                .build();
    }
}
