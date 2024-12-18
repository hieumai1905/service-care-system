package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.ScheduleCreationRequest;
import com.example.identityservice.dto.response.ScheduleResponseDTO;
import com.example.identityservice.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/schedules")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ScheduleController {

    ScheduleService scheduleService;

    @PostMapping
    public ApiResponse<ScheduleResponseDTO> createSchedule(@RequestBody ScheduleCreationRequest request) {
        return ApiResponse.<ScheduleResponseDTO>builder()
                .result(scheduleService.createSchedule(request))
                .build();
    }

    @GetMapping
    public ApiResponse<List<ScheduleResponseDTO>> getAll() {
        return ApiResponse.<List<ScheduleResponseDTO>>builder()
                .result(scheduleService.getAll())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<ScheduleResponseDTO> getById(@PathVariable Long id) {
        return ApiResponse.<ScheduleResponseDTO>builder()
                .result(scheduleService.getById(id))
                .build();
    }

    @PutMapping("/status/{id}")
    public ApiResponse<ScheduleResponseDTO> updateStatus(@PathVariable Long id, @RequestParam("status") String status) {
        return ApiResponse.<ScheduleResponseDTO>builder()
                .result(scheduleService.updateStatus(id, status))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable Long id) throws Exception {
        scheduleService.delete(id);
        return ApiResponse.<Void>builder().build();
    }

    @GetMapping("/search")
    public ApiResponse<List<ScheduleResponseDTO>> search(@RequestParam String q) {
        return ApiResponse.<List<ScheduleResponseDTO>>builder()
                .result(scheduleService.searchSchedules(q))
                .build();
    }
}
