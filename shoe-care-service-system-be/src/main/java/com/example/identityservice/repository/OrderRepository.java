package com.example.identityservice.repository;

import com.example.identityservice.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
   @Query("select o from Order o where (:keyWord is null or lower(o.client.name) like %:keyWord% " +
           "    or lower(o.user.fullName) like %:keyWord% ) " +
           "and (:orderDate is null or o.createdAt >= :orderDate)")
   Page<Order> search(String keyWord, Date orderDate, Pageable pageable);
}
