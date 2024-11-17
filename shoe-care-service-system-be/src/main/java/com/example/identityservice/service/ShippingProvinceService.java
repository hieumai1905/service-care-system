package com.example.identityservice.service;

import com.example.identityservice.dto.ShippingProvinceDTO;
import com.example.identityservice.entity.ShippingProvince;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.ShippingProvinceRepository;
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
public class ShippingProvinceService {

    ShippingProvinceRepository shipProvinceRepository;

    public List<ShippingProvinceDTO> getAllShippingProvinces() {
        return ConvertUtils.convertList(shipProvinceRepository.findAll(), ShippingProvinceDTO.class);
    }

    public ShippingProvince getShippingProvinceById(Long id) {
        return shipProvinceRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.SHIPPING_PROVINCE_NOT_FOUND));
    }

    public ShippingProvinceDTO createShippingProvince(ShippingProvinceDTO request) {
        request.setId(null);
        ShippingProvince existByName = shipProvinceRepository.findByIdAndName(null, request.getProvince());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        ShippingProvince shippingProvince = ConvertUtils.convert(request, ShippingProvince.class);
        shipProvinceRepository.save(shippingProvince);
        return ConvertUtils.convert(shippingProvince, ShippingProvinceDTO.class);
    }

    public ShippingProvinceDTO updateShippingProvince(ShippingProvinceDTO request) {
        if(request.getId() == null){
            throw new AppException(ErrorCode.ID_IS_REQUIRED);
        }
        ShippingProvince shippingProvince = getShippingProvinceById(request.getId());
        ShippingProvince existByName = shipProvinceRepository.findByIdAndName(request.getId(), request.getProvince());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        shippingProvince.setProvince(request.getProvince());
        shippingProvince.setFee(request.getFee());
        shipProvinceRepository.save(shippingProvince);
        return ConvertUtils.convert(shippingProvince, ShippingProvinceDTO.class);
    }

    public void deleteShippingProvince(Long id) {
        ShippingProvince shippingProvince = getShippingProvinceById(id);
        shipProvinceRepository.deleteById(id);
    }
}
