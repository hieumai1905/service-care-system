package com.example.identityservice.service;

import com.example.identityservice.dto.request.ProductDetailRequest;
import com.example.identityservice.dto.response.ProductDetailResponse;
import com.example.identityservice.entity.ProductDetail;
import com.example.identityservice.repository.ProductDetailRepository;
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
public class ProductDetailService {
    ProductDetailRepository productDetailRepository;

    public List<ProductDetailResponse> getAllByProductId(Long productId) {
        return ConvertUtils.convertList(productDetailRepository.findAllByProductId(productId), ProductDetailResponse.class);
    }

    public ProductDetailResponse save(ProductDetailRequest productDetailRequest) {
        ProductDetail productDetail = ConvertUtils.convert(productDetailRequest, ProductDetail.class);
        return ConvertUtils.convert(productDetailRepository.save(productDetail), ProductDetailResponse.class);
    }

    public void deleteAllByProductId(Long productId) {
        productDetailRepository.deleteAllByProductId(productId);
    }

    public ProductDetailResponse getProductDetailByProductIdAndColorIdAndSizeId(Long productId, Long sizeId, Long colorId) {
        ProductDetail productDetail = productDetailRepository.findByProductAndSizeAndColor(productId, sizeId, colorId).orElse(null);
        if(productDetail == null) {
            return null;
        }else{
            return ConvertUtils.convert(productDetail, ProductDetailResponse.class);
        }   
    }
}
