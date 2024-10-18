package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.PermissionRequest;
import com.example.identityservice.dto.request.PermissionResponse;
import com.example.identityservice.service.PermissionService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PutMapping("{name}")
    ApiResponse<PermissionResponse> update(@PathVariable("name") String name, @RequestBody PermissionRequest request) {
        return ApiResponse.<PermissionResponse>builder()
                .result(permissionService.update(name, request))
                .build();
    }

    @GetMapping("{name}")
    ApiResponse<PermissionResponse> getByName(@PathVariable("name") String name) {
        return ApiResponse.<PermissionResponse>builder()
                .result(permissionService.findByName(name))
                .build();
    }
}
