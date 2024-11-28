package com.example.identityservice.repository;

import com.example.identityservice.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SizeRepository extends JpaRepository<Size, Long> {
    @Query("select b from Size b where lower(b.name) = lower(:name) " +
            "and (:id is null or :id <> b.id)")
    Size findByIdAndName(Long id, String name);

    @Query("SELECT DISTINCT s FROM Size s " +
            "JOIN ProductDetail pd ON pd.size.id = s.id " +
            "WHERE pd.product.id = :productId")
    List<Size> findAllByProductId(Long productId);
}
