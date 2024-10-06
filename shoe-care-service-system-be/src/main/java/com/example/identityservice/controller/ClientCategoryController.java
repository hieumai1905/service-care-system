package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.*;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.service.ClientCategoryService;
import com.example.identityservice.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/client-categories")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ClientCategoryController {

    ClientCategoryService clientCategoryService;

    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody CreateClientCategoryRequest request) {
        return ApiResponse.<Long>builder()
                .result(clientCategoryService.createClientCategory(request))
                .build();
    }

    @PutMapping
    public ApiResponse<?> update(@Valid @RequestBody UpdateClientCategoryRequest request) {
        return ApiResponse.<Long>builder()
                .result(clientCategoryService.updateClientCategory(request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Long id) {
        clientCategoryService.deleteClientCategory(id);
        return ApiResponse.<String>builder()
                .result("Delete client category successfully!")
                .build();
    }

    @PostMapping("/search")
    public ApiResponse<?> search(@RequestBody SearchClientCategoryRequest request) {
        return ApiResponse.<SearchResponse<UpdateClientCategoryRequest>>builder()
                .result(clientCategoryService.searchClientCategory(request))
                .build();
    }

}
