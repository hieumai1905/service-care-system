package com.example.identityservice.entity;

import com.example.identityservice.enums.OrderStatus;
import com.example.identityservice.enums.PaymentMethod;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    Long id;

    @Column(name = "create_at")
    @Temporal(TemporalType.TIMESTAMP)
    Date createdAt;

    @Column(name = "total")
    Double total;

    @Column(name = "discount")
    Double discount;

    @Column(name = "payment_type")
    @Enumerated(EnumType.STRING)
    PaymentMethod paymentType;

    @Column(name = "note")
    String note;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    OrderStatus status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    Client client;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coupon_item_id", nullable = true)
    CouponItem couponItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    List<OrderDetail> orderDetails;
}

