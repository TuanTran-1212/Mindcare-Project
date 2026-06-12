package com.project.mindcare_backend.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class OrderItemRequest {
    @NotNull(message = "product_type is required")
    private String productType; // BOOK hoặc COURSE
    @NotNull(message = "product_id is required")
    @Positive(message = "product_id must be positive")
    private Integer productId;
    @NotNull
    @Min(value = 1, message = "quantity must be at least 1")
    private Integer quantity;
    private BigDecimal unitPrice;
}