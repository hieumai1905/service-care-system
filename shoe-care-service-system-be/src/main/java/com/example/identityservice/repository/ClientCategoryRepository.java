package com.example.identityservice.repository;

import com.example.identityservice.entity.ClientCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ClientCategoryRepository extends JpaRepository<ClientCategory, Long> {
    @Query("select c from ClientCategory c where (:typeName is null or lower(c.typeName) like %:typeName%) " +
            "and (:discountType is null or lower(c.discountType) like %:discountType%) " +
            "and (:isActive is null or c.isActive = :isActive) ")
    Page<ClientCategory> search(String typeName, String discountType, Boolean isActive, Pageable pageable);
}
