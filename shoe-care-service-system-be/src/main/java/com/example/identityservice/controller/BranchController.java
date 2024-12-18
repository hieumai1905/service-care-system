//package com.example.identityservice.controller;
//
//import com.example.identityservice.dto.ApiResponse;
//import com.example.identityservice.dto.BranchDTO;
//import com.example.identityservice.dto.BranchDTO;
//import com.example.identityservice.entity.Branch;
//import com.example.identityservice.entity.Brand;
//import com.example.identityservice.service.BranchService;
//import com.example.identityservice.service.BrandService;
//import com.example.identityservice.utils.ConvertUtils;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import lombok.experimental.FieldDefaults;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@Slf4j
//@RestController
//@RequestMapping("/branchs")
//@RequiredArgsConstructor
//@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
//public class BranchController {
//    private BranchService branchService;
//
//    @GetMapping
//    public ApiResponse<?> getAllBranchs() {
//        return ApiResponse.<List<BranchDTO>>builder()
//                .result(branchService.getAllBranchs())
//                .build();
//    }
//
//    @GetMapping("/{id}")
//    public ApiResponse<?> getBranchById(@PathVariable Long id) {
//        Branch branch = branchService.getBranchById(id);
//        return ApiResponse.<BranchDTO>builder()
//                .result(ConvertUtils.convert(branch, BranchDTO.class))
//                .build();
//    }
//
//    @PostMapping
//    public ApiResponse<?> createBranch(@Valid @RequestBody BranchDTO branch) {
//        return ApiResponse.<BranchDTO>builder()
//                .result(branchService.createBranch(branch))
//                .build();
//    }
//
//    @PutMapping
//    public ApiResponse<?> updateBranch(@Valid @RequestBody BranchDTO branch) {
//        return ApiResponse.<BranchDTO>builder()
//                .result(branchService.updateBranch(branch))
//                .build();
//    }
//
//    @DeleteMapping("/{id}")
//    public ApiResponse<?> deleteBranch(@PathVariable Long id) {
//        branchService.deleteBranch(id);
//        return ApiResponse.<String>builder()
//                .result("Delete branch successfully!")
//                .build();
//    }
//}
