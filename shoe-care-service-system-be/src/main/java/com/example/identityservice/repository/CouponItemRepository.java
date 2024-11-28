package com.example.identityservice.repository;

import com.example.identityservice.entity.CouponItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CouponItemRepository extends JpaRepository<CouponItem, Long> {
    @Query("select c from CouponItem c where :couponId is null or c.coupon.id = :couponId")
    List<CouponItem> findAllByCouponId(Long couponId);
    @Query("delete from CouponItem c where c.isActive = true and c.id in (:ids)")
    void deleteByIds(List<Long> ids);

    @Query("select c from CouponItem c where lower(c.code) like %:q% or lower(c.coupon.title) like %:q%")
    List<CouponItem> searchCouponItem(String q);

    @Query("select c from CouponItem c where lower(c.code) =:code")
    CouponItem searchByCode(String code);
}
