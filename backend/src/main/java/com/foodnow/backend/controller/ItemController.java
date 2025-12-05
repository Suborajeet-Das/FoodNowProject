package com.foodnow.backend.controller;

import com.foodnow.backend.entity.Item;
import com.foodnow.backend.service.ItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService service;

    public ItemController(ItemService service) {
        this.service = service;
    }

    @GetMapping("/canteen/{canteenId}")
    public List<Item> getItemsForCanteen(@PathVariable Long canteenId) {
        return service.getItemsForCanteen(canteenId);
    }

    @PostMapping("/canteen/{canteenId}")
    public Item createItem(@PathVariable Long canteenId, @RequestBody Item item) {
        return service.createItem(canteenId, item);
    }

    @PutMapping("/{itemId}")
    public Item updateItem(@PathVariable Long itemId, @RequestBody Item item) {
        return service.updateItem(itemId, item);
    }

    @DeleteMapping("/{itemId}")
    public void deleteItem(@PathVariable Long itemId) {
        service.deleteItem(itemId);
    }
}

