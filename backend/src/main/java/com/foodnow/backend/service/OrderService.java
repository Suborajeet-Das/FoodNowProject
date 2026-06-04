package com.foodnow.backend.service;

import com.foodnow.backend.dto.OrderResponse;
import com.foodnow.backend.dto.PlaceOrderRequest;
import com.foodnow.backend.entity.*;
import com.foodnow.backend.repository.*;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final FoodOrderRepository orderRepo;
    private final ItemRepository itemRepo;
    private final UserRepository userRepo;
    private final CanteenRepository canteenRepo;
    private final CacheManager cacheManager;

    public OrderService(FoodOrderRepository orderRepo,
                        ItemRepository itemRepo,
                        UserRepository userRepo,
                        CanteenRepository canteenRepo,
                        CacheManager cacheManager) {
        this.orderRepo   = orderRepo;
        this.itemRepo    = itemRepo;
        this.userRepo    = userRepo;
        this.canteenRepo = canteenRepo;
        this.cacheManager = cacheManager;
    }

    // ---- CUSTOMER: place a new order ----
    @Transactional
    public OrderResponse placeOrder(PlaceOrderRequest req) {
        User user = userRepo.findById(req.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found: " + req.getUserId()));

        Canteen canteen = canteenRepo.findById(req.getCanteenId())
                .orElseThrow(() -> new RuntimeException("Canteen not found: " + req.getCanteenId()));

        FoodOrder order = new FoodOrder();
        order.setUser(user);
        order.setCanteen(canteen);
        order.setStatus(OrderStatus.PENDING);

        // Build order items and calculate total
        BigDecimal total = BigDecimal.ZERO;
        for (PlaceOrderRequest.OrderItemRequest itemReq : req.getItems()) {
            Item item = itemRepo.findById(itemReq.getItemId())
                    .orElseThrow(() -> new RuntimeException("Item not found: " + itemReq.getItemId()));

            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setItem(item);
            oi.setQuantity(itemReq.getQuantity());
            oi.setUnitPrice(item.getPrice());

            order.getItems().add(oi);
            total = total.add(item.getPrice().multiply(BigDecimal.valueOf(itemReq.getQuantity())));
        }

        order.setTotalPrice(total);
        FoodOrder saved = orderRepo.save(order);
        evictOrderCaches();
        return OrderResponse.from(saved);
    }

    // ---- CUSTOMER: view their own orders ----
    public List<OrderResponse> getOrdersByUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found: " + userId));
        return orderRepo.findByUser(user).stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());
    }

    // ---- STAFF: view orders for their canteen ----
    public List<OrderResponse> getOrdersByCanteen(Long canteenId) {
        Canteen canteen = canteenRepo.findById(canteenId)
                .orElseThrow(() -> new RuntimeException("Canteen not found: " + canteenId));
        return orderRepo.findByCanteen(canteen).stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());
    }

    // ---- ADMIN: view all orders ----
    @Cacheable(value = "dashboardStats", key = "'allOrders'")
    public List<OrderResponse> getAllOrders() {
        return orderRepo.findAll().stream()
                .map(OrderResponse::from)
                .collect(Collectors.toList());
    }

    // ---- STAFF: update order status (PENDING → PREPARING → READY only) ----
    @Transactional
    public OrderResponse updateStatus(Long orderId, OrderStatus newStatus) {
        FoodOrder order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        validateStatusTransition(order.getStatus(), newStatus);
        order.setStatus(newStatus);
        OrderResponse response = OrderResponse.from(orderRepo.save(order));
        evictOrderCaches();
        return response;
    }

    // ---- KIOSK: verify QR and mark COMPLETED or ARRIVED ----
    @Transactional
    public OrderResponse verifyAndComplete(Long orderId) {
        FoodOrder order = orderRepo.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found: " + orderId));

        if (order.getStatus() == OrderStatus.READY) {
            order.setStatus(OrderStatus.COMPLETED);
        } else if (order.getStatus() == OrderStatus.PENDING) {
            order.setStatus(OrderStatus.ARRIVED);
        } else {
            throw new IllegalStateException(
                "Order is not ready for pickup. Current status: " + order.getStatus()
            );
        }

        OrderResponse response = OrderResponse.from(orderRepo.save(order));
        evictOrderCaches();
        return response;
    }

    // ---- Internal: enforce allowed transitions ----
    private void validateStatusTransition(OrderStatus current, OrderStatus next) {
        boolean valid = switch (current) {
            case PENDING   -> next == OrderStatus.PREPARING;
            case PREPARING -> next == OrderStatus.READY;
            case ARRIVED   -> next == OrderStatus.COMPLETED;
            default        -> false; // READY and COMPLETED can only be set by kiosk/system
        };
        if (!valid) {
            throw new IllegalStateException(
                "Invalid status transition: " + current + " → " + next
            );
        }
    }

    private void evictOrderCaches() {
        Cache dashboardStatsCache = cacheManager.getCache("dashboardStats");
        if (dashboardStatsCache != null) {
            dashboardStatsCache.evict("allOrders");
        }
        Cache popularItemsCache = cacheManager.getCache("popularItems");
        if (popularItemsCache != null) {
            popularItemsCache.evict("top");
        }
    }
}
