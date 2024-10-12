package com.example.identityservice.repository;

import com.example.identityservice.entity.ProductCategory;
import com.example.identityservice.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    @Query("select b from ProductCategory b where lower(b.name) = lower(:name) " +
            "and (:id is null or :id <> b.id)")
    ProductCategory findByIdAndName(Long id, String name);
}
