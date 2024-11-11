package com.example.identityservice.service;

import com.example.identityservice.dto.request.CreateShoeServiceRequest;
import com.example.identityservice.dto.request.SearchShoeServiceRequest;
import com.example.identityservice.dto.request.UpdateClientRequest;
import com.example.identityservice.dto.request.UpdateShoeServiceRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.Brand;
import com.example.identityservice.entity.CategoryService;
import com.example.identityservice.entity.Client;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.BrandRepository;
import com.example.identityservice.repository.CategoryServiceRepository;
import com.example.identityservice.repository.ShoeServiceRepository;
import com.example.identityservice.entity.ShoeService;
import com.example.identityservice.utils.ConvertUtils;
import com.example.identityservice.utils.PaginationUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.sql.Update;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ShoeServiceService {

    ShoeServiceRepository serviceRepository;
    BrandRepository brandRepository;
    CategoryServiceRepository categoryServiceRepository;

    public SearchResponse<UpdateShoeServiceRequest> searchShoeService(SearchShoeServiceRequest request) {
        request.validateInput();

        Page<ShoeService> shoeServices = serviceRepository.search(
                request.getKeyWord(),
                request.getIsActive(),
                PaginationUtils.getPageable(request.getPageIndex(), request.getPageSize())
        );

        SearchResponse<UpdateShoeServiceRequest> response = new SearchResponse<>();
        response.setPageIndex(request.getPageIndex());
        response.setPageSize(request.getPageSize());
        response.setTotalElements(shoeServices.getTotalElements());
        response.setData(ConvertUtils.convertList(shoeServices.getContent(), UpdateShoeServiceRequest.class));

        return response;
    }

    public ShoeService getServiceById(Long id) {
        return serviceRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SERVICE_NOT_FOUND));
    }

    public UpdateShoeServiceRequest createService(CreateShoeServiceRequest request) {
        checkExistNameOrCode(null, request.getName(), request.getServiceCode());
        checkExistCategory(request.getCategoryServiceId());
        checkExistBrand(request.getBrandId());
        ShoeService shoeService = ConvertUtils.convert(request, ShoeService.class);
        shoeService.setId(null);
        serviceRepository.save(shoeService);
        return ConvertUtils.convert(shoeService, UpdateShoeServiceRequest.class);
    }

    private void checkExistNameOrCode(Long id, String name, String code) {
        ShoeService existByName = serviceRepository.findByIdAndName(id, name);
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        ShoeService existByCode = serviceRepository.findByIdAndCode(id, code);
        if(existByCode != null){
            throw new AppException(ErrorCode.CODE_ALREADY_EXIST);
        }
    }

    public UpdateShoeServiceRequest updateService(UpdateShoeServiceRequest serviceDetails) {
        ShoeService service = getServiceById(serviceDetails.getId());
        service.setName(serviceDetails.getName());
        service.setPrice(serviceDetails.getPrice());
        service.setServiceCode(serviceDetails.getServiceCode());
        service.setInputPrice(serviceDetails.getInputPrice());
        service.setSellPrice(serviceDetails.getSellPrice());
        service.setProfits(serviceDetails.getProfits());
        service.setCreateAt(serviceDetails.getCreateAt());
        service.setIsActive(serviceDetails.getIsActive());
        service.setNote(serviceDetails.getNote());
        service.setConsumingTime(serviceDetails.getConsumingTime());
        service.setBrand(checkExistBrand(serviceDetails.getBrandId()));
        service.setCategoryService(checkExistCategory(serviceDetails.getCategoryServiceId()));
        serviceRepository.save(service);
        return ConvertUtils.convert(service, UpdateShoeServiceRequest.class);
    }

    private CategoryService checkExistCategory(Long categoryServiceId) {
        return categoryServiceRepository.findById(categoryServiceId).orElseThrow(
                () -> new AppException(ErrorCode.CATEGORY_SERVICE_NOT_FOUND)
        );
    }

    private Brand checkExistBrand(Long brandId) {
        return brandRepository.findById(brandId).orElseThrow(
                () -> new AppException(ErrorCode.BRAND_NOT_FOUND)
        );
    }

    public void deleteService(Long id) {
        ShoeService shoeService = getServiceById(id);
        try{
            serviceRepository.deleteById(id);
        }catch(Exception ex){
            throw new AppException(ErrorCode.SERVICE_IN_USE);
        }
    }
}

