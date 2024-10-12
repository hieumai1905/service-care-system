package com.example.identityservice.service;

import com.example.identityservice.dto.OrderDetailDTO;
import com.example.identityservice.dto.request.CreateOrderRequest;
import com.example.identityservice.dto.request.SearchOrderRequest;
import com.example.identityservice.dto.request.UpdateOrderRequest;
import com.example.identityservice.dto.request.UpdateProductRequest;
import com.example.identityservice.dto.response.SearchResponse;
import com.example.identityservice.entity.Order;
import com.example.identityservice.entity.OrderDetail;
import com.example.identityservice.entity.Product;
import com.example.identityservice.exception.AppException;
import com.example.identityservice.exception.ErrorCode;
import com.example.identityservice.repository.OrderDetailRepository;
import com.example.identityservice.repository.OrderRepository;
import com.example.identityservice.repository.ProductRepository;
import com.example.identityservice.utils.ConvertUtils;
import com.example.identityservice.utils.PaginationUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class OrderService {
    OrderRepository orderRepository;
    OrderDetailRepository orderDetailRepository;
    ProductRepository productRepository;

    @Transactional
    public UpdateOrderRequest createOrder(CreateOrderRequest request){
        Order order = ConvertUtils.convert(request, Order.class);
        order.setId(null);
        addOrderDetails(order, request.getOrderDetails());
        orderRepository.save(order);
        return ConvertUtils.convert(order, UpdateOrderRequest.class);
    }

    @Transactional
    public UpdateOrderRequest updateOrder(UpdateOrderRequest request){
        Order order = getExistingOrder(request.getId());
        order.setNote(request.getNote());
        order.setDiscount(request.getDiscount());
        order.setTotal(request.getTotal());
        order.setPaymentType(request.getPaymentType());

        updateOrderDetails(order, request.getOrderDetails());
        orderRepository.save(order);
        return ConvertUtils.convert(order, UpdateOrderRequest.class);
    }

    public SearchResponse<UpdateOrderRequest> searchOrder(SearchOrderRequest request){
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

    void updateOrderDetails(Order order, List<OrderDetailDTO> orderDetailDTOs) {
        List<OrderDetail> oldOrderDetails = order.getOrderDetails();
        List<OrderDetail> newOrderDetails = new ArrayList<>();
        List<Product> products = new ArrayList<>();
        List<Long> productIds = orderDetailDTOs.stream().map(OrderDetailDTO::getProductId).toList();
        List<Long> deleteIds = new ArrayList<>();

        for (OrderDetailDTO dto : orderDetailDTOs) {
            OrderDetail od;
            Product product;
            if (dto.getId() != null) { //update
                od = oldOrderDetails.stream().filter(item -> item.getId().equals(dto.getId()))
                        .findFirst().orElseThrow(() -> new AppException(ErrorCode.RECORD_NOT_FOUND));
                product = od.getProduct();
                int quantity = product.getQuantity() + od.getQuantity() - dto.getQuantity();
                if(quantity < 0)
                    throw new AppException(ErrorCode.QUANTITY_IS_NOT_ENOUGH);
                product.setQuantity(quantity);
                products.add(product);

                od.setQuantity(dto.getQuantity());
                newOrderDetails.add(od);
            }else { //add
                od = new OrderDetail();
                product = getExistProduct(dto.getProductId());
                od.setProduct(product);
                od.setOrder(order);
                od.setPrice(product.getSellPrice());
                if(product.getQuantity() < dto.getQuantity()){
                    throw new AppException(ErrorCode.QUANTITY_IS_NOT_ENOUGH);
                }else{
                    od.setQuantity(dto.getQuantity());
                    product.setQuantity(product.getQuantity() - dto.getQuantity());
                    products.add(product);
                }
                newOrderDetails.add(od);
            }
        }

        for (OrderDetail od : oldOrderDetails) {
            if(!productIds.contains(od.getProduct().getId())){
                deleteIds.add(od.getId());
                od.getProduct().setQuantity(od.getProduct().getQuantity() + od.getQuantity());
                products.add(od.getProduct());
            }
        }

        productRepository.saveAll(products);
        orderDetailRepository.deleteByIds(deleteIds);
        order.setOrderDetails(newOrderDetails);
    }

    Order getExistingOrder(Long id) {
        return orderRepository.findById(id).orElseThrow(
                () -> new AppException(ErrorCode.RECORD_NOT_FOUND)
        );
    }

    void addOrderDetails(Order order, List<OrderDetailDTO> orderDetailDTOs) {
        List<OrderDetail> orderDetails = new ArrayList<>();
        List<Product> products = new ArrayList<>();

        for (OrderDetailDTO dto : orderDetailDTOs) {
            OrderDetail orderDetail = new OrderDetail();
            Product product = getExistProduct(dto.getProductId());
            orderDetail.setProduct(product);
            orderDetail.setOrder(order);
            orderDetail.setPrice(product.getSellPrice());
            if(product.getQuantity() < dto.getQuantity()){
                throw new AppException(ErrorCode.QUANTITY_IS_NOT_ENOUGH);
            }else{
                orderDetail.setQuantity(dto.getQuantity());
                product.setQuantity(product.getQuantity() - dto.getQuantity());
                products.add(product);
            }
            orderDetails.add(orderDetail);
        }
        order.setOrderDetails(orderDetails);
        productRepository.saveAll(products);
    }

    private Product getExistProduct(Long productId) {
        return productRepository.findById(productId).orElseThrow(
                () -> new AppException(ErrorCode.RECORD_NOT_FOUND)
        );
    }
}
