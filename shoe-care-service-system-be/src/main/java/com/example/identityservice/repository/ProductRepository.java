package com.example.identityservice.repository;

import com.example.identityservice.entity.Client;
import com.example.identityservice.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select c from Product c where (:keyWord is null or lower(c.code) like %:keyWord% " +
            "   or lower(c.name) like %:keyWord%) " +
            "and (:productCategoryId is null or c.productCategory.id = :productCategoryId)")
    Page<Product> search(String keyWord, Long productCategoryId, Pageable pageable);
    @Query("select p from Product p where lower(p.code) = lower(:code) " +
            "and (:id is null or p.id <> :id)")
    Product existsByIdAndCode(Long id, String code);
    @Query("select p from Product p where lower(p.name) = lower(:name) " +
            "and (:id is null or p.id <> :id)")
    Product existsByIdAndName(Long id, String name);
}
