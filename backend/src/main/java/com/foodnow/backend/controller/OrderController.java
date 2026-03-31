package com.foodnow.backend.controller;

import com.foodnow.backend.dto.OrderResponse;
import com.foodnow.backend.dto.PlaceOrderRequest;
import com.foodnow.backend.dto.UpdateStatusRequest;
import com.foodnow.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // ---- CUSTOMER: place a new order ----
    // POST /api/orders
    @PostMapping
    public ResponseEntity<OrderResponse> placeOrder(@RequestBody PlaceOrderRequest request) {
        OrderResponse response = orderService.placeOrder(request);
        return ResponseEntity.ok(response);
    }

    // ---- CUSTOMER: view own orders by userId ----
    // GET /api/orders/my/{userId}
    @GetMapping("/my/{userId}")
    public ResponseEntity<List<OrderResponse>> getMyOrders(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.getOrdersByUser(userId));
    }

    // ---- STAFF: view all orders for a canteen ----
    // GET /api/orders/canteen/{canteenId}
    @GetMapping("/canteen/{canteenId}")
    public ResponseEntity<List<OrderResponse>> getCanteenOrders(@PathVariable Long canteenId) {
        return ResponseEntity.ok(orderService.getOrdersByCanteen(canteenId));
    }

    // ---- ADMIN: view all orders in the system ----
    // GET /api/orders
    @GetMapping
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    // ---- STAFF: update order status (PENDING → PREPARING → READY) ----
    // PATCH /api/orders/{orderId}/status
    @PatchMapping("/{orderId}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long orderId,
            @RequestBody UpdateStatusRequest request) {
        try {
            OrderResponse response = orderService.updateStatus(orderId, request.getStatus());
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ---- KIOSK: scan QR, verify order is READY, mark COMPLETED ----
    // POST /api/orders/{orderId}/verify
    @PostMapping("/{orderId}/verify")
    public ResponseEntity<?> verifyAndComplete(@PathVariable Long orderId) {
        try {
            OrderResponse response = orderService.verifyAndComplete(orderId);
            return ResponseEntity.ok(response);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
