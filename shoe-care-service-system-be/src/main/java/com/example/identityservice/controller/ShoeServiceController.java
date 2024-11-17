package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.CreateShoeServiceRequest;
import com.example.identityservice.dto.request.SearchShoeServiceRequest;
import com.example.identityservice.dto.request.UpdateShoeServiceRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.service.ShoeServiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/shoe-services")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ShoeServiceController {

    ShoeServiceService shoeService;

    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody CreateShoeServiceRequest request) {
        return ApiResponse.<UpdateShoeServiceRequest>builder()
                .result(shoeService.createService(request))
                .build();
    }

    @PutMapping
    public ApiResponse<?> update(@Valid @RequestBody UpdateShoeServiceRequest request) {
        return ApiResponse.<UpdateShoeServiceRequest>builder()
                .result(shoeService.updateService(request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Long id) {
        shoeService.deleteService(id);
        return ApiResponse.<String>builder()
                .result("Delete service successfully!")
                .build();
    }

    @PostMapping("/search")
    public ApiResponse<?> search(@RequestBody SearchShoeServiceRequest request) {
        return ApiResponse.<SearchResponse<UpdateShoeServiceRequest>>builder()
                .result(shoeService.searchShoeService(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getById(@PathVariable Long id) {
        return ApiResponse.<UpdateShoeServiceRequest>builder()
                .result(shoeService.getById(id))
                .build();
    }

    @GetMapping
    public ApiResponse<?> getAll() {
        return ApiResponse.<List<UpdateShoeServiceRequest>>builder()
                .result(shoeService.getAll())
                .build();
    }

    @GetMapping("search")
    public ApiResponse<List<UpdateShoeServiceRequest>> searchClients(@RequestParam String q) {
        return ApiResponse.<List<UpdateShoeServiceRequest>>builder()
                .result(shoeService.searchServices(q))
                .build();
    }
}
