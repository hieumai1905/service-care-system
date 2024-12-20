package com.example.identityservice.controller;

import com.example.identityservice.dto.ApiResponse;
import com.example.identityservice.dto.CouponItemDTO;
import com.example.identityservice.dto.request.CreateCouponRequest;
import com.example.identityservice.dto.request.SearchCouponRequest;
import com.example.identityservice.dto.request.UpdateCouponRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.service.CouponService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/coupons")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = lombok.AccessLevel.PRIVATE)
public class CouponController {

    CouponService couponService;

    @PostMapping("/search")
    public ApiResponse<?> search(@RequestBody SearchCouponRequest request) {
        return ApiResponse.<SearchResponse<UpdateCouponRequest>>builder()
                .result(couponService.searchCoupons(request))
                .build();
    }

    @GetMapping("/search-coupon-items/{q}")
    public ApiResponse<?> searchCouponItems(@PathVariable("q") String q) {
        return ApiResponse.<List<CouponItemDTO>>builder()
                .result(couponService.searchCouponItems(q))
                .build();
    }

    @GetMapping("/get-coupon-item/{code}")
    public ApiResponse<?> getByCodeCouponItem(@PathVariable("code") String code) {
        return ApiResponse.<CouponItemDTO>builder()
                .result(couponService.getByCodeCouponItem(code))
                .build();
    }

    @GetMapping("/search-coupon/{q}")
    public ApiResponse<?> searchCoupon(@PathVariable("q") String q) {
        return ApiResponse.<List<UpdateCouponRequest>>builder()
                .result(couponService.searchCoupon(q))
                .build();
    }


    @PostMapping
    public ApiResponse<?> create(@Valid @RequestBody CreateCouponRequest request) {
        return ApiResponse.<UpdateCouponRequest>builder()
                .result(couponService.createCoupon(request))
                .build();
    }

    @GetMapping
    public ApiResponse<?> getCoupons() {
        return ApiResponse.<List<UpdateCouponRequest>>builder()
                .result(couponService.getAllCoupons())
                .build();
    }

    @GetMapping("/{id}")
    public ApiResponse<?> getCoupon(@PathVariable Long id) {
        return ApiResponse.<UpdateCouponRequest>builder()
                .result(couponService.findById(id))
                .build();
    }

    @PutMapping
    public ApiResponse<?> update(@Valid @RequestBody UpdateCouponRequest request) {
        return ApiResponse.<UpdateCouponRequest>builder()
                .result(couponService.updateCoupon(request))
                .build();
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> delete(@PathVariable Long id) {
        couponService.deleteCoupon(id);
        return ApiResponse.<String>builder()
                .result("Delete coupon successfully!")
                .build();
    }

    @GetMapping("/coupon-items")
    public ApiResponse<?> getCouponItems() {
        return ApiResponse.<List<CouponItemDTO>>builder()
                .result(couponService.getAllCouponItems())
                .build();
    }

    @DeleteMapping("/delete-coupon-items")
    public ApiResponse<?> deleteCouponItems(@RequestParam List<Long> id) {
        couponService.deleteCouponItems(id);
        return ApiResponse.<String>builder()
                .result("Delete coupon items successfully!")
                .build();
    }
}
