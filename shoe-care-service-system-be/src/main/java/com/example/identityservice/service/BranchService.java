package com.example.identityservice.service;

import com.example.identityservice.dto.BranchDTO;
import com.example.identityservice.dto.BrandDTO;
import com.example.identityservice.entity.Branch;
import com.example.identityservice.entity.Brand;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.BranchRepository;
import com.example.identityservice.repository.BrandRepository;
import com.example.identityservice.utils.ConvertUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class BranchService {

    BranchRepository branchRepository;

    public List<BranchDTO> getAllBranchs() {
        return ConvertUtils.convertList(branchRepository.findAll(), BranchDTO.class);
    }

    public Branch getBranchById(Long id) {
        return branchRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.BRANCH_NOT_FOUND));
    }

    public BranchDTO createBranch(BranchDTO request) {
        request.setId(null);
        Branch existByName = branchRepository.findByIdAndName(null, request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        Branch branch = ConvertUtils.convert(request, Branch.class);
        branchRepository.save(branch);
        return ConvertUtils.convert(branch, BranchDTO.class);
    }

    public BranchDTO updateBranch(BranchDTO request) {
        if(request.getId() == null){
            throw new AppException(ErrorCode.ID_IS_REQUIRED);
        }
        Branch branch = getBranchById(request.getId());
        Branch existByName = branchRepository.findByIdAndName(request.getId(), request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        branch.setName(request.getName());
        branchRepository.save(branch);
        return ConvertUtils.convert(branch, BranchDTO.class);
    }

    public void deleteBranch(Long id) {
        Branch branch = getBranchById(id);
        try{
            branchRepository.deleteById(id);
        }catch(Exception ex){
            throw new AppException(ErrorCode.BRANCH_IN_USE);
        }
    }
}
