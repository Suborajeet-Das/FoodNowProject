package com.foodnow.backend.dto;

import com.foodnow.backend.entity.FoodOrder;
import com.foodnow.backend.entity.OrderStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Flattened response — avoids JSON circular references from JPA bidirectional
 * relationships (FoodOrder → OrderItem → FoodOrder).
 */
public class OrderResponse {

    private Long orderId;
    private OrderStatus status;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private Long userId;
    private String userFullName;
    private Long canteenId;
    private String canteenName;
    private List<OrderItemDetail> items;

    // ---- Static factory ----
    public static OrderResponse from(FoodOrder order) {
        OrderResponse r = new OrderResponse();
        r.orderId       = order.getId();
        r.status        = order.getStatus();
        r.totalPrice    = order.getTotalPrice();
        r.createdAt     = order.getCreatedAt();
        r.userId        = order.getUser().getId();
        r.userFullName  = order.getUser().getFullName();
        r.canteenId     = order.getCanteen().getId();
        r.canteenName   = order.getCanteen().getName();
        r.items = order.getItems().stream().map(oi -> {
            OrderItemDetail d = new OrderItemDetail();
            d.itemId    = oi.getItem().getId();
            d.itemName  = oi.getItem().getName();
            d.quantity  = oi.getQuantity();
            d.unitPrice = oi.getUnitPrice();
            return d;
        }).collect(Collectors.toList());
        return r;
    }

    // ---- Getters ----
    public Long getOrderId()            { return orderId; }
    public OrderStatus getStatus()      { return status; }
    public BigDecimal getTotalPrice()   { return totalPrice; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public Long getUserId()             { return userId; }
    public String getUserFullName()     { return userFullName; }
    public Long getCanteenId()          { return canteenId; }
    public String getCanteenName()      { return canteenName; }
    public List<OrderItemDetail> getItems() { return items; }

    // ---- Inner class ----
    public static class OrderItemDetail {
        public Long itemId;
        public String itemName;
        public int quantity;
        public BigDecimal unitPrice;
    }
}
