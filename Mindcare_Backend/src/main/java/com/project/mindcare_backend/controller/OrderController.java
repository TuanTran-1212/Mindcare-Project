package com.project.mindcare_backend.controller;

import com.project.mindcare_backend.dto.request.OrderRequest;
import com.project.mindcare_backend.dto.response.OrderResponse;
import com.project.mindcare_backend.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    // GET /api/orders
    // GET /api/orders?userId=5  → lấy theo user
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrders(
            @RequestParam(required = false) Integer userId) {

        if (userId != null) {
            return ResponseEntity.ok(orderService.findAllByUserId(userId));
        }
        return ResponseEntity.ok(orderService.findAll());
    }

    // POST /api/orders
    @PostMapping
    public ResponseEntity<OrderResponse> createOrder(
            @RequestBody OrderRequest request) {

        OrderResponse response = orderService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // PUT /api/orders/{id}
    @PutMapping("/{id}")
    public ResponseEntity<OrderResponse> updateOrder(
            @PathVariable Integer id,
            @RequestBody OrderRequest request) {

        OrderResponse response = orderService.updateOrder(id, request);
        return ResponseEntity.ok(response);
    }

    // DELETE /api/orders/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}