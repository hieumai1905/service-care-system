package com.example.identityservice.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;


@Entity
@Table(name = "schedule_details")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ScheduleDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "schedule_detail_id")
    Long id;
    
    @JoinColumn(name = "schedule_id", nullable = false)
    @OneToOne(fetch = FetchType.LAZY)
    Schedule schedule;

    @Column(name = "shoe_service")
    private String shoeServiceAsString;

    public Set<Integer> getShoeService() {
        if (shoeServiceAsString == null || shoeServiceAsString.isEmpty()) {
            return new HashSet<>();
        }
        return Arrays.stream(shoeServiceAsString.split(","))
                .map(Integer::parseInt)
                .collect(Collectors.toSet());
    }

    public void setShoeService(Set<Integer> shoeService) {
        if (shoeService == null || shoeService.isEmpty()) {
            this.shoeServiceAsString = "";
        } else {
            this.shoeServiceAsString = shoeService.stream()
                    .map(String::valueOf)
                    .collect(Collectors.joining(","));
        }
    }
}
