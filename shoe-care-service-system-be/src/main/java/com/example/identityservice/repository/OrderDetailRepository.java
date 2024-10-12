package com.example.identityservice.repository;

import com.example.identityservice.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {
    @Query("delete from OrderDetail od where od.id in (:ids)")
    void deleteByIds(List<Long> ids);
}
