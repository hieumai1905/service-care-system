package com.example.identityservice.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import com.example.identityservice.dto.request.UserCreationRequest;
import com.example.identityservice.dto.request.UserUpdateRequest;
import com.example.identityservice.dto.response.UserResponse;
import com.example.identityservice.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    @Mapping(target = "role", ignore = true)
    User toEntity(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "role", ignore = true)
    void userUpdateRequestToUser(UserUpdateRequest request, @MappingTarget User user);
}
