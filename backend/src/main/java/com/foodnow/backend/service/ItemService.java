package com.foodnow.backend.service;

import com.foodnow.backend.entity.Canteen;
import com.foodnow.backend.entity.Item;
import com.foodnow.backend.repository.CanteenRepository;
import com.foodnow.backend.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepo;
    private final CanteenRepository canteenRepo;

    public ItemService(ItemRepository itemRepo, CanteenRepository canteenRepo) {
        this.itemRepo = itemRepo;
        this.canteenRepo = canteenRepo;
    }

    public List<Item> getItemsForCanteen(Long canteenId) {
        Canteen canteen = canteenRepo.findById(canteenId)
                .orElseThrow(() -> new RuntimeException("Canteen not found with id " + canteenId));
        return itemRepo.findByCanteen(canteen);
    }

    public Item createItem(Long canteenId, Item item) {
        Canteen canteen = canteenRepo.findById(canteenId)
                .orElseThrow(() -> new RuntimeException("Canteen not found with id " + canteenId));
        item.setCanteen(canteen);
        return itemRepo.save(item);
    }

    public Item updateItem(Long itemId, Item updated) {
        Item existing = itemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id " + itemId));

        existing.setName(updated.getName());
        existing.setPrice(updated.getPrice());
        existing.setQuantityAvailable(updated.getQuantityAvailable());

        return itemRepo.save(existing);
    }

    public void deleteItem(Long itemId) {
        itemRepo.deleteById(itemId);
    }
}
