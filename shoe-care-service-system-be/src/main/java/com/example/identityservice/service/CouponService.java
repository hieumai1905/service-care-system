package com.example.identityservice.service;

import com.example.identityservice.dto.CouponItemDTO;
import com.example.identityservice.dto.request.CreateCouponRequest;
import com.example.identityservice.dto.request.SearchCouponRequest;
import com.example.identityservice.dto.request.UpdateCouponRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.Coupon;
import com.example.identityservice.entity.CouponItem;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.CouponItemRepository;
import com.example.identityservice.repository.CouponRepository;
import com.example.identityservice.utils.ConvertUtils;
import com.example.identityservice.utils.PaginationUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CouponService {

    CouponRepository couponRepository;
    CouponItemRepository couponItemRepository;

    public UpdateCouponRequest createCoupon(CreateCouponRequest request) {
        Coupon existByTitle = couponRepository.findByIdAndTitle(null, request.getTitle());
        if (existByTitle != null) {
            throw new AppException(ErrorCode.TITLE_IS_ALREADY_EXIST);
        }
        Coupon coupon = ConvertUtils.convert(request, Coupon.class);
        coupon.setId(null);
        generateCouponItem(request.getNumberOfItems(), coupon);

        couponRepository.save(coupon);
        return ConvertUtils.convert(coupon, UpdateCouponRequest.class);
    }

    void generateCouponItem(Integer numberOfItems, Coupon coupon) {
        List<CouponItem> couponItems = new ArrayList<>();
        while (numberOfItems > 0) {
            couponItems.add(CouponItem.builder()
                    .isActive(true)
                    .coupon(coupon)
                    .code(generateCouponItemCode())
                    .build());
            numberOfItems--;
        }
        coupon.setCouponItems(couponItems);
    }

    private String generateCouponItemCode() {
        return java.util.UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    public UpdateCouponRequest updateCoupon(UpdateCouponRequest request) {
        Coupon coupon = getCouponById(request.getId());
        Coupon existByTitle = couponRepository.findByIdAndTitle(request.getId(), request.getTitle());
        if (existByTitle != null) {
            throw new AppException(ErrorCode.TITLE_IS_ALREADY_EXIST);
        }

        coupon.setTitle(request.getTitle());
        coupon.setDiscount(request.getDiscount());
        coupon.setIsActive(request.getIsActive());
        coupon.setExpireAt(request.getExpireAt());
        coupon.setIsPercent(request.getIsPercent());

        couponRepository.save(coupon);
        return ConvertUtils.convert(coupon, UpdateCouponRequest.class);
    }

    public void deleteCoupon(Long id) {
        getCouponById(id);
        couponRepository.deleteById(id);
    }

    public SearchResponse<UpdateCouponRequest> searchCoupons(SearchCouponRequest request) {
        request.validateInput();

        Page<Coupon> coupons = couponRepository.search(
                request.getKeyWord(),
                request.getIsActive(),
                PaginationUtils.getPageable(request.getPageIndex(), request.getPageSize())
        );

        SearchResponse<UpdateCouponRequest> response = new SearchResponse<>();
        response.setPageIndex(request.getPageIndex());
        response.setPageSize(request.getPageSize());
        response.setTotalElements(coupons.getTotalElements());
        response.setData(ConvertUtils.convertList(coupons.getContent(), UpdateCouponRequest.class));

        return response;
    }

    public List<CouponItemDTO> getCouponItems(Long couponId) {
        List<CouponItem> couponItems = couponItemRepository.findAllByCouponId(couponId);
        return ConvertUtils.convertList(couponItems, CouponItemDTO.class);
    }

    public void deleteCouponItems(List<Long> ids) {
        couponItemRepository.deleteByIds(ids);
    }

    public Coupon getCouponById(Long id) {
        return couponRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.RECORD_NOT_FOUND)
        );
    }

    public UpdateCouponRequest findById(Long id) {
        Coupon coupon = getCouponById(id);
        var quantity = couponItemRepository.findAllByCouponId(id).size();
        UpdateCouponRequest updateCouponRequest = ConvertUtils.convert(coupon, UpdateCouponRequest.class);
        updateCouponRequest.setNumberOfItems(quantity);
        return updateCouponRequest;
    }

    public List<UpdateCouponRequest> getAllCoupons() {
        List<Coupon> coupons = couponRepository.findAll(Sort.by(Sort.Direction.DESC, "expireAt"));
        return ConvertUtils.convertList(coupons, UpdateCouponRequest.class);
    }
}