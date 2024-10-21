package com.example.identityservice.utils;

import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@Slf4j
public class ConvertUtils {

    private ConvertUtils() {
    }

    public static <T> T convert(Object source, Class<T> dstClass) {
        if (source == null)
            return null;
        ModelMapper modelMapper = new ModelMapper();
        modelMapper.getConfiguration().setAmbiguityIgnored(true);
        return modelMapper.map(source, dstClass);
    }

    public static <T> List<T> convertList(List<?> sourceList, Class<T> dstClass) {
        if (sourceList == null) {
            return null;
        }

        List<T> outList = new ArrayList<>();
        for (Object object : sourceList) {
            outList.add(convert(object, dstClass));
        }

        return outList;
    }

    public static Long parseIdFromKeyword(String keyword) {
        if (StringUtils.isEmpty(keyword)) {
            return null;
        }
        try {
            return Long.parseLong(keyword);
        } catch (NumberFormatException ex) {
            log.debug("Keyword '{}' is not a valid Long ID", keyword);
            return null;
        }
    }
}
