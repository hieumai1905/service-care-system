package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.BrandDTO;
import com.example.identityservice.dto.request.UpdateClientRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.Brand;
import com.example.identityservice.service.BrandService;
import com.example.identityservice.utils.ConvertUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/brands")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class BrandController {
    private BrandService brandService;

    @GetMapping
    public ApiResponse<?> getAllBrands() {
        return ApiResponse.<List<BrandDTO>>builder()
                .result(brandService.getAllBrands())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getBrandById(@PathVariable Long id) {
        Brand brand = brandService.getBrandById(id);
        return ApiResponse.<BrandDTO>builder()
                .result(ConvertUtils.convert(brand, BrandDTO.class))
                .build();
    }

    @PostMapping
    public ApiResponse<?> createBrand(@Valid @RequestBody BrandDTO brand) {
        return ApiResponse.<BrandDTO>builder()
                .result(brandService.createBrand(brand))
                .build();
    }

    @PutMapping
    public ApiResponse<?> updateBrand(@Valid @RequestBody BrandDTO brand) {
        return ApiResponse.<BrandDTO>builder()
                .result(brandService.updateBrand(brand))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteBrand(@PathVariable Long id) {
        brandService.deleteBrand(id);
        return ApiResponse.<String>builder()
                .result("Delete brand successfully!")
                .build();
    }
}
