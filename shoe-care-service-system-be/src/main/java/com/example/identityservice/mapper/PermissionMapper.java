package com.example.identityservice.mapper;

import org.mapstruct.Mapper;

import com.example.identityservice.dto.request.PermissionRequest;
import com.example.identityservice.dto.request.PermissionResponse;
import com.example.identityservice.entity.Permission;

@Mapper(componentModel = "spring")
public interface PermissionMapper {
    Permission toEntity(PermissionRequest request);

    PermissionResponse toPermissionResponse(Permission permission);
}
