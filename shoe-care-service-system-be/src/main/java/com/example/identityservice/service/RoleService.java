package com.example.identityservice.service;

import com.example.identityservice.dto.request.RoleRequest;
import com.example.identityservice.dto.response.RoleResponse;
import com.example.identityservice.entity.Role;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.mapper.RoleMapper;
import com.example.identityservice.repository.PermissionRepository;
import com.example.identityservice.repository.RoleRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class RoleService {
    RoleRepository roleRepository;
    PermissionRepository permissionRepository;
    RoleMapper roleMapper;

    public RoleResponse create(RoleRequest request) {
        Optional<Role> roleExits = roleRepository.findByName(request.getName());
        if (roleExits.isPresent()) {
            throw new AppException(ErrorCode.ROLE_NOT_EXISTED);
        }

        var role = roleMapper.toRole(request);

        var permissions = permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(new HashSet<>(permissions));
        role.setName(request.getName().toUpperCase());

        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }

    public RoleResponse findByName(String name) {
        var role = roleRepository.findById(name).orElseThrow();
        return roleMapper.toRoleResponse(role);
    }

    public List<RoleResponse> getAll() {
        return roleRepository.findAll().stream().map(roleMapper::toRoleResponse).toList();
    }

    public void delete(String role) {
        roleRepository.deleteById(role);
    }

    public RoleResponse update(String name, RoleRequest request) {
        var role = roleRepository.findById(name).orElseThrow();
        role.setName(request.getName());
        role.setDescription(request.getDescription());

        var permissions = permissionRepository.findAllById(request.getPermissions());
        role.setPermissions(new HashSet<>(permissions));

        role = roleRepository.save(role);
        return roleMapper.toRoleResponse(role);
    }
}
