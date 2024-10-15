package com.example.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "schedules")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_id")
    Long id;

    @Column(name = "schedule_at")
    Date scheduleAt;

    @Column(name = "return_at")
    Date returnAt;

    @Column(name = "phone_number", length = 20)
    String phoneNumber;

    @Column(name = "status")
    String status;

    @Column(name = "paid")
    Boolean paid;

    @Column(name = "cost")
    Double cost;

    @Column(name = "get_location")
    String getLocation;

    @Column(name = "note", columnDefinition = "TEXT")
    String note;

    @Column(name = "is_home_return")
    Boolean isHomeReturn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    Branch branch;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @OneToMany(mappedBy = "schedule", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<ScheduleDetail> scheduleDetails;
}
