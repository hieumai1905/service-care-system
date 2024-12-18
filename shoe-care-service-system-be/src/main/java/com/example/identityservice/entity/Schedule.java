package com.example.identityservice.entity;

import com.example.identityservice.enums.PaymentMethod;
import com.example.identityservice.enums.ScheduleStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

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

    @Column(name = "created_at")
    Date createdAt;

    @Column(name = "return_at")
    Date returnAt;

    @Column(name = "status")
    ScheduleStatus status;

    @Column(name = "paid")
    Double paid;

    @Column(name = "payment_type")
    @Enumerated(EnumType.STRING)
    PaymentMethod paymentType;

    @Column(name = "discount")
    Double discount;

    @Column(name = "cost")
    Double cost;

    @Column(name = "note", columnDefinition = "TEXT")
    String note;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "material_id", nullable = false)
    Material material;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    Brand brand;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id", nullable = false)
    Color color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "size_id", nullable = false)
    Size size;
    
    @OneToOne(mappedBy = "schedule", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private ScheduleDetail scheduleDetail;

    @PrePersist
    public void prePersist() {
        this.createdAt = new Date();
        status = ScheduleStatus.CREATED;
    }
}
