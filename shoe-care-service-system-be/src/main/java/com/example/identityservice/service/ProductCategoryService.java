package com.example.identityservice.service;

import com.example.identityservice.dto.ProductCategoryDTO;
import com.example.identityservice.dto.SizeDTO;
import com.example.identityservice.entity.ProductCategory;
import com.example.identityservice.entity.Size;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.ProductCategoryRepository;
import com.example.identityservice.repository.SizeRepository;
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
public class ProductCategoryService {

    ProductCategoryRepository productCategoryRepository;

    public List<ProductCategoryDTO> getAllProductCategories() {
        return ConvertUtils.convertList(productCategoryRepository.findAll(), ProductCategoryDTO.class);
    }

    public ProductCategory getProductCategoryById(Long id) {
        return productCategoryRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.PRODUCT_CATEGORY_NOT_FOUND));
    }

    public ProductCategoryDTO createProductCategory(ProductCategoryDTO request) {
        request.setId(null);
        ProductCategory existByName = productCategoryRepository.findByIdAndName(null, request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        ProductCategory productCategory = ConvertUtils.convert(request, ProductCategory.class);
        productCategoryRepository.save(productCategory);
        return ConvertUtils.convert(productCategory, ProductCategoryDTO.class);
    }

    public ProductCategoryDTO updateProductCategory(ProductCategoryDTO request) {
        if(request.getId() == null){
            throw new AppException(ErrorCode.ID_IS_REQUIRED);
        }
        ProductCategory productCategory = getProductCategoryById(request.getId());
        ProductCategory existByName = productCategoryRepository.findByIdAndName(request.getId(), request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        productCategory.setName(request.getName());
        productCategoryRepository.save(productCategory);
        return ConvertUtils.convert(productCategory, ProductCategoryDTO.class);
    }

    public void deleteProductCategory(Long id) {
        ProductCategory productCategory = getProductCategoryById(id);
        try{
            productCategoryRepository.deleteById(id);
        }catch(Exception ex){
            throw new AppException(ErrorCode.PRODUCT_CATEGORY_IN_USE);
        }
    }
}
