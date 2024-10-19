package com.example.identityservice.service;

import com.example.identityservice.dto.request.*;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.*;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.*;
import com.example.identityservice.utils.ConvertUtils;
import com.example.identityservice.utils.PaginationUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ProductService {
    ProductRepository productRepository;
    ProductCategoryRepository productCategoryRepository;
    SizeRepository sizeRepository;
    ColorRepository colorRepository;

    public Long createProduct(CreateProductRequest request){
//        request.validateInput();
        getExistProductCategory(request.getProductCategoryId());
        getExistColor(request.getColorId());
        getExistSize(request.getSizeId());

        Product existByName = productRepository.existsByIdAndName(null, request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        Product existByCode = productRepository.existsByIdAndCode(null, request.getCode());
        if(existByCode != null){
            throw new AppException(ErrorCode.CODE_ALREADY_EXIST);
        }

        Product product = ConvertUtils.convert(request, Product.class);
        product.setId(null);
        productRepository.save(product);
        return product.getId();
    }

    private Size getExistSize(Long sizeId) {
        return sizeRepository.findById(sizeId).orElseThrow(
                () -> new AppException(ErrorCode.SIZE_NOT_FOUND)
        );
    }

    private Color getExistColor(Long colorId) {
        return colorRepository.findById(colorId).orElseThrow(
                () -> new AppException(ErrorCode.COLOR_NOT_FOUND)
        );
    }

    private ProductCategory getExistProductCategory(Long productCategoryId) {
        return productCategoryRepository.findById(productCategoryId).orElseThrow(
                () -> new AppException(ErrorCode.PRODUCT_CATEGORY_NOT_FOUND)
        );
    }

    public Long updateProduct(UpdateProductRequest request){
//        request.validateInput();
        Product existingProduct = getExistProduct(request.getId());
        ProductCategory productCategory = getExistProductCategory(request.getProductCategoryId());
        Color color = getExistColor(request.getColorId());
        Size size = getExistSize(request.getSizeId());

        Product existByName = productRepository.existsByIdAndName(request.getId(), request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }

        existingProduct.setProductCategory(productCategory);
        existingProduct.setSize(size);
        existingProduct.setColor(color);
        existingProduct.setName(request.getName());
        existingProduct.setImage(request.getImage());
        existingProduct.setIsActive(request.getIsActive());
        existingProduct.setQuantity(request.getQuantity());
        existingProduct.setInputPrice(request.getInputPrice());
        existingProduct.setSellPrice(request.getSellPrice());
        existingProduct.setDescription(request.getDescription());

        productRepository.save(existingProduct);
        return existingProduct.getId();
    }

    private Product getExistProduct(Long id) {
        return productRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.PRODUCT_NOT_FOUND)
        );
    }

    public void deleteProduct(Long id){
        Product existingProduct = getExistProduct(id);
        try{
            productRepository.delete(existingProduct);
        }catch(Exception ex){
            throw new AppException(ErrorCode.PRODUCT_IN_USE);
        }
    }

    public SearchResponse<UpdateProductRequest> searchProduct(SearchProductRequest request){
        request.validateInput();

        Page<Product> products = productRepository.search(
            request.getKeyWord(),
            request.getClientCategoryId(),
            PaginationUtils.getPageable(request.getPageIndex(), request.getPageSize())
        );

        SearchResponse<UpdateProductRequest> response = new SearchResponse<>();
        response.setPageIndex(request.getPageIndex());
        response.setPageSize(request.getPageSize());
        response.setTotalElements(products.getTotalElements());
        response.setData(ConvertUtils.convertList(products.getContent(), UpdateProductRequest.class));

        return response;
    }

}
