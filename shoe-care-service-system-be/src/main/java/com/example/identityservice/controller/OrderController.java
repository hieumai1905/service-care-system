package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.*;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.service.OrderService;
import com.example.identityservice.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class OrderController {

    OrderService orderService;

    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody CreateOrderRequest request) {
        return ApiResponse.<UpdateOrderRequest>builder()
                .result(orderService.createOrder(request))
                .build();
    }

    @PutMapping
    public ApiResponse<?> update(@Valid @RequestBody UpdateOrderRequest request) {
        return ApiResponse.<UpdateOrderRequest>builder()
                .result(orderService.updateOrder(request))
                .build();
    }


    @PostMapping("/search")
    public ApiResponse<?> search(@RequestBody SearchOrderRequest request) {
        return ApiResponse.<SearchResponse<UpdateOrderRequest>>builder()
                .result(orderService.searchOrder(request))
                .build();
    }
    @GetMapping("/{id}")
    public ApiResponse<?> getById(@PathVariable Long id) {
        return ApiResponse.<UpdateOrderRequest>builder()
                .result(orderService.getById(id))
                .build();
    }
}
