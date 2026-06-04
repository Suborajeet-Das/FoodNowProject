package com.foodnow.backend.service;

import com.foodnow.backend.dto.ItemResponse;
import com.foodnow.backend.entity.Canteen;
import com.foodnow.backend.entity.Item;
import com.foodnow.backend.repository.CanteenRepository;
import com.foodnow.backend.repository.ItemRepository;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ItemService {

    private final ItemRepository itemRepo;
    private final CanteenRepository canteenRepo;
    private final CacheManager cacheManager;

    public ItemService(ItemRepository itemRepo, CanteenRepository canteenRepo, CacheManager cacheManager) {
        this.itemRepo = itemRepo;
        this.canteenRepo = canteenRepo;
        this.cacheManager = cacheManager;
    }

    @Cacheable(value = "menuItems", key = "#canteenId")
    public List<ItemResponse> getItemsForCanteen(Long canteenId) {
        Canteen canteen = canteenRepo.findById(canteenId)
                .orElseThrow(() -> new RuntimeException("Canteen not found with id " + canteenId));
        return itemRepo.findByCanteen(canteen).stream()
                .map(ItemResponse::from)
                .collect(Collectors.toList());
    }

    @Cacheable(value = "popularItems", key = "'top'")
    public List<ItemResponse> getPopularItems() {
        return itemRepo.findPopularItems(PageRequest.of(0, 5)).stream()
                .map(ItemResponse::from)
                .collect(Collectors.toList());
    }

    public Item createItem(Long canteenId, Item item) {
        Canteen canteen = canteenRepo.findById(canteenId)
                .orElseThrow(() -> new RuntimeException("Canteen not found with id " + canteenId));
        item.setCanteen(canteen);
        Item saved = itemRepo.save(item);
        evictItemCaches(canteenId);
        return saved;
    }

    public Item updateItem(Long itemId, Item updated) {
        Item existing = itemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id " + itemId));

        existing.setName(updated.getName());
        existing.setPrice(updated.getPrice());
        existing.setQuantityAvailable(updated.getQuantityAvailable());

        Item saved = itemRepo.save(existing);
        evictItemCaches(saved.getCanteen() != null ? saved.getCanteen().getId() : null);
        return saved;
    }

    public void deleteItem(Long itemId) {
        Item existing = itemRepo.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found with id " + itemId));
        Long canteenId = existing.getCanteen() != null ? existing.getCanteen().getId() : null;
        itemRepo.deleteById(itemId);
        evictItemCaches(canteenId);
    }

    private void evictItemCaches(Long canteenId) {
        if (canteenId != null) {
            Cache menuItemsCache = cacheManager.getCache("menuItems");
            if (menuItemsCache != null) {
                menuItemsCache.evict(canteenId);
            }
        }
        Cache popularItemsCache = cacheManager.getCache("popularItems");
        if (popularItemsCache != null) {
            popularItemsCache.evict("top");
        }
    }
}
