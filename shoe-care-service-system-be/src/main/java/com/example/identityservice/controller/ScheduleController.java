package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.*;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.service.OrderService;
import com.example.identityservice.service.ScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/schedules")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ScheduleController {

    ScheduleService scheduleService;

    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody CreateScheduleRequest request) {
        return ApiResponse.<UpdateScheduleRequest>builder()
                .result(scheduleService.createSchedule(request))
                .build();
    }

    @PutMapping
    public ApiResponse<?> update(@Valid @RequestBody UpdateScheduleRequest request) {
        return ApiResponse.<UpdateScheduleRequest>builder()
                .result(scheduleService.updateSchedule(request))
                .build();
    }


    @PostMapping("/search")
    public ApiResponse<?> search(@RequestBody SearchScheduleRequest request) {
        return ApiResponse.<SearchResponse<UpdateScheduleRequest>>builder()
                .result(scheduleService.searchSchedule(request))
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getById(@PathVariable Long id) {
        return ApiResponse.<UpdateScheduleRequest>builder()
                .result(scheduleService.getById(id))
                .build();
    }
}
