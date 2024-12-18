package com.example.identityservice.repository;

import com.example.identityservice.entity.ShippingProvince;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingProvinceRepository extends JpaRepository<ShippingProvince, Long> {
    @Query("select b from ShippingProvince b where lower(b.province) = lower(:name) " +
            "and (:id is null or :id <> b.id)")
    ShippingProvince findByIdAndName(Long id, String name);
}
