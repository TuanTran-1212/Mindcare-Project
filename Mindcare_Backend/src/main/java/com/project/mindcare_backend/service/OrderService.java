package com.project.mindcare_backend.service;

import com.project.mindcare_backend.dto.request.OrderItemRequest;
import com.project.mindcare_backend.dto.request.OrderRequest;
import com.project.mindcare_backend.dto.response.BookResponse;
import com.project.mindcare_backend.dto.response.CourseResponse;
import com.project.mindcare_backend.dto.response.OrderItemResponse;
import com.project.mindcare_backend.dto.response.OrderResponse;
import com.project.mindcare_backend.enums.OrderStatus;
import com.project.mindcare_backend.enums.PaymentMethod;
import com.project.mindcare_backend.enums.ProductType;
import com.project.mindcare_backend.modal.Book;
import com.project.mindcare_backend.modal.Order;
import com.project.mindcare_backend.modal.OrderItem;
import com.project.mindcare_backend.modal.User;
import com.project.mindcare_backend.repository.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    private final BookService bookSer;
    private final CourseService courseSer;
    private final UserRepository userRepo;

    public List<OrderResponse> findAll() {
        List<Order> orders = orderRepository.findAll();

        return orders.stream().map(this::convertToResponse).collect(Collectors.toList());

    }

    public List<OrderResponse> findAllByUserId(Integer userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        System.out.println(">>> Total orders in DB: " + orders.size());
        return orders.stream().map(order -> {
            System.out.println(">>> Converting order: " + order.getId()); // xem convert tới đâu thì dừng
            return convertToResponse(order);
        }).collect(Collectors.toList());
    }

    @Transactional
    public OrderResponse create(OrderRequest orderRequest) {
        Order order = new Order();
        order.setUserId(orderRequest.getUserId());
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setPaymentMethod(PaymentMethod.valueOf(orderRequest.getPaymentMethod()));
        order.setShippingFee(orderRequest.getShippingFee());
        order.setDiscount(orderRequest.getDiscount());
        order.setStatus(OrderStatus.PENDING);

        BigDecimal total = BigDecimal.ZERO;

        for (OrderItemRequest itemsReq : orderRequest.getItems()) {
            //validate
            BigDecimal unitPrice = BigDecimal.ZERO;
            if ("book".equalsIgnoreCase(String.valueOf(itemsReq.getProductType()))) {
                unitPrice = bookSer.getById(itemsReq.getProductId()).getFinalPrice(); // giả sử có method

            } else if ("course".equalsIgnoreCase(String.valueOf(itemsReq.getProductType()))) {
                unitPrice = courseSer.getById(itemsReq.getProductId()).getFinalPrice();

            }

            OrderItem orderItem = new OrderItem();

            orderItem.setProductType(ProductType.valueOf(itemsReq.getProductType()));
            orderItem.setProductId(itemsReq.getProductId());
            orderItem.setQuantity(itemsReq.getQuantity());
            orderItem.setUnitPrice(unitPrice);


            total = total.add(unitPrice.multiply(BigDecimal.valueOf(itemsReq.getQuantity())));
            order.addOrderItem(orderItem);
        }

        //add discount
        total = total.add(orderRequest.getShippingFee());
        total = getFinalPrice(total, orderRequest.getDiscount());
        order.setTotal(total);



        orderRepository.save(order);

        return convertToResponse(order);
    }

    // UPDATE (chỉ cho phép update một số trường, ví dụ shippingAddress, status)
    public OrderResponse updateOrder(Integer id, OrderRequest request) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        // Chỉ cho update nếu order chưa thanh toán hoặc ở trạng thái cho phép
        if (request.getShippingAddress() != null) order.setShippingAddress(request.getShippingAddress());

        if (request.getPaymentMethod() != null)
            order.setPaymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()));

        // Nếu thay đổi status thành PAID, set paidAt
        if ("PAID".equals(request.getOrderStatus()) && order.getPaidAt() == null) {
            order.setPaidAt(LocalDateTime.now());
        } else if ("CANCELLED".equals(request.getOrderStatus()) && order.getPaidAt() == null) {
            order.setPaidAt(LocalDateTime.now());
        }
        order.setStatus(request.getOrderStatus());
        order = orderRepository.save(order);
        return convertToResponse(order);
    }

    public void deleteOrder(Integer id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        // Chỉ cho phép xóa nếu order chưa thanh toán hoặc status = PENDING/CANCELLED
        orderRepository.delete(order);
    }

    //helper
    private OrderResponse convertToResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getOrderItems().stream().map(item -> {
            BigDecimal subtotal = item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity()));

            String productName = null;
            String productImg = null;
            if ("book".equalsIgnoreCase(String.valueOf(item.getProductType()))) {
                BookResponse book = bookSer.getById(item.getProductId());
                productName = book.getTitle();
                productImg = book.getImgUrl(); // giả sử có method
            } else if ("course".equalsIgnoreCase(String.valueOf(item.getProductType()))) {
                CourseResponse course = courseSer.getById(item.getProductId());
                productName = course.getTitle();
                productImg = course.getImgUrl();
            }


            return OrderItemResponse.builder()
                    .id(item.getId())
                    .productType(String.valueOf(item.getProductType()))
                    .productId(item.getProductId())
                    .productName(productName)
                    .productImg(productImg)
                    .quantity(item.getQuantity())
                    .unitPrice(item.getUnitPrice())
                    .subtotal(subtotal)
                    .build();
        }).collect(Collectors.toList());
        User user = userRepo.findById(order.getUserId())
                .orElse(null);


        return OrderResponse.builder()
                .id(order.getId())
                .orderCode(order.getOrderCode())
                .userId(order.getUserId())
                .userFullName(user != null ? user.getFullName() : null)
                .userEmail(user != null ? user.getEmail() : null)
                .userPhone(user != null ? user.getPhone() : null)
                .userAvatar(user != null ? user.getAvatarUrl() : null)
                .shippingAddress(order.getShippingAddress())
                .paymentMethod(String.valueOf(order.getPaymentMethod()))
                .status(String.valueOf(order.getStatus()))
                .shippingFee(order.getShippingFee())
                .discount(order.getDiscount())
                .total(order.getTotal())
                .createdAt(order.getCreatedAt())
                .paidAt(order.getPaidAt())
                .items(itemResponses)
                .build();
    }

    public BigDecimal getFinalPrice(BigDecimal originalPrice, BigDecimal discountPercent) {
        if (originalPrice == null) return BigDecimal.ZERO;

        BigDecimal discount = discountPercent != null ? discountPercent : BigDecimal.ZERO;

        BigDecimal multiply = BigDecimal.ONE.subtract
                (discount.divide(BigDecimal.valueOf(100), 4, RoundingMode.HALF_UP));//1 - (discount/100,0000)
        return originalPrice.multiply(multiply).setScale(2, RoundingMode.HALF_UP);// original * multiply
    }
}