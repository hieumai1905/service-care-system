package com.example.identityservice.repository;

import com.example.identityservice.entity.ShoeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoeServiceRepository extends JpaRepository<ShoeService, Long> {
    @Query("select s from ShoeService s where (:keyWord is null or lower(s.name) like %:keyWord% " +
            "   or lower(s.serviceCode) like %:keyWord%) " +
            "and (:isActive is null or s.isActive = :isActive)")
    Page<ShoeService> search(String keyWord, Boolean isActive, Pageable pageable);
    @Query("select s from ShoeService s where lower(s.name) = lower(:name) " +
            "and (:id is null or :id <> s.id)")
    ShoeService findByIdAndName(Long id, String name);

    @Query("select s from ShoeService s where lower(s.serviceCode) = lower(:code) " +
            "and (:id is null or :id <> s.id)")
    ShoeService findByIdAndCode(Long id, String code);

    @Query("SELECT s FROM ShoeService s " +
            "JOIN s.categoryService cs " +
            "JOIN s.brand b " +
            "WHERE (:keyword IS NULL OR " +
            "   LOWER(s.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(s.serviceCode) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(cs.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR LOWER(b.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "   OR CAST(s.id AS string) LIKE CONCAT('%', :keyword, '%'))")
    List<ShoeService> searchServicesByKeyword(@Param("keyword") String keyword);

}
