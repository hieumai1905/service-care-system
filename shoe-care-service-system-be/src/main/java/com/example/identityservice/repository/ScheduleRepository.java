package com.example.identityservice.repository;

import com.example.identityservice.entity.Branch;
import com.example.identityservice.entity.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query("select s from Schedule s where (:keyWord is null or lower(s.branch.name) like %:keyWord% " +
            "   or lower(s.client.name) like %:keyWord%) " +
            "and (:status is null or lower(s.status) like %:status%) " +
            "and (:scheduleAt is null or s.scheduleAt >= :scheduleAt) ")
    Page<Schedule> search(String keyWord, String status, Date scheduleAt, Pageable pageable);
}
