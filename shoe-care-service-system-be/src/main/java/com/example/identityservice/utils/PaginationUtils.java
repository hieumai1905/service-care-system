package com.example.identityservice.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

public class PaginationUtils {
    public static Pageable getPageable(Integer pageIndex, Integer pageSize) {
        return PageRequest.of(pageIndex - 1, pageSize);
    }
}
