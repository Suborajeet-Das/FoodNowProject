package com.foodnow.backend.service;

import com.foodnow.backend.entity.Canteen;
import com.foodnow.backend.repository.CanteenRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CanteenService {

    private final CanteenRepository repo;

    public CanteenService(CanteenRepository repo) {
        this.repo = repo;
    }

    @Cacheable(value = "canteens", key = "'all'")
    public List<Canteen> getAll() {
        return repo.findAll();
    }

    @Cacheable(value = "canteen", key = "#id")
    public Canteen getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Canteen not found with id " + id));
    }

    @CacheEvict(value = "canteens", key = "'all'")
    public Canteen create(Canteen c) {
        return repo.save(c);
    }

    @Caching(
        put = @CachePut(value = "canteen", key = "#id"),
        evict = @CacheEvict(value = "canteens", key = "'all'")
    )
    public Canteen update(Long id, Canteen updated) {
        Canteen existing = getById(id);
        existing.setName(updated.getName());
        existing.setLocation(updated.getLocation());
        return repo.save(existing);
    }

    @Caching(
        evict = {
            @CacheEvict(value = "canteen", key = "#id"),
            @CacheEvict(value = "canteens", key = "'all'")
        }
    )
    public void delete(Long id) {
        repo.deleteById(id);
    }
}
