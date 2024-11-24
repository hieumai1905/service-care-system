package com.example.identityservice.enums;

import lombok.Getter;

@Getter
public enum ProductStatus {
    ACTIVE("Kinh doanh"),
    DISCONTINUED("Ngừng kinh doanh");

    private final String description;

    ProductStatus(String description) {
        this.description = description;
    }
}
