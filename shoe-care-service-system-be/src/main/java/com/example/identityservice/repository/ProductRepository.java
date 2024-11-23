package com.example.identityservice.repository;

import com.example.identityservice.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query("select c from Product c where (:keyWord is null or lower(c.code) like %:keyWord% " +
            "   or lower(c.name) like %:keyWord%) " +
            "and (:productCategoryId is null or c.productCategory.id = :productCategoryId)")
    Page<Product> search(String keyWord, Long productCategoryId, Pageable pageable);

    @Query("select p from Product p where lower(p.code) = lower(:code)")
    Product findByCode(String code);

    @Query("select p from Product p where lower(p.name) = lower(:name)")
    Product findByName(String name);


    @Query("SELECT p FROM Product p " +
            "JOIN p.productCategory pc " +
            "WHERE (:keyword IS NULL OR " +
            "   LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(p.code) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(pc.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR CAST(p.id AS string) LIKE CONCAT('%', :keyword, '%'))")
    List<Product> searchProductsByKeyword(@Param("keyword") String keyword);
}
