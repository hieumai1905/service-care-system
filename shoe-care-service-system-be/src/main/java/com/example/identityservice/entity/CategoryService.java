package com.example.identityservice.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity
@Table(name = "category_services")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CategoryService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_service_id")
    Long id;

    @Column(name = "name", nullable = false, length = 255)
    String name;
    @OneToMany(mappedBy = "categoryService", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<ShoeService> shoeServices;
}

