package com.example.identityservice.service;

import com.example.identityservice.dto.CategoryServiceDTO;
import com.example.identityservice.entity.CategoryService;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.CategoryServiceRepository;
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
public class CategoryServiceService {

    CategoryServiceRepository categoryServiceRepository;

    public List<CategoryServiceDTO> getAllCategoryServices() {
        return ConvertUtils.convertList(categoryServiceRepository.findAll(), CategoryServiceDTO.class);
    }

    public CategoryService getCategoryServiceById(Long id) {
        return categoryServiceRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.RECORD_NOT_FOUND));
    }

    public CategoryServiceDTO createCategoryService(CategoryServiceDTO request) {
        request.setId(null);
        CategoryService existByName = categoryServiceRepository.findByIdAndName(null, request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        CategoryService categoryService = ConvertUtils.convert(request, CategoryService.class);
        categoryServiceRepository.save(categoryService);
        return ConvertUtils.convert(categoryService, CategoryServiceDTO.class);
    }

    public CategoryServiceDTO updateCategoryService(CategoryServiceDTO request) {
        if(request.getId() == null){
            throw new AppException(ErrorCode.ID_IS_REQUIRED);
        }
        CategoryService existingCategoryService = getCategoryServiceById(request.getId());
        CategoryService existByName = categoryServiceRepository.findByIdAndName(request.getId(), request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        existingCategoryService.setName(request.getName());
        categoryServiceRepository.save(existingCategoryService);
        return ConvertUtils.convert(existingCategoryService, CategoryServiceDTO.class);
    }

    public void deleteCategoryService(Long id) {
        CategoryService existingCategoryService = getCategoryServiceById(id);
        categoryServiceRepository.deleteById(id);
    }
}
