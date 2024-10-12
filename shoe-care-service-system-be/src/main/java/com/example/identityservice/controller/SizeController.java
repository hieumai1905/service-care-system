package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.SizeDTO;
import com.example.identityservice.entity.Size;
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
@RequestMapping("/sizes")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class SizeController {
    private SizeService sizeService;

    @GetMapping
    public ApiResponse<?> getAllSizes() {
        return ApiResponse.<List<SizeDTO>>builder()
                .result(sizeService.getAllSizes())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getSizeById(@PathVariable Long id) {
        Size size = sizeService.getSizeById(id);
        return ApiResponse.<SizeDTO>builder()
                .result(ConvertUtils.convert(size, SizeDTO.class))
                .build();
    }

    @PostMapping
    public ApiResponse<?> createSize(@Valid @RequestBody SizeDTO brand) {
        return ApiResponse.<SizeDTO>builder()
                .result(sizeService.createSize(brand))
                .build();
    }

    @PutMapping
    public ApiResponse<?> updateSize(@Valid @RequestBody SizeDTO brand) {
        return ApiResponse.<SizeDTO>builder()
                .result(sizeService.updateSize(brand))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteSize(@PathVariable Long id) {
        sizeService.deleteSize(id);
        return ApiResponse.<String>builder()
                .result("Delete size successfully!")
                .build();
    }
}
