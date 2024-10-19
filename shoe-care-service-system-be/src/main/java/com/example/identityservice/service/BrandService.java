package com.example.identityservice.service;

import com.example.identityservice.dto.BrandDTO;
import com.example.identityservice.entity.Brand;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
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
public class BrandService {

    BrandRepository brandRepository;

    public List<BrandDTO> getAllBrands() {
        return ConvertUtils.convertList(brandRepository.findAll(), BrandDTO.class);
    }

    public Brand getBrandById(Long id) {
        return brandRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
    }

    public BrandDTO createBrand(BrandDTO request) {
        request.setId(null);
        Brand existByName = brandRepository.findByIdAndName(null, request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        Brand brand = ConvertUtils.convert(request, Brand.class);
        brandRepository.save(brand);
        return ConvertUtils.convert(brand, BrandDTO.class);
    }

    public BrandDTO updateBrand(BrandDTO request) {
        if(request.getId() == null){
            throw new AppException(ErrorCode.ID_IS_REQUIRED);
        }
        Brand brand = getBrandById(request.getId());
        Brand existByName = brandRepository.findByIdAndName(request.getId(), request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        brand.setName(request.getName());
        brandRepository.save(brand);
        return ConvertUtils.convert(brand, BrandDTO.class);
    }

    public void deleteBrand(Long id) {
        Brand brand = getBrandById(id);
        try {
            brandRepository.deleteById(id);
        }catch (Exception ex){
            throw new AppException(ErrorCode.BRAND_IN_USE);
        }
    }
}
