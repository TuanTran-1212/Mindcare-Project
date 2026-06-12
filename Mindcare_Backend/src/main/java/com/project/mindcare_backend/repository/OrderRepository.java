package com.project.mindcare_backend.repository;

import com.project.mindcare_backend.modal.Order;
import com.project.mindcare_backend.enums.OrderStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUserId(Integer userId);
//    Optional<Order> findByOrderCode(String orderCode);
//
//    // Lấy toàn bộ đơn của một user, mới nhất trước
//    List<Order> findByUserIdOrderByCreatedAtDesc(Integer userId);
//    // Lấy order kèm items trong 1 query (tránh N+1)
//    @Query("SELECT DISTINCT o FROM Order o LEFT JOIN FETCH o.items WHERE o.id = :id")
//    Optional<Order> findByIdWithItems(@Param("id") Integer id);
//
//    @Modifying
//    @Query("UPDATE Order o SET o.status = :status, o.updatedAt = CURRENT_TIMESTAMP WHERE o.id = :orderId")
//    int updateOrderStatus(@Param("orderId") Integer orderId, @Param("status") OrderStatus status);
}