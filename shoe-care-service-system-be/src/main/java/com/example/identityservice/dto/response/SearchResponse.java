package com.example.identityservice.dto.response;

import com.example.identityservice.dto.request.PaginationRequest;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class SearchResponse<T> extends PaginationRequest {
    private List<T> data;
    private Long totalElements;
}
