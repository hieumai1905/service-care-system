//package com.example.identityservice.repository;
//
//import com.example.identityservice.entity.Branch;
//import com.example.identityservice.entity.Brand;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.stereotype.Repository;
//
//@Repository
//public interface BranchRepository extends JpaRepository<Branch, Long> {
//    @Query("select b from Branch b where lower(b.name) = lower(:name) " +
//            "and (:id is null or :id <> b.id)")
//    Branch findByIdAndName(Long id, String name);
//}
