package com.example.identityservice.repository;

import com.example.identityservice.entity.CategoryService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryServiceRepository extends JpaRepository<CategoryService, Long> {
    @Query("select c from CategoryService c where lower(c.name) = lower(:name) " +
            "and (:id is null or :id <> c.id)")
    CategoryService findByIdAndName(Long id, String name);
}
