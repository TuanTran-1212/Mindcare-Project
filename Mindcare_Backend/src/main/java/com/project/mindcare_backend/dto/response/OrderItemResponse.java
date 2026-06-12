package com.project.mindcare_backend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;

@Data
@Builder
public class OrderItemResponse {
    private Integer id;
    private String productType;
    private Integer productId;
    private String productName;
    private String productImg;// resolve từ book/course service
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;  // quantity * unitPrice

}