package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.CategoryServiceDTO;
import com.example.identityservice.entity.CategoryService;
import com.example.identityservice.service.CategoryServiceService;
import com.example.identityservice.utils.ConvertUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/category-services")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CategoryServiceController {
    CategoryServiceService categoryServiceService;

    @GetMapping
    public ApiResponse<?> getAllCategoryServices() {
        return ApiResponse.<List<CategoryServiceDTO>>builder()
                .result(categoryServiceService.getAllCategoryServices())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getCategoryServiceById(@PathVariable Long id) {
        CategoryService categoryService = categoryServiceService.getCategoryServiceById(id);
        return ApiResponse.<CategoryServiceDTO>builder()
                .result(ConvertUtils.convert(categoryService, CategoryServiceDTO.class))
                .build();
    }

    @PostMapping
    public ApiResponse<?> createCategoryService(@Valid @RequestBody CategoryServiceDTO request) {
        return ApiResponse.<CategoryServiceDTO>builder()
                .result(categoryServiceService.createCategoryService(request))
                .build();
    }

    @PutMapping
    public ApiResponse<?> updateCategoryService(@Valid @RequestBody CategoryServiceDTO categoryService) {
        return ApiResponse.<CategoryServiceDTO>builder()
                .result(categoryServiceService.updateCategoryService(categoryService))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteCategoryService(@PathVariable Long id) {
        categoryServiceService.deleteCategoryService(id);
        return ApiResponse.<String>builder()
                .result("Delete category service successfully!")
                .build();
    }
}
