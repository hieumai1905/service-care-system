package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.CreateOrderRequest;
import com.example.identityservice.dto.request.SearchOrderRequest;
import com.example.identityservice.dto.request.UpdateOrderRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.service.OrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class OrderController {

    OrderService orderService;

    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody CreateOrderRequest request) {
        return ApiResponse.<Long>builder()
                .result(orderService.createOrder(request))
                .build();
    }
    
    @GetMapping("/latest")
    public ApiResponse<?> getLatestOrders() {
        return ApiResponse.<List<UpdateOrderRequest>>builder()
                .result(orderService.getLatestOrders())
                .build();
    }

    @GetMapping("/revenue")
    public ApiResponse<Map<String, Double>> getRevenueWithGrowth(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        Date todayDate = Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());

        double todayRevenue = orderService.calculateDailyRevenue(todayDate);

        LocalDate yesterday = date.minusDays(1);
        Date yesterdayDate = Date.from(yesterday.atStartOfDay(ZoneId.systemDefault()).toInstant());

        double yesterdayRevenue = orderService.calculateDailyRevenue(yesterdayDate);

        double growthRate = (yesterdayRevenue == 0 && todayRevenue == 0) ? 0 :
                (yesterdayRevenue == 0) ? 100 :
                        ((todayRevenue - yesterdayRevenue) / yesterdayRevenue) * 100;

        Map<String, Double> result = new HashMap<>();
        result.put("todayRevenue", todayRevenue);
        result.put("yesterdayRevenue", yesterdayRevenue);
        result.put("growthRate", growthRate);

        return ApiResponse.<Map<String, Double>>builder()
                .result(result)
                .build();
    }

    @GetMapping("/revenue/week")
    public ApiResponse<Map<String, Double>> getRevenueWeekWithGrowth(@RequestParam("date") @DateTimeFormat(pattern = "yyyy-MM-dd") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);

        ZonedDateTime startOfWeek = date.with(DayOfWeek.MONDAY).atStartOfDay(ZoneId.systemDefault());
        ZonedDateTime endOfWeek = date.with(DayOfWeek.SUNDAY).atTime(23, 59, 59, 999999999).atZone(ZoneId.systemDefault());

        double weekRevenue = orderService.calculateWeeklyRevenue(Date.from(startOfWeek.toInstant()), Date.from(endOfWeek.toInstant()));

        LocalDate lastWeek = date.minusWeeks(1);
        ZonedDateTime startOfLastWeek = lastWeek.with(DayOfWeek.MONDAY).atStartOfDay(ZoneId.systemDefault());
        ZonedDateTime endOfLastWeek = lastWeek.with(DayOfWeek.SUNDAY).atTime(23, 59, 59, 999999999).atZone(ZoneId.systemDefault());

        double lastWeekRevenue = orderService.calculateWeeklyRevenue(Date.from(startOfLastWeek.toInstant()), Date.from(endOfLastWeek.toInstant()));

        double growthRate = (lastWeekRevenue == 0 && weekRevenue == 0) ? 0 :
                (lastWeekRevenue == 0) ? 100 :
                        ((weekRevenue - lastWeekRevenue) / lastWeekRevenue) * 100;

        Map<String, Double> result = new HashMap<>();
        result.put("weekRevenue", weekRevenue);
        result.put("growthRate", growthRate);

        return ApiResponse.<Map<String, Double>>builder()
                .result(result)
                .build();
    }

    @GetMapping("/completion-ratio")
    public ApiResponse<Map<String, Double>> getCompletionRatio() {
        double totalOrders = orderService.getTotalOrders();
        double completedOrders = orderService.getCompletedOrders();

        double completionRatio = (totalOrders == 0) ? 0 : (completedOrders / totalOrders) * 100;

        Map<String, Double> result = new HashMap<>();
        result.put("completionRatio", completionRatio);
        result.put("totalOrders", totalOrders);
        result.put("completedOrders", completedOrders);

        return ApiResponse.<Map<String, Double>>builder()
                .result(result)
                .build();
    }

    @PutMapping("/cancel/{orderId}")
    public ApiResponse<?> cancelOrder(@PathVariable Long orderId) {
        return ApiResponse.<Long>builder()
                .result(orderService.cancelOrder(orderId))
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

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteById(@PathVariable Long id) {
        return ApiResponse.<Long>builder()
                .result(orderService.deleteById(id))
                .build();
    }

    @GetMapping
    public ApiResponse<?> getOrders() {
        return ApiResponse.<List<UpdateOrderRequest>>builder()
                .result(orderService.getOrders())
                .build();
    }

    @GetMapping("search")
    public ApiResponse<List<UpdateOrderRequest>> searchOrders(@RequestParam String q) {
        return ApiResponse.<List<UpdateOrderRequest>>builder()
                .result(orderService.searchOrders(q))
                .build();
    }
    
    @GetMapping("client/{clientId}")
    public ApiResponse<List<UpdateOrderRequest>> getOrdersByClientId(@PathVariable Long clientId) {
        return ApiResponse.<List<UpdateOrderRequest>>builder()
                .result(orderService.getOrdersByClientId(clientId))
                .build();
    }
}
