package com.foodnow.backend.repository;

import com.foodnow.backend.entity.Item;
import com.foodnow.backend.entity.Canteen;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByCanteen(Canteen canteen);

    @Query("SELECT i FROM Item i LEFT JOIN OrderItem oi ON oi.item = i GROUP BY i.id ORDER BY COALESCE(SUM(oi.quantity), 0) DESC, i.id ASC")
    List<Item> findPopularItems(Pageable pageable);
}
