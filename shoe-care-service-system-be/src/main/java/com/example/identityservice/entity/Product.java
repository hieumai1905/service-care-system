package com.example.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Entity
@Table(name = "products")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    Long id;

    @Column(name = "name", nullable = false, length = 255)
    String name;

    @Column(name = "image", nullable = true, length = 255)
    String image;

    @Column(name = "code", nullable = false)
    String code;

    @Column(name = "input_price")
    Double inputPrice;

    @Column(name = "sell_price")
    Double sellPrice;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_at")
    Date createAt;

    @Column(name = "is_active", nullable = false)
    Boolean isActive;

    @Column(name = "description", length = 255)
    String description;

    @Column(name = "quantity")
    Integer quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_category_id", nullable = false)
    ProductCategory productCategory;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "color_id", nullable = false)
    Color color;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "size_id", nullable = false)
    Size size;
}

