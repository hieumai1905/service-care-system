package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.BrandDTO;
import com.example.identityservice.dto.ColorDTO;
import com.example.identityservice.entity.Brand;
import com.example.identityservice.entity.Color;
import com.example.identityservice.service.BrandService;
import com.example.identityservice.service.ColorService;
import com.example.identityservice.utils.ConvertUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/colors")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ColorController {
    private ColorService colorService;

    @GetMapping
    public ApiResponse<?> getAllColors() {
        return ApiResponse.<List<ColorDTO>>builder()
                .result(colorService.getAllColors())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getColorById(@PathVariable Long id) {
        Color color = colorService.getColorById(id);
        return ApiResponse.<ColorDTO>builder()
                .result(ConvertUtils.convert(color, ColorDTO.class))
                .build();
    }

    @PostMapping
    public ApiResponse<?> createColor(@Valid @RequestBody ColorDTO color) {
        return ApiResponse.<ColorDTO>builder()
                .result(colorService.createColor(color))
                .build();
    }

    @PutMapping
    public ApiResponse<?> updateColor(@Valid @RequestBody ColorDTO color) {
        return ApiResponse.<ColorDTO>builder()
                .result(colorService.updateColor(color))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteColor(@PathVariable Long id) {
        colorService.deleteColor(id);
        return ApiResponse.<String>builder()
                .result("Delete color successfully!")
                .build();
    }
}
