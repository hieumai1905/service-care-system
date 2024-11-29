package com.example.identityservice.repository;

import com.example.identityservice.entity.Order;
import com.example.identityservice.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("select o from Order o where (:keyWord is null or lower(o.client.name) like %:keyWord% " +
            "    or lower(o.user.fullName) like %:keyWord% ) " +
            "and (:orderDate is null or o.createdAt >= :orderDate)")
    Page<Order> search(String keyWord, Date orderDate, Pageable pageable);

    @Query("SELECT o FROM Order o " +
            "WHERE (:keyWord IS NULL OR " +
            "   LOWER(o.client.name) LIKE LOWER(CONCAT('%', :keyWord, '%')) " +
            "   OR LOWER(o.user.fullName) LIKE LOWER(CONCAT('%', :keyWord, '%')) " +
            "   OR CAST(o.id AS string) LIKE CONCAT('%', :keyWord, '%') " +
            "   OR CAST(o.client.id AS string) LIKE CONCAT('%', :keyWord, '%') " +
            "   OR CAST(o.user.id AS string) LIKE CONCAT('%', :keyWord, '%'))")
    List<Order> searchOrderByKeyword(@Param("keyWord") String keyWord);

    List<Order> findAllByCreatedAtBetweenAndStatus(Date from, Date from1, OrderStatus orderStatus);

    double countByStatus(OrderStatus orderStatus);
}
