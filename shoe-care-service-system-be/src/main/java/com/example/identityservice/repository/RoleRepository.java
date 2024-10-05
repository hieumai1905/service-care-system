package com.example.identityservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.identityservice.entity.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, String> {}
