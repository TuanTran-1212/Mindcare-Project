package com.project.mindcare_backend.dto.response;

import com.project.mindcare_backend.dto.response.OrderItemResponse;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class OrderResponse {
    private Integer id;
    private String orderCode;
    private Integer userId;
    private String userFullName;
    private String userAvatar;
    private String userEmail;
    private String userPhone;
    private String shippingAddress;
    private String paymentMethod;
    private String status;
    private BigDecimal shippingFee;
    private BigDecimal discount;
    private BigDecimal total;
    private LocalDateTime createdAt;
    private LocalDateTime paidAt;
    private List<OrderItemResponse> items;
}