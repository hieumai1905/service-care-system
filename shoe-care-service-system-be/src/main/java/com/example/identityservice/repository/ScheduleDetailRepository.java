package com.example.identityservice.repository;

import com.example.identityservice.entity.Schedule;
import com.example.identityservice.entity.ScheduleDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleDetailRepository extends JpaRepository<ScheduleDetail, Long> {
    @Query("delete from ScheduleDetail where id in (:deleteIds) ")
    void deleteByIds(List<Long> deleteIds);
}
