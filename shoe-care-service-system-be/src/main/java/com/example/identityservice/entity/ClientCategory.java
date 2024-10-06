package com.example.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "client_categories")
public class ClientCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type_name", nullable = false)
    private String typeName;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @Column(name = "discount", nullable = false)
    private Double discount;

    @Column(name = "discount_type", nullable = false)
    private String discountType;

    @Column(name = "note")
    private String note;

    @Column(name = "total_require", nullable = false)
    private Double totalRequire;

    @OneToMany(mappedBy = "clientCategory", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Client> clients;

}
