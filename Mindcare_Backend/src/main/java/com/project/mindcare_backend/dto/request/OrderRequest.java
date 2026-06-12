package com.project.mindcare_backend.dto.request;

import com.project.mindcare_backend.enums.OrderStatus;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderRequest {
    private Integer userId; // có thể null

    @NotBlank(message = "shipping_address is required")
    private String shippingAddress;

    @NotNull(message = "payment_method is required")
    private String paymentMethod; // COD, VNPay, Momo, Bank
    private BigDecimal shippingFee;
    private BigDecimal discount;
    private OrderStatus orderStatus;
    @NotEmpty(message = "items must not be empty")
    @Valid
    private List<OrderItemRequest> items;
}