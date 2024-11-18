package com.example.identityservice.service;

import com.example.identityservice.dto.request.CreateProductRequest;
import com.example.identityservice.dto.request.SearchProductRequest;
import com.example.identityservice.dto.request.UpdateProductRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.Color;
import com.example.identityservice.entity.Product;
import com.example.identityservice.entity.ProductCategory;
import com.example.identityservice.entity.Size;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.ColorRepository;
import com.example.identityservice.repository.ProductCategoryRepository;
import com.example.identityservice.repository.ProductRepository;
import com.example.identityservice.repository.SizeRepository;
import com.example.identityservice.utils.ConvertUtils;
import com.example.identityservice.utils.PaginationUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class ProductService {
    final ProductRepository productRepository;
    final ProductCategoryRepository productCategoryRepository;
    final SizeRepository sizeRepository;
    final ColorRepository colorRepository;

    @Value("${app.upload-dir}")
    String uploadDir;

    public Long createProduct(CreateProductRequest request, MultipartFile file){
//        request.validateInput();
        getExistProductCategory(request.getProductCategoryId());
        getExistColor(request.getColorId());
        getExistSize(request.getSizeId());
        String filePath = "";
        if(file != null)
            filePath = saveFile(file);

        Product existByName = productRepository.findByName(request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        Product existByCode = productRepository.findByCode(request.getCode());
        if(existByCode != null){
            throw new AppException(ErrorCode.CODE_ALREADY_EXIST);
        }

        Product product = ConvertUtils.convert(request, Product.class);
        product.setId(null);
        product.setImage(new File(filePath).getName());
        productRepository.save(product);
        return product.getId();
    }

    private String saveFile(MultipartFile file) {
        File destinationFile = new File(uploadDir, file.getOriginalFilename());

        try {
            file.transferTo(destinationFile);
            return destinationFile.getAbsolutePath();
        } catch (IOException e) {
            throw new AppException(ErrorCode.FAIL_TO_UPLOAD_FILE);
        }
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

    public Long updateProduct(UpdateProductRequest request, MultipartFile file){
//        request.validateInput();
        Product existingProduct = getExistProduct(request.getId());
        ProductCategory productCategory = getExistProductCategory(request.getProductCategoryId());
        Color color = getExistColor(request.getColorId());
        Size size = getExistSize(request.getSizeId());

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
        existingProduct.setSize(size);
        existingProduct.setColor(color);
        existingProduct.setName(request.getName());
        existingProduct.setIsActive(request.getIsActive());
        existingProduct.setQuantity(request.getQuantity());
        existingProduct.setInputPrice(request.getInputPrice());
        existingProduct.setSellPrice(request.getSellPrice());
        existingProduct.setDescription(request.getDescription());
        existingProduct.setCode(request.getCode());

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

    public List<UpdateProductRequest> getProducts() {
        return productRepository.findAll().stream()
                .map(product -> ConvertUtils.convert(product, UpdateProductRequest.class))
                .toList();
    }

    public List<UpdateProductRequest> searchProducts(String keyword) {
        List<Product> services = productRepository.searchProductsByKeyword(keyword);
        return ConvertUtils.convertList(services, UpdateProductRequest.class);
    }

    public List<UpdateProductRequest> findById(Long id) {
        return productRepository.findById(id).stream()
                .map(product -> ConvertUtils.convert(product, UpdateProductRequest.class))
                .toList();
    }
}
