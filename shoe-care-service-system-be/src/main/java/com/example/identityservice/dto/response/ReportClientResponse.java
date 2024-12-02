package com.example.identityservice.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReportClientResponse {
    Double totalPaid;
    
    Long countOrder;
    
    Double minPaid;
    
    Double maxPaid;
}
