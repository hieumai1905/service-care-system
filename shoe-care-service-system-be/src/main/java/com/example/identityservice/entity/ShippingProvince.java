package com.example.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "shipping_provinces")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ShippingProvince {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String province;

    Double fee;
}

