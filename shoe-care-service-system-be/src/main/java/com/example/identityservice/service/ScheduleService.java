package com.example.identityservice.service;

import com.example.identityservice.dto.request.ScheduleCreationRequest;
import com.example.identityservice.dto.request.UpdateClientRequest;
import com.example.identityservice.dto.response.ScheduleResponseDTO;
import com.example.identityservice.entity.*;
import com.example.identityservice.enums.ScheduleStatus;
import com.example.identityservice.mails.EmailSenderService;
import com.example.identityservice.repository.*;
import com.example.identityservice.utils.ConvertUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.NumberFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class ScheduleService {
    ScheduleRepository scheduleRepository;
    ScheduleDetailRepository scheduleDetailRepository;
    ClientRepository clientRepository;
    UserRepository userRepository;
    MaterialRepository materialRepository;
    BrandRepository brandRepository;
    ColorRepository colorRepository;
    SizeRepository sizeRepository;
    ShoeServiceRepository shoeServiceRepository;
    EmailSenderService emailSenderService;

    @Transactional
    public ScheduleResponseDTO createSchedule(ScheduleCreationRequest request) {
        Client client = clientRepository.findById(request.getClientId()).orElseThrow(() -> new RuntimeException("Client not found"));
        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));
        Material material = materialRepository.findById(request.getMaterialId()).orElseThrow(() -> new RuntimeException("Material not found"));
        Brand brand = brandRepository.findById(request.getBrandId()).orElseThrow(() -> new RuntimeException("Brand not found"));
        Color color = colorRepository.findById(request.getColorId()).orElseThrow(() -> new RuntimeException("Color not found"));
        Size size = sizeRepository.findById(request.getSizeId()).orElseThrow(() -> new RuntimeException("Size not found"));

        String serviceName = "";

        if (request.getShoeServiceIds() != null) {
            for (Integer serviceId : request.getShoeServiceIds()) {
                var item = shoeServiceRepository.findById(serviceId.longValue()).orElseThrow(() -> new RuntimeException("Shoe Service not found: " + serviceId));
                serviceName += item.getName() + ", ";
            }
        }

        if (serviceName.endsWith(", ")) {
            serviceName = serviceName.substring(0, serviceName.length() - 2);
        }

        Schedule schedule = Schedule.builder().client(client).user(user).material(material).brand(brand).color(color).paymentType(request.getPaymentType()).discount(request.getDiscount()).size(size).paid(request.getPaid()).cost(request.getCost()).note(request.getNote()).returnAt(request.getReturnAt()).build();

        schedule = scheduleRepository.save(schedule);

        String htmlContent = "<html>" + "<head>" + "<style>" + "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; }" + "h2 { color: #4CAF50; }" + ".email-container { background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }" + ".table { width: 100%; border-collapse: collapse; margin-top: 20px; }" + ".table th, .table td { padding: 10px; text-align: left; border: 1px solid #ddd; }" + ".table th { background-color: #f2f2f2; color: #333; }" + ".footer { margin-top: 30px; text-align: center; color: #777; font-size: 12px; }" + ".highlight { font-weight: bold; color: #333; }" + "</style>" + "</head>" + "<body>" + "<div class='email-container'>" + "<h2>Đơn Hàng Sửa Giày Của Bạn Đã Được Xác Nhận</h2>" + "<p>Chào <span class='highlight'>" + client.getName() + "</span>,</p>" + "<p>Chúng tôi rất vui khi thông báo rằng lịch sửa giày của bạn đã được xác nhận thành công. Dưới đây là thông tin chi tiết về lịch sửa giày của bạn:</p>" +

                "<table class='table'>" + "<tr><th>Thông Tin</th><th>Chi Tiết</th></tr>" + "<tr><td><strong>Họ và Tên Khách Hàng</strong></td><td>" + client.getName() + "</td></tr>" + "<tr><td><strong>Thương Hiệu</strong></td><td>" + brand.getName() + "</td></tr>" + "<tr><td><strong>Chất Liệu</strong></td><td>" + material.getName() + "</td></tr>" + "<tr><td><strong>Màu Sắc</strong></td><td>" + color.getName() + "</td></tr>" + "<tr><td><strong>Size</strong></td><td>" + size.getName() + "</td></tr>" + "<tr><td><strong>Các Dịch Vụ</strong></td><td>" + serviceName + "</td></tr>" + "<tr><td><strong>Giảm Giá</strong></td><td>" + formatMoney(request.getDiscount()) + "</td></tr>" + "<tr><td><strong>Tổng Chi Phí</strong></td><td>" + formatMoney(request.getCost()) + "</td></tr>" + "</table>" +

                "<p>Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi. Nếu bạn có bất kỳ câu hỏi nào, đừng ngần ngại liên hệ với chúng tôi.</p>" +

                "<div class='footer'>" + "<p>Cảm ơn bạn đã sử dụng dịch vụ sửa giày của chúng tôi.</p>" + "<p>Địa chỉ: [Số 123, Đường ABC, Quận X, TP.HN]</p>" + "</div>" + "</div>" + "</body>" + "</html>";

        emailSenderService.sendHtmlMail(client.getEmail(), "Xác Nhận Đơn Hàng Sửa Giày", htmlContent);

        ScheduleDetail scheduleDetail = ScheduleDetail.builder().schedule(schedule).build();

        if (request.getShoeServiceIds() != null && !request.getShoeServiceIds().isEmpty()) {
            scheduleDetail.setShoeService(request.getShoeServiceIds());
        }

        scheduleDetailRepository.save(scheduleDetail);

        schedule.setScheduleDetail(scheduleDetail);

        return ConvertUtils.convert(schedule, ScheduleResponseDTO.class);
    }

    private String formatMoney(double amount) {
        NumberFormat numberFormat = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
        return numberFormat.format(amount);
    }

    public List<ScheduleResponseDTO> getAll() {
        List<Schedule> schedules = scheduleRepository.findAll();
        schedules.sort((s1, s2) -> s2.getCreatedAt().compareTo(s1.getCreatedAt()));
        return ConvertUtils.convertList(schedules, ScheduleResponseDTO.class);
    }

    public ScheduleResponseDTO getById(Long id) {
        Schedule schedule = scheduleRepository.findById(id).orElseThrow(() -> new RuntimeException("Schedule not found"));
        return ConvertUtils.convert(schedule, ScheduleResponseDTO.class);
    }

    @Transactional
    public ScheduleResponseDTO updateStatus(Long id, String status) {
        Schedule schedule = scheduleRepository.findById(id).orElseThrow(() -> new RuntimeException("Schedule not found"));

        if (status.equals("RETURNED")) {
            schedule.setReturnAt(new Date());
        }

        schedule.setStatus(ScheduleStatus.valueOf(status));
        schedule = scheduleRepository.save(schedule);

        sendStatusUpdateEmail(schedule);

        return ConvertUtils.convert(schedule, ScheduleResponseDTO.class);
    }

    private void sendStatusUpdateEmail(Schedule schedule) {
        Client client = schedule.getClient();
        String statusMessage = getStatusMessage(schedule.getStatus());

        StringBuilder htmlContent = new StringBuilder("<html>").append("<head>").append("<style>").append("body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; }").append("h2 { color: #4CAF50; }").append(".email-container { background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }").append(".table { width: 100%; border-collapse: collapse; margin-top: 20px; }").append(".table th, .table td { padding: 10px; text-align: left; border: 1px solid #ddd; }").append(".table th { background-color: #f2f2f2; color: #333; }").append(".footer { margin-top: 30px; text-align: center; color: #777; font-size: 12px; }").append(".highlight { font-weight: bold; color: #333; }").append("</style>").append("</head>").append("<body>").append("<div class='email-container'>").append("<h2>Cập Nhật Trạng Thái Đơn Hàng Sửa Giày</h2>").append("<p>Chào <span class='highlight'>" + client.getName() + "</span>,</p>").append("<p>Chúng tôi muốn thông báo rằng trạng thái đơn hàng sửa giày của bạn đã được cập nhật. Dưới đây là thông tin mới nhất:</p>").append("<table class='table'>").append("<tr><th>Thông Tin</th><th>Chi Tiết</th></tr>").append("<tr><td><strong>Họ và Tên Khách Hàng</strong></td><td>" + client.getName() + "</td></tr>").append("<tr><td><strong>Trạng Thái</strong></td><td>" + statusMessage + "</td></tr>").append("<tr><td><strong>Ngày Tạo</strong></td><td>" + schedule.getCreatedAt() + "</td></tr>");

        if (schedule.getStatus() == ScheduleStatus.RETURNED) {
            htmlContent.append("<tr><td><strong>Ngày Trả Lại</strong></td><td>" + schedule.getReturnAt() + "</td></tr>");
        }

        htmlContent.append("</table>");

        if (schedule.getStatus() == ScheduleStatus.COMPLETED) {
            htmlContent.append("<p><strong>Lưu ý:</strong> Đơn hàng của bạn đã được hoàn thành. Vui lòng đến cửa hàng của chúng tôi để nhận lại sản phẩm của bạn.</p>");
        }

        htmlContent.append("<p>Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>").append("<div class='footer'>").append("<p>Cảm ơn bạn đã tin tưởng dịch vụ của chúng tôi.</p>").append("<p>Địa chỉ: [Số 123, Đường ABC, Quận X, TP.HN]</p>").append("</div>").append("</div>").append("</body>").append("</html>");

        emailSenderService.sendHtmlMail(client.getEmail(), "Cập Nhật Trạng Thái Đơn Hàng Sửa Giày", htmlContent.toString());
    }

    private String getStatusMessage(ScheduleStatus status) {
        switch (status) {
            case CREATED:
                return "Đơn hàng đã được tạo";
            case IN_PROGRESS:
                return "Đơn hàng đang được xử lý";
            case COMPLETED:
                return "Đơn hàng đã hoàn thành";
            case RETURNED:
                return "Đơn hàng đã được trả lại";
            default:
                return "Trạng thái không xác định";
        }
    }

    public void delete(Long id) throws Exception {
        Schedule schedule = scheduleRepository.findById(id).orElseThrow(() -> new RuntimeException("Schedule not found"));
//        if(schedule.getStatus() != ScheduleStatus.CREATED) {
//            throw new Exception("Không thể xoá đơn hàng đã thực hiện");
//        }
        scheduleRepository.delete(schedule);
    }

    public List<ScheduleResponseDTO> searchSchedules(String keyword) {
        Long id = ConvertUtils.parseIdFromKeyword(keyword);
        List<Schedule> schedules = scheduleRepository.searchSchedulesByKeyword(keyword, id);
        return ConvertUtils.convertList(schedules, ScheduleResponseDTO.class);
    }
}
