package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.request.CreateClientRequest;
import com.example.identityservice.dto.request.SearchClientRequest;
import com.example.identityservice.dto.request.UpdateClientRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.service.ClientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/clients")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class ClientController {

    ClientService clientService;

    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody CreateClientRequest request) {
        return ApiResponse.<Long>builder()
                .result(clientService.createClient(request))
                .build();
    }

    @PutMapping
    public ApiResponse<?> update(@Valid @RequestBody UpdateClientRequest request) {
        return ApiResponse.<Long>builder()
                .result(clientService.updateClient(request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ApiResponse.<String>builder()
                .result("Delete client successfully!")
                .build();
    }

    @PostMapping("/search")
    public ApiResponse<?> search(@RequestBody SearchClientRequest request) {
        return ApiResponse.<SearchResponse<UpdateClientRequest>>builder()
                .result(clientService.searchClient(request))
                .build();
    }

}
