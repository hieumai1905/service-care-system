package com.example.identityservice.service;

import com.example.identityservice.dto.request.CreateClientCategoryRequest;
import com.example.identityservice.dto.request.SearchClientCategoryRequest;
import com.example.identityservice.dto.request.UpdateClientCategoryRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.ClientCategory;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.ClientCategoryRepository;
import com.example.identityservice.utils.ConvertUtils;
import com.example.identityservice.utils.PaginationUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ClientCategoryService {

    ClientCategoryRepository clientCategoryRepository;

    public Long createClientCategory(CreateClientCategoryRequest request){
//        request.validateInput();
        ClientCategory clientCategory = ConvertUtils.convert(request, ClientCategory.class);
        clientCategory.setId(null);
        try {
        clientCategoryRepository.save(clientCategory);
        } catch (DataIntegrityViolationException exception) {
            throw new AppException(ErrorCode.CLIENT_CATEGORY_EXISTED);
        }
        return clientCategory.getId();
    }

    public Long updateClientCategory(UpdateClientCategoryRequest request){
//        request.validateInput();
        ClientCategory clientCategory = getExistClientCategory(request.getId());

        clientCategory.setDiscount(request.getDiscount());
        clientCategory.setNote(request.getNote());
        clientCategory.setIsActive(request.getIsActive());
        clientCategory.setTotalRequire(request.getTotalRequire());
        clientCategory.setDiscountType(request.getDiscountType());
        clientCategory.setTypeName(request.getTypeName());

        clientCategoryRepository.save(clientCategory);
        return clientCategory.getId();
    }

    public void deleteClientCategory(Long id){
        ClientCategory clientCategory = getExistClientCategory(id);
        try{
            clientCategoryRepository.delete(clientCategory);
        }catch(Exception ex){
            throw new AppException(ErrorCode.CLIENT_CATEGORY_IN_USE);
        }
    }

    public SearchResponse<UpdateClientCategoryRequest> searchClientCategory(SearchClientCategoryRequest request){
        request.validateInput();

        Page<ClientCategory> clients = clientCategoryRepository.search(
                request.getTypeName(),
                request.getDiscountType(),
                request.getIsActive(),
                PaginationUtils.getPageable(request.getPageIndex(), request.getPageSize())
        );

        SearchResponse<UpdateClientCategoryRequest> response = new SearchResponse<>();
        response.setPageIndex(request.getPageIndex());
        response.setPageSize(request.getPageSize());
        response.setTotalElements(clients.getTotalElements());
        response.setData(ConvertUtils.convertList(clients.getContent(), UpdateClientCategoryRequest.class));

        return response;
    }

    private ClientCategory getExistClientCategory(Long clientCategoryId) {
        return clientCategoryRepository.findById(clientCategoryId).orElseThrow(
                () -> new AppException(ErrorCode.CLIENT_CATEGORY_NOT_FOUND)
        );
    }

    public List<UpdateClientCategoryRequest> getClientCategories() {
        List<ClientCategory> clientCategories = clientCategoryRepository.findAll();
        return ConvertUtils.convertList(clientCategories, UpdateClientCategoryRequest.class);
    }

    public UpdateClientCategoryRequest getClientCategoryById(Long id) {
        ClientCategory clientCategory = getExistClientCategory(id);
        return ConvertUtils.convert(clientCategory, UpdateClientCategoryRequest.class);
    }
}
