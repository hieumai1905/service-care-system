package com.example.identityservice.repository;

import com.example.identityservice.entity.Coupon;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    @Query("select c from Coupon c where lower(c.title) = :title " +
            "and (:id is null or c.id <> :id)")
    Coupon findByIdAndTitle(Long id, String title);
    @Query("select c from Coupon c where (:keyWord is null or lower(c.title) like %:keyWord%) " +
            "and (:isActive is null or c.isActive = :isActive)")
    Page<Coupon> search(String keyWord, Boolean isActive, Pageable pageable);
}
