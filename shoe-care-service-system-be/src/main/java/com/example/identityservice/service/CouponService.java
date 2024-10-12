package com.example.identityservice.service;

import com.example.identityservice.dto.CouponItemDTO;
import com.example.identityservice.dto.request.*;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.Coupon;
import com.example.identityservice.entity.CouponItem;
import com.example.identityservice.entity.Product;
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
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class CouponService {

    CouponRepository couponRepository;
    CouponItemRepository couponItemRepository;

    public UpdateCouponRequest createCoupon(CreateCouponRequest request){
        Coupon existByTitle = couponRepository.findByIdAndTitle(null, request.getTitle());
        if(existByTitle != null){
            throw new AppException(ErrorCode.TITLE_IS_ALREADY_EXIST);
        }
        Coupon coupon = ConvertUtils.convert(request, Coupon.class);
        coupon.setId(null);
        generateCouponItem(request.getNumberOfItems(), coupon);

        couponRepository.save(coupon);
        return ConvertUtils.convert(coupon, UpdateCouponRequest.class);
    }

    public UpdateCouponRequest updateCoupon(UpdateCouponRequest request){
        Coupon coupon = getCouponById(request.getId());
        Coupon existByTitle = couponRepository.findByIdAndTitle(request.getId(), request.getTitle());
        if(existByTitle != null){
            throw new AppException(ErrorCode.TITLE_IS_ALREADY_EXIST);
        }

        coupon.setTitle(request.getTitle());
        coupon.setDiscount(request.getDiscount());
        coupon.setActive(request.getIsActive());
        coupon.setDiscount(request.getDiscount());
        coupon.setExpireAt(request.getExpireAt());
        coupon.setIsPercent(request.getIsPercent());

        couponRepository.save(coupon);
        return ConvertUtils.convert(coupon, UpdateCouponRequest.class);
    }

    public void deleteCoupon(Long id){
        getCouponById(id);
        couponRepository.deleteById(id);
    }

    public SearchResponse<UpdateCouponRequest> searchCoupons(SearchCouponRequest request){
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

    public void deleteCouponItems(List<Long> ids){
        couponItemRepository.deleteByIds(ids);
    }

    public Coupon getCouponById(Long id) {
        return couponRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.RECORD_NOT_FOUND)
        );
    }

    void generateCouponItem(Integer numberOfItems, Coupon coupon) {
        List<CouponItem> couponItems = new ArrayList<>();
        while (numberOfItems > 0){
            CouponItem couponItem = new CouponItem();
            couponItem.setActive(true);
            couponItem.setCoupon(coupon);
            couponItem.setCode(generateCouponItemCode());
            couponItems.add(couponItem);
            numberOfItems--;
        }
        coupon.setCouponItems(couponItems);
    }

    static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    static final int CODE_LENGTH = 10;
    Random random = new Random();

    String generateCouponItemCode() {
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            int index = random.nextInt(CHARACTERS.length());
            code.append(CHARACTERS.charAt(index));
        }
        return code.toString();
    }

}
