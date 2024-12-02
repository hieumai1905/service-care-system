package com.example.identityservice.service;

import com.example.identityservice.dto.request.CreateOrderRequest;
import com.example.identityservice.dto.request.SearchOrderRequest;
import com.example.identityservice.dto.request.UpdateOrderRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.CouponItem;
import com.example.identityservice.entity.Order;
import com.example.identityservice.entity.OrderDetail;
import com.example.identityservice.entity.ProductDetail;
import com.example.identityservice.enums.OrderStatus;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.ClientRepository;
import com.example.identityservice.repository.CouponItemRepository;
import com.example.identityservice.repository.OrderRepository;
import com.example.identityservice.repository.ProductDetailRepository;
import com.example.identityservice.utils.ConvertUtils;
import com.example.identityservice.utils.PaginationUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    OrderRepository orderRepository;
    ProductDetailRepository productDetailRepository;
    ClientRepository clientRepository;
    CouponItemRepository couponItemRepository;

    @Transactional
    public Long createOrder(CreateOrderRequest request) {
        if (!clientRepository.existsById(request.getClientId())) {
            throw new AppException(ErrorCode.CLIENT_NOT_FOUND);
        }

        Order order = ConvertUtils.convert(request, Order.class);
        order.setStatus(OrderStatus.COMPLETED);
        order.setId(null);

        List<OrderDetail> orderDetails = ConvertUtils.convertList(request.getOrderDetails(), OrderDetail.class);
        orderDetails.forEach(orderDetail -> orderDetail.setOrder(order));

        order.setOrderDetails(orderDetails);
        updateProductDetail(orderDetails);
        if (request.getCouponItemId() != null) {
            updateCouponItem(order.getCouponItem());
        }

        orderRepository.save(order);

        return order.getId();
    }

    void updateProductDetail(List<OrderDetail> orderDetails) {
        orderDetails.forEach(item -> {
            ProductDetail productDetail = productDetailRepository.findById(item.getProductDetail().getId()).orElseThrow(
                    () -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND)
            );
            long newQuantity = productDetail.getQuantity() - item.getQuantity();
            if (newQuantity < 0) {
                throw new AppException(ErrorCode.PRODUCT_DETAIL_NOT_ENOUGH);
            }
            productDetail.setQuantity(newQuantity);
            productDetailRepository.save(productDetail);
        });
    }

    void updateCouponItem(CouponItem couponItem) {
        couponItem = couponItemRepository.findById(couponItem.getId()).orElseThrow(
                () -> new AppException(ErrorCode.COUPON_ITEM_NOT_FOUND)
        );
        couponItem.setActive(false);
        couponItemRepository.save(couponItem);
    }

    @Transactional
    public UpdateOrderRequest updateOrder(UpdateOrderRequest request) {
        Order order = getExistingOrder(request.getId());
        order.setNote(request.getNote());
        order.setDiscount(request.getDiscount());
        order.setTotal(request.getTotal());
        order.setPaymentType(request.getPaymentType());
        order.setStatus(request.getStatus());

        orderRepository.save(order);
        return ConvertUtils.convert(order, UpdateOrderRequest.class);
    }

    public SearchResponse<UpdateOrderRequest> searchOrder(SearchOrderRequest request) {
        request.validateInput();

        Page<Order> orders = orderRepository.search(
                request.getKeyWord(),
                request.getOrderDate(),
                PaginationUtils.getPageable(request.getPageIndex(), request.getPageSize())
        );

        SearchResponse<UpdateOrderRequest> response = new SearchResponse<>();
        response.setPageIndex(request.getPageIndex());
        response.setPageSize(request.getPageSize());
        response.setTotalElements(orders.getTotalElements());
        response.setData(ConvertUtils.convertList(orders.getContent(), UpdateOrderRequest.class));

        return response;
    }

    Order getExistingOrder(Long id) {
        return orderRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.ORDER_NOT_FOUND)
        );
    }

    public UpdateOrderRequest getById(Long id) {
        Order order = getExistingOrder(id);
        return ConvertUtils.convert(order, UpdateOrderRequest.class);
    }

    public List<UpdateOrderRequest> getOrders() {
        List<Order> orders = orderRepository.findAll();
        orders.sort(Comparator.comparing(Order::getCreatedAt).reversed());
        return ConvertUtils.convertList(orders, UpdateOrderRequest.class);
    }

    public List<UpdateOrderRequest> searchOrders(String keyWord) {
        List<Order> orders = orderRepository.searchOrderByKeyword(keyWord);
        orders.sort(Comparator.comparing(Order::getCreatedAt));
        return ConvertUtils.convertList(orders, UpdateOrderRequest.class);
    }

    @Transactional
    public Long cancelOrder(Long orderId) {
        Order order = getExistingOrder(orderId);

        revertProductDetail(order.getOrderDetails());

        // Có thể không cần phải reactivate coupon item
        if (order.getCouponItem() != null) {
            reactivateCouponItem(order.getCouponItem());
        }

        order.setStatus(OrderStatus.CANCELED);
        orderRepository.save(order);

        return order.getId();
    }

    void revertProductDetail(List<OrderDetail> orderDetails) {
        orderDetails.forEach(item -> {
            ProductDetail productDetail = productDetailRepository.findById(item.getProductDetail().getId()).orElseThrow(
                    () -> new AppException(ErrorCode.PRODUCT_DETAIL_NOT_FOUND)
            );

            long revertedQuantity = productDetail.getQuantity() + item.getQuantity();
            productDetail.setQuantity(revertedQuantity);
            productDetailRepository.save(productDetail);
        });
    }

    void reactivateCouponItem(CouponItem couponItem) {
        couponItem = couponItemRepository.findById(couponItem.getId()).orElseThrow(
                () -> new AppException(ErrorCode.COUPON_ITEM_NOT_FOUND)
        );

        couponItem.setActive(true);
        couponItemRepository.save(couponItem);
    }

    public Long deleteById(Long id) {
        Order order = getExistingOrder(id);
        orderRepository.delete(order);
        return order.getId();
    }

    @Transactional(readOnly = true)
    public double calculateDailyRevenue(Date date) {
        LocalDate localDate = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

        Instant startOfDay = localDate.atStartOfDay(ZoneId.systemDefault()).toInstant();
        Instant endOfDay = localDate.plusDays(1).atStartOfDay(ZoneId.systemDefault()).toInstant();

        List<Order> orders = orderRepository.findAllByCreatedAtBetweenAndStatus(
                Date.from(startOfDay), Date.from(endOfDay), OrderStatus.COMPLETED
        );

        return orders.stream()
                .mapToDouble(order -> order.getTotal() - (order.getDiscount() != null ? order.getDiscount() : 0))
                .sum();
    }

    public double calculateWeeklyRevenue(Date startOfWeek, Date endOfWeek) {
        List<Order> orders = orderRepository.findAllByCreatedAtBetweenAndStatus(
                startOfWeek, endOfWeek, OrderStatus.COMPLETED
        );

        return orders.stream()
                .mapToDouble(order -> order.getTotal() - (order.getDiscount() != null ? order.getDiscount() : 0))
                .sum();
    }

    public double getTotalOrders() {
        return orderRepository.count();
    }

    public double getCompletedOrders() {
        return orderRepository.countByStatus((OrderStatus.COMPLETED));
    }

    public List<UpdateOrderRequest> getLatestOrders() {
        List<Order> orders = orderRepository.findAll();
        orders.sort(Comparator.comparing(Order::getCreatedAt).reversed());
        return ConvertUtils.convertList(orders.subList(0, Math.min(orders.size(), 5)), UpdateOrderRequest.class);
    }

    public List<Map<String, Double>> getLastSevenDaysRevenue() {
        Calendar calendar = Calendar.getInstance();
        Date endDate = calendar.getTime();
        calendar.add(Calendar.DAY_OF_MONTH, -7);
        Date startDate = calendar.getTime();

        List<Object[]> results = orderRepository.getLastSevenDaysRevenue(startDate, endDate);
        return getMaps(results);
    }


    public List<Map<String, Double>> getRevenueByCustomDateRange(Date startDate, Date endDate) {
        List<Object[]> results = orderRepository.getRevenueByDateRange(startDate, endDate);
        return getMaps(results);
    }

    @NotNull
    private List<Map<String, Double>> getMaps(List<Object[]> results) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        List<Map<String, Double>> revenueList = new ArrayList<>();

        for (Object[] result : results) {
            Map<String, Double> revenueMap = new HashMap<>();
            String date = sdf.format((Date) result[0]);
            Double revenue = (Double) result[1];
            revenueMap.put(date, revenue);
            revenueList.add(revenueMap);
        }

        return revenueList;
    }

    public List<UpdateOrderRequest> getOrdersByClientId(Long clientId) {
        List<Order> orders = orderRepository.findAllByClientId(clientId);
         orders.sort(Comparator.comparing(Order::getCreatedAt).reversed());
        return ConvertUtils.convertList(orders, UpdateOrderRequest.class);
    }
}
