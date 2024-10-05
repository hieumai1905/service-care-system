package com.example.identityservice.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.PermissionRequest;
import com.example.identityservice.dto.request.PermissionResponse;
import com.example.identityservice.service.PermissionService;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/permissions")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class PermissionController {
    PermissionService permissionService;

    @PostMapping
    ApiResponse<PermissionResponse> create(@RequestBody PermissionRequest request) {
        return ApiResponse.<PermissionResponse>builder()
                .result(permissionService.create(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<PermissionResponse>> getAll() {
        return ApiResponse.<List<PermissionResponse>>builder()
                .result(permissionService.getAll())
                .build();
    }

    @DeleteMapping("{name}")
    ApiResponse<Void> delete(@PathVariable("name") String name) {
        permissionService.delete(name);
        return ApiResponse.<Void>builder().build();
    }
}
