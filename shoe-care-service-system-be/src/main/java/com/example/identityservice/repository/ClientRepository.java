package com.example.identityservice.repository;

import com.example.identityservice.entity.Client;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientRepository extends JpaRepository<Client, Long> {
    @Query("select c from Client c where (:keyWord is null or lower(c.email) like %:keyWord% " +
            "   or lower(c.name) like %:keyWord% or lower(c.tel) like %:keyWord% " +
            "   or lower(c.address) like %:keyWord%) " +
            "and (:clientCategoryId is null or c.clientCategory.id = :clientCategoryId)")
    Page<Client> search(String keyWord, Long clientCategoryId, Pageable pageable);

    @Query("SELECT c FROM Client c " +
            "JOIN c.clientCategory cc " +
            "WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.tel) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.address) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(cc.typeName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR (:keyword IS NULL OR c.id = :id)")
    List<Client> searchClientsByKeyword(@Param("keyword") String keyword, @Param("id") Long id);

}
