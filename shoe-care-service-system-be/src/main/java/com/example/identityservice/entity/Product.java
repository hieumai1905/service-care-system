package com.example.identityservice.entity;

import com.example.identityservice.enums.ProductStatus;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

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

    @Column(name = "name", nullable = false)
    String name;

    @Column(name = "image")
    String image;

    @Column(name = "code", nullable = false)
    String code;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "create_at")
    Date createAt;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    ProductStatus status;

    @Column(name = "description")
    String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_category_id", nullable = false)
    ProductCategory productCategory;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    List<ProductDetail> productDetails;
}

