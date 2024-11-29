package com.example.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Entity(name = "roles")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class Role {
    @Id
    @Column(unique = true)
    String name;

    String description;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "role")
    Set<Permission> permissions;
}
