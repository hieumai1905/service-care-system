package com.example.identityservice.service;

import com.example.identityservice.dto.SizeDTO;
import com.example.identityservice.entity.Size;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
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
public class SizeService {

    SizeRepository sizeRepository;

    public List<SizeDTO> getAllSizes() {
        return ConvertUtils.convertList(sizeRepository.findAll(), SizeDTO.class);
    }

    public Size getSizeById(Long id) {
        return sizeRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.RECORD_NOT_FOUND));
    }

    public SizeDTO createSize(SizeDTO request) {
        request.setId(null);
        Size existByName = sizeRepository.findByIdAndName(null, request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        Size size = ConvertUtils.convert(request, Size.class);
        sizeRepository.save(size);
        return ConvertUtils.convert(size, SizeDTO.class);
    }

    public SizeDTO updateSize(SizeDTO request) {
        if(request.getId() == null){
            throw new AppException(ErrorCode.ID_IS_REQUIRED);
        }
        Size size = getSizeById(request.getId());
        Size existByName = sizeRepository.findByIdAndName(request.getId(), request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        size.setName(request.getName());
        sizeRepository.save(size);
        return ConvertUtils.convert(size, SizeDTO.class);
    }

    public void deleteSize(Long id) {
        Size size = getSizeById(id);
        sizeRepository.deleteById(id);
    }
}
