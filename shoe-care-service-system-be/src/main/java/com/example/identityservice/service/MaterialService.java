package com.example.identityservice.service;

import com.example.identityservice.dto.BrandDTO;
import com.example.identityservice.dto.MaterialDTO;
import com.example.identityservice.entity.Brand;
import com.example.identityservice.entity.Material;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.BrandRepository;
import com.example.identityservice.repository.MaterialRepository;
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
public class MaterialService {

    MaterialRepository materialRepository;

    public List<MaterialDTO> getAllMaterials() {
        return ConvertUtils.convertList(materialRepository.findAll(), MaterialDTO.class);
    }

    public Material getMaterialById(Long id) {
        return materialRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.RECORD_NOT_FOUND));
    }

    public MaterialDTO createMaterial(MaterialDTO request) {
        request.setId(null);
        Material existByName = materialRepository.findByIdAndName(null, request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        Material material = ConvertUtils.convert(request, Material.class);
        materialRepository.save(material);
        return ConvertUtils.convert(material, MaterialDTO.class);
    }

    public MaterialDTO updateMaterial(MaterialDTO request) {
        if(request.getId() == null){
            throw new AppException(ErrorCode.ID_IS_REQUIRED);
        }
        Material material = getMaterialById(request.getId());
        Material existByName = materialRepository.findByIdAndName(request.getId(), request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        material.setName(request.getName());
        materialRepository.save(material);
        return ConvertUtils.convert(material, MaterialDTO.class);
    }

    public void deleteMaterial(Long id) {
        getMaterialById(id);
        materialRepository.deleteById(id);
    }
}
