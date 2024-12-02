package com.example.identityservice.controller;

import com.example.identityservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/revenue")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class RevenueController {

    OrderService orderService;

    @GetMapping("/last-seven-days")
    public List<Map<String, Double>> getLastSevenDaysRevenue() {
        return orderService.getLastSevenDaysRevenue();
    }


    @GetMapping("/range")
    public List<Map<String, Double>> getRevenueByDateRange(
            @RequestParam("startDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date startDate,
            @RequestParam("endDate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date endDate) {
        return orderService.getRevenueByCustomDateRange(startDate, endDate);
    }
}
