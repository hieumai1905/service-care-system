package com.example.identityservice.service;

import com.example.identityservice.dto.request.CreateProductRequest;
import com.example.identityservice.dto.request.ProductDetailRequest;
import com.example.identityservice.dto.request.SearchProductRequest;
import com.example.identityservice.dto.request.UpdateProductRequest;
import com.example.identityservice.dto.response.ProductResponse;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.Product;
import com.example.identityservice.entity.ProductCategory;
import com.example.identityservice.entity.ProductDetail;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.ColorRepository;
import com.example.identityservice.repository.ProductCategoryRepository;
import com.example.identityservice.repository.ProductRepository;
import com.example.identityservice.repository.SizeRepository;
import com.example.identityservice.utils.ConvertUtils;
import com.example.identityservice.utils.PaginationUtils;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ProductService {
    final ProductRepository productRepository;
    final ProductCategoryRepository productCategoryRepository;
    final ProductDetailService productDetailService;

    @Value("${app.upload-dir}")
    String uploadDir;

    @Transactional
    public Long createProduct(CreateProductRequest request, MultipartFile file) throws JsonProcessingException {
        getExistProductCategory(request.getProductCategoryId());
        String filePath = "";
        if (file != null)
            filePath = saveFile(file);

        Product existByName = productRepository.findByName(request.getName());
        if (existByName != null) {
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        Product existByCode = productRepository.findByCode(request.getCode());
        if (existByCode != null) {
            throw new AppException(ErrorCode.CODE_ALREADY_EXIST);
        }

        Product product = ConvertUtils.convert(request, Product.class);
        product.setId(null);
        product.setImage(new File(filePath).getName());
        ObjectMapper objectMapper = new ObjectMapper();
        List<ProductDetailRequest> productDetailRequests = objectMapper.readValue(request.getProductDetails(),
                objectMapper.getTypeFactory().constructCollectionType(List.class, ProductDetailRequest.class));

        List<ProductDetail> productDetails = new ArrayList<>();
        productDetailRequests.forEach(productDetailItem -> {
            ProductDetail productDetail = ConvertUtils.convert(productDetailItem, ProductDetail.class);
            productDetail.setProduct(product);
            productDetails.add(productDetail);
        });
        if (product.getDescription() == null) {
            product.setDescription("");
        }
        product.setProductDetails(productDetails);
        productRepository.save(product);
        return product.getId();
    }

    private String saveFile(MultipartFile file) {
        File destinationFile = new File(uploadDir, Objects.requireNonNull(file.getOriginalFilename()));

        try {
            file.transferTo(destinationFile);
            return destinationFile.getAbsolutePath();
        } catch (IOException e) {
            throw new AppException(ErrorCode.FAIL_TO_UPLOAD_FILE);
        }
    }

    private ProductCategory getExistProductCategory(Long productCategoryId) {
        return productCategoryRepository.findById(productCategoryId).orElseThrow(
                () -> new AppException(ErrorCode.PRODUCT_CATEGORY_NOT_FOUND)
        );
    }

    @Transactional
    public Long updateProduct(UpdateProductRequest request, MultipartFile file) throws JsonProcessingException {
        Product existingProduct = getExistProduct(request.getId());
        ProductCategory productCategory = getExistProductCategory(request.getProductCategoryId());

        Product existByName = productRepository.findByName(request.getName());
        if (existByName != null && !Objects.equals(existByName.getId(), request.getId())) {
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        Product existByCode = productRepository.findByCode(request.getCode());
        if (existByCode != null && !Objects.equals(existByCode.getId(), request.getId())) {
            throw new AppException(ErrorCode.CODE_ALREADY_EXIST);
        }

        if (file != null) {
            String filePath = saveFile(file);
            existingProduct.setImage(new File(filePath).getName());
        }

        existingProduct.setProductCategory(productCategory);
        existingProduct.setName(request.getName());
        existingProduct.setStatus(request.getStatus());
        existingProduct.setDescription(request.getDescription());
        existingProduct.setCode(request.getCode());

        productDetailService.deleteAllByProductId(request.getId());

        ObjectMapper objectMapper = new ObjectMapper();
        List<ProductDetailRequest> productDetailRequests = objectMapper.readValue(request.getProductDetails(),
                objectMapper.getTypeFactory().constructCollectionType(List.class, ProductDetailRequest.class));

        List<ProductDetail> productDetails = new ArrayList<>();
        productDetailRequests.forEach(productDetailItem -> {
            ProductDetail productDetail = ConvertUtils.convert(productDetailItem, ProductDetail.class);
            productDetail.setProduct(existingProduct);
            productDetails.add(productDetail);
        });
        if (existingProduct.getDescription() == null) {
            existingProduct.setDescription("");
        }
        existingProduct.setProductDetails(productDetails);

        productRepository.save(existingProduct);
        return existingProduct.getId();
    }

    private Product getExistProduct(Long id) {
        return productRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.PRODUCT_NOT_FOUND)
        );
    }

    public void deleteProduct(Long id) {
        Product existingProduct = getExistProduct(id);
        try {
            productRepository.delete(existingProduct);
        } catch (Exception ex) {
            throw new AppException(ErrorCode.PRODUCT_IN_USE);
        }
    }

    public SearchResponse<UpdateProductRequest> searchProduct(SearchProductRequest request) {
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

    public List<UpdateProductRequest> getProducts() {
        return productRepository.findAll().stream()
                .map(product -> ConvertUtils.convert(product, UpdateProductRequest.class))
                .toList();
    }

    public List<UpdateProductRequest> searchProducts(String keyword) {
        List<Product> services = productRepository.searchProductsByKeyword(keyword);
        return ConvertUtils.convertList(services, UpdateProductRequest.class);
    }

    public ProductResponse findById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isEmpty()) {
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        return ConvertUtils.convert(product.get(), ProductResponse.class);
    }
}
