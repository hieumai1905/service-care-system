package com.example.identityservice.service;

import com.example.identityservice.dto.request.PermissionRequest;
import com.example.identityservice.dto.request.PermissionResponse;
import com.example.identityservice.entity.Permission;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.mapper.PermissionMapper;
import com.example.identityservice.repository.PermissionRepository;
import com.example.identityservice.repository.RoleRepository;
import com.example.identityservice.utils.ConvertUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class PermissionService {
    PermissionRepository permissionRepository;

    PermissionMapper permissionMapper;

    RoleRepository roleRepository;

    public PermissionResponse create(PermissionRequest request) {
        Optional<Permission> permissionExits = permissionRepository.findByName(request.getName());
        if (permissionExits.isPresent()) {
            throw new AppException(ErrorCode.PERMISSION_EXISTED);
        }

        Permission permission = permissionMapper.toEntity(request);
        permission.setName(request.getName().toUpperCase());

        permission.setRole(roleRepository.findById(request.getRoleName()).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED)));

        permission = permissionRepository.save(permission);

        return permissionMapper.toPermissionResponse(permission);
    }

    public List<PermissionResponse> getAll() {
        List<Permission> permissions = permissionRepository.findAll();

        return ConvertUtils.convertList(permissions, PermissionResponse.class);
    }

    public void delete(String name) {
        try {
            permissionRepository.deleteById(name);
        } catch (Exception e) {
            throw new AppException(ErrorCode.PERMISSION_IN_USE);
        }
    }

    public PermissionResponse update(String name, PermissionRequest request) {
        Permission permission = permissionRepository.findById(name)
                .orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));

        permission.setDescription(request.getDescription());
        permission.setRole(roleRepository.findById(request.getRoleName()).orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_EXISTED)));
        permission = permissionRepository.save(permission);

        return permissionMapper.toPermissionResponse(permission);
    }

    public PermissionResponse findByName(String name) {
        Permission permission = permissionRepository.findById(name)
                .orElseThrow(() -> new AppException(ErrorCode.PERMISSION_NOT_EXISTED));

        return ConvertUtils.convert(permission, PermissionResponse.class);
    }
}
