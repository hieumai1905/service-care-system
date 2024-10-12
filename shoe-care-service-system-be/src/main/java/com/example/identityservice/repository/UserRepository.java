package com.example.identityservice.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.identityservice.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByUsername(String username);

    @Query("SELECT u FROM users u WHERE " + "LOWER(u.id) LIKE LOWER(CONCAT('%', :query, '%')) OR "
            + "LOWER(u.username) LIKE LOWER(CONCAT('%', :query, '%')) OR "
            + "LOWER(u.email) LIKE LOWER(CONCAT('%', :query, '%')) OR "
            + "LOWER(u.fullName) LIKE LOWER(CONCAT('%', :query, '%')) OR "
            + "LOWER(u.phone) LIKE LOWER(CONCAT('%', :query, '%')) OR "
            + "LOWER(u.role.name) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<User> searchUsers(@Param("query") String query);
}
