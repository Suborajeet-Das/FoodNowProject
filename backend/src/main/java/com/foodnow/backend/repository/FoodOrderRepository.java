package com.foodnow.backend.repository;

import com.foodnow.backend.entity.FoodOrder;
import com.foodnow.backend.entity.User;
import com.foodnow.backend.entity.Canteen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FoodOrderRepository extends JpaRepository<FoodOrder, Long> {
    List<FoodOrder> findByUser(User user);
    List<FoodOrder> findByCanteen(Canteen canteen);
}
