package com.example.identityservice.repository;

import com.example.identityservice.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
    List<ProductDetail> findAllByProductId(Long productId);

    void deleteAllByProductId(Long productId);

    @Query(value = "SELECT * FROM product_details WHERE product_id = :productId AND color_id = :colorId AND size_id = :sizeId",
            nativeQuery = true)
    Optional<ProductDetail> findByProductAndSizeAndColor(Long productId, Long sizeId, Long colorId);
}
