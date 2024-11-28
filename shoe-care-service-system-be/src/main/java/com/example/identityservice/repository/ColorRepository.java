package com.example.identityservice.repository;

import com.example.identityservice.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
    @Query("select b from Color b where lower(b.name) = lower(:name) " +
            "and (:id is null or :id <> b.id)")
    Color findByIdAndName(Long id, String name);

    @Query("SELECT DISTINCT c FROM Color c " +
            "JOIN ProductDetail pd ON pd.color.id = c.id " +
            "WHERE pd.product.id = :productId")
    List<Color> findAllByProductId(Long productId);
}
