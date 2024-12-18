package com.example.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "services")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShoeService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    Long id;

    @Column(name = "name", nullable = false, length = 255)
    String name;

    @Column(name = "price", nullable = false)
    Double price;

    @Column(name = "service_code", nullable = false, length = 255)
    String serviceCode;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_at")
    Date createAt;

    @Column(name = "is_active", nullable = false)
    Boolean isActive;

    @Column(name = "note", length = 255)
    String note;

    @Column(name = "consuming_time")
    Double consumingTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_service_id", nullable = false)
    CategoryService categoryService;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "brand_id", nullable = false)
    Brand brand;
}

