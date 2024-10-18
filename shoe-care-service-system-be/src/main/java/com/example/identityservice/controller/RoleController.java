package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.RoleRequest;
import com.example.identityservice.dto.response.RoleResponse;
import com.example.identityservice.service.RoleService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/roles")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class RoleController {
    RoleService roleService;

    @PostMapping
    ApiResponse<RoleResponse> create(@RequestBody RoleRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.create(request))
                .build();
    }

    @GetMapping
    ApiResponse<List<RoleResponse>> getAll() {
        return ApiResponse.<List<RoleResponse>>builder()
                .result(roleService.getAll())
                .build();
    }

    @DeleteMapping("{name}")
    ApiResponse<Void> delete(@PathVariable("name") String name) {
        roleService.delete(name);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping("{name}")
    ApiResponse<RoleResponse> getByName(@PathVariable("name") String name) {
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.findByName(name))
                .build();
    }

    @PutMapping("{name}")
    ApiResponse<RoleResponse> update(@PathVariable("name") String name, @RequestBody RoleRequest request) {
        return ApiResponse.<RoleResponse>builder()
                .result(roleService.update(name, request))
                .build();
    }
}
