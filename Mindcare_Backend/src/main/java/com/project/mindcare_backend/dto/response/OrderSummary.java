package com.project.mindcare_backend.dto.response;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class OrderSummary {
    private Integer id;
    private String orderCode;
    private Integer userId;
    private String status;
    private BigDecimal total;
    private LocalDateTime createdAt;
}