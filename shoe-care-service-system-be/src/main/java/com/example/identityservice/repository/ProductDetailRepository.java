package com.example.identityservice.repository;

import com.example.identityservice.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
    List<ProductDetail> findAllByProductId(Long productId);

    void deleteAllByProductId(Long productId);
}
