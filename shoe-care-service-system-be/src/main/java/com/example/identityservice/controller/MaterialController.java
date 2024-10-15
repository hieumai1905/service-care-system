package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.BrandDTO;
import com.example.identityservice.dto.MaterialDTO;
import com.example.identityservice.entity.Brand;
import com.example.identityservice.entity.Material;
import com.example.identityservice.service.BrandService;
import com.example.identityservice.service.MaterialService;
import com.example.identityservice.utils.ConvertUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/materials")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class MaterialController {
    private MaterialService materialService;

    @GetMapping
    public ApiResponse<?> getAllMaterials() {
        return ApiResponse.<List<MaterialDTO>>builder()
                .result(materialService.getAllMaterials())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getMaterialById(@PathVariable Long id) {
        Material material = materialService.getMaterialById(id);
        return ApiResponse.<MaterialDTO>builder()
                .result(ConvertUtils.convert(material, MaterialDTO.class))
                .build();
    }

    @PostMapping
    public ApiResponse<?> createMaterial(@Valid @RequestBody MaterialDTO material) {
        return ApiResponse.<MaterialDTO>builder()
                .result(materialService.createMaterial(material))
                .build();
    }

    @PutMapping
    public ApiResponse<?> updateMaterial(@Valid @RequestBody MaterialDTO material) {
        return ApiResponse.<MaterialDTO>builder()
                .result(materialService.updateMaterial(material))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteMaterial(@PathVariable Long id) {
        materialService.deleteMaterial(id);
        return ApiResponse.<String>builder()
                .result("Delete material successfully!")
                .build();
    }
}
