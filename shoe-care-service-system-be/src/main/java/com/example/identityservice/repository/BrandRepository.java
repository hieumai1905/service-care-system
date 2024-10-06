package com.example.identityservice.repository;

import com.example.identityservice.entity.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository extends JpaRepository<Brand, Long> {
    @Query("select b from Brand b where lower(b.name) = lower(:name) " +
            "and (:id is null or :id <> b.id)")
    Brand findByIdAndName(Long id, String name);
}

