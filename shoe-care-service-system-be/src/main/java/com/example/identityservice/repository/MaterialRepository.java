package com.example.identityservice.repository;

import com.example.identityservice.entity.Brand;
import com.example.identityservice.entity.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long> {
    @Query("select b from Material b where lower(b.name) = lower(:name) " +
            "and (:id is null or :id <> b.id)")
    Material findByIdAndName(Long id, String name);
}

