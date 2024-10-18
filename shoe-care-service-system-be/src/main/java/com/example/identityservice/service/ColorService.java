package com.example.identityservice.service;

import com.example.identityservice.dto.ColorDTO;
import com.example.identityservice.entity.Color;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.ColorRepository;
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
public class ColorService {

    ColorRepository colorRepository;

    public List<ColorDTO> getAllColors() {
        return ConvertUtils.convertList(colorRepository.findAll(), ColorDTO.class);
    }

    public Color getColorById(Long id) {
        return colorRepository.findById(id).orElseThrow(() -> new AppException(ErrorCode.RECORD_NOT_FOUND));
    }

    public ColorDTO createColor(ColorDTO request) {
        request.setId(null);
        Color existByName = colorRepository.findByIdAndName(null, request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        Color color = ConvertUtils.convert(request, Color.class);
        colorRepository.save(color);
        return ConvertUtils.convert(color, ColorDTO.class);
    }

    public ColorDTO updateColor(ColorDTO request) {
        if(request.getId() == null){
            throw new AppException(ErrorCode.ID_IS_REQUIRED);
        }
        Color color = getColorById(request.getId());
        Color existByName = colorRepository.findByIdAndName(request.getId(), request.getName());
        if(existByName != null){
            throw new AppException(ErrorCode.NAME_ALREADY_EXIST);
        }
        color.setName(request.getName());
        color.setColorHex(request.getColorHex());
        colorRepository.save(color);
        return ConvertUtils.convert(color, ColorDTO.class);
    }

    public void deleteColor(Long id) {
        Color color = getColorById(id);
        colorRepository.deleteById(id);
    }
}
