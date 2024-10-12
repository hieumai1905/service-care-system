package com.example.identityservice.repository;

import com.example.identityservice.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {
    @Query("select b from Color b where lower(b.name) = lower(:name) " +
            "and (:id is null or :id <> b.id)")
    Color findByIdAndName(Long id, String name);
}
