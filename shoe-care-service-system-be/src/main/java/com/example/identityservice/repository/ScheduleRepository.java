package com.example.identityservice.repository;

import com.example.identityservice.entity.Client;
import com.example.identityservice.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query("SELECT s FROM Schedule s " +
            "JOIN s.client c " +
            "JOIN s.user u " +
            "WHERE LOWER(u.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.name) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.tel) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.email) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(c.address) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR s.id = :id")
    List<Schedule> searchSchedulesByKeyword(@Param("keyword") String keyword, @Param("id") Long id);
}
