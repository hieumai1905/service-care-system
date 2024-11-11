package com.example.identityservice.service;

import com.example.identityservice.dto.ScheduleDetailDTO;
import com.example.identityservice.dto.request.CreateScheduleRequest;
import com.example.identityservice.dto.request.SearchScheduleRequest;
import com.example.identityservice.dto.request.UpdateOrderRequest;
import com.example.identityservice.dto.request.UpdateScheduleRequest;
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

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ScheduleService {
    ScheduleRepository scheduleRepository;
    ScheduleDetailRepository scheduleDetailRepository;
    ColorRepository colorRepository;
    SizeRepository sizeRepository;
    BranchRepository branchRepository;
    ShoeServiceRepository shoeServiceRepository;
    MaterialRepository materialRepository;

    public UpdateScheduleRequest createSchedule(CreateScheduleRequest request){
        Schedule schedule = ConvertUtils.convert(request, Schedule.class);
        schedule.setId(null);
        addScheduleDetail(schedule, request);

        scheduleRepository.save(schedule);
        return ConvertUtils.convert(schedule, UpdateScheduleRequest.class);
    }

    public UpdateScheduleRequest updateSchedule(UpdateScheduleRequest request){
        Schedule schedule = getExistSchedule(request.getId());
        updateScheduleDetail(schedule, request);

        scheduleRepository.save(schedule);
        return ConvertUtils.convert(schedule, UpdateScheduleRequest.class);
    }

    public SearchResponse<UpdateScheduleRequest> searchSchedule(SearchScheduleRequest request){
        request.validateInput();

        Page<Schedule> schedules = scheduleRepository.search(
                request.getKeyWord(),
                request.getStatus(),
                request.getScheduleAt(),
                PaginationUtils.getPageable(request.getPageIndex(), request.getPageSize())
        );

        SearchResponse<UpdateScheduleRequest> response = new SearchResponse<>();
        response.setPageIndex(request.getPageIndex());
        response.setPageSize(request.getPageSize());
        response.setTotalElements(schedules.getTotalElements());
        response.setData(ConvertUtils.convertList(schedules.getContent(), UpdateScheduleRequest.class));

        return response;
    }

    void updateScheduleDetail(Schedule schedule, UpdateScheduleRequest request) {
        List<ScheduleDetail> oldScheduleDetails = schedule.getScheduleDetails();
        List<ScheduleDetail> newScheduleDetails = new ArrayList<>();
        List<Long> deleteIds = new ArrayList<>();
        List<Long> sheduleDetailIds = request.getScheduleDetails().stream()
                .map(ScheduleDetailDTO::getId)
                .filter(Objects::nonNull)
                .toList();

        for (ScheduleDetailDTO dto : request.getScheduleDetails()) {
            ScheduleDetail scheduleDetail;
            if(dto.getId() != null){
                scheduleDetail = oldScheduleDetails.stream().filter(item -> item.getId().equals(dto.getId()))
                        .findFirst().orElseThrow(() -> new AppException(ErrorCode.SCHEDULE_DETAIL_NOT_FOUND));
                if(scheduleDetail.getColor() != null && !dto.getColorId().equals(scheduleDetail.getColor().getId())){
                    scheduleDetail.setColor(getExistColor(dto.getColorId()));
                }
                if(scheduleDetail.get_size() != null && !dto.get_sizeId().equals(scheduleDetail.get_size().getId())){
                    scheduleDetail.set_size(getExistSize(dto.get_sizeId()));
                }
                if(scheduleDetail.getMaterial() != null && !dto.get_sizeId().equals(scheduleDetail.getMaterial().getId())){
                    scheduleDetail.setMaterial(getExistMaterial(dto.getMaterialId()));
                }
                if(scheduleDetail.getShoeService() != null && !dto.get_sizeId().equals(scheduleDetail.getShoeService().getId())){
                    scheduleDetail.setShoeService(getExistShoeService(dto.getShoeServiceId()));
                }
            }else{
                scheduleDetail = new ScheduleDetail();
                scheduleDetail.setSchedule(schedule);
                scheduleDetail.setColor(getExistColor(dto.getColorId()));
                scheduleDetail.set_size(getExistSize(dto.get_sizeId()));
                scheduleDetail.setMaterial(getExistMaterial(dto.getMaterialId()));
                scheduleDetail.setShoeService(getExistShoeService(dto.getShoeServiceId()));
            }
            scheduleDetail.setDescription(dto.getDescription());
            newScheduleDetails.add(scheduleDetail);
        }

        for (ScheduleDetail scheduleDetail : oldScheduleDetails) {
            if(!sheduleDetailIds.contains(scheduleDetail.getId())){
                deleteIds.add(scheduleDetail.getId());
            }
        }
        scheduleDetailRepository.deleteByIds(deleteIds);
        schedule.setScheduleDetails(newScheduleDetails);
    }

    private Schedule getExistSchedule(Long id) {
        return scheduleRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.SCHEDULE_NOT_FOUND)
        );
    }

    void addScheduleDetail(Schedule schedule, CreateScheduleRequest request) {
        List<ScheduleDetail> scheduleDetails = new ArrayList<>();
        for (ScheduleDetailDTO dto : request.getScheduleDetails()) {
            ScheduleDetail scheduleDetail = new ScheduleDetail();
            scheduleDetail.setSchedule(schedule);
            scheduleDetail.setDescription(dto.getDescription());
            scheduleDetail.setColor(getExistColor(dto.getColorId()));
            scheduleDetail.set_size(getExistSize(dto.get_sizeId()));
            scheduleDetail.setMaterial(getExistMaterial(dto.getMaterialId()));
            scheduleDetail.setShoeService(getExistShoeService(dto.getShoeServiceId()));
            scheduleDetails.add(scheduleDetail);
        }
        schedule.setScheduleDetails(scheduleDetails);
    }

    private ShoeService getExistShoeService(Long shoeServiceId) {
        return shoeServiceRepository.findById(shoeServiceId).orElseThrow(
                () -> new AppException(ErrorCode.SERVICE_NOT_FOUND)
        );
    }

    private Material getExistMaterial(Long materialId) {
        return materialRepository.findById(materialId).orElseThrow(
                () -> new AppException(ErrorCode.MATERIAL_NOT_FOUND)
        );
    }

    private Color getExistColor(Long colorId) {
        return colorRepository.findById(colorId).orElseThrow(
                () -> new AppException(ErrorCode.COLOR_NOT_FOUND)
        );
    }
    private Size getExistSize(Long sizeId) {
        return sizeRepository.findById(sizeId).orElseThrow(
                () -> new AppException(ErrorCode.SIZE_NOT_FOUND)
        );
    }

    public UpdateScheduleRequest getById(Long id) {
        Schedule schedule = getExistSchedule(id);
        return ConvertUtils.convert(schedule, UpdateScheduleRequest.class);
    }
}
