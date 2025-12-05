package com.foodnow.backend.repository;

import com.foodnow.backend.entity.Item;
import com.foodnow.backend.entity.Canteen;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByCanteen(Canteen canteen);
}
