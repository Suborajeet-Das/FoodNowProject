package com.foodnow.backend.service;

import com.foodnow.backend.entity.Canteen;
import com.foodnow.backend.repository.CanteenRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CanteenService {

    private final CanteenRepository repo;

    public CanteenService(CanteenRepository repo) {
        this.repo = repo;
    }

    public List<Canteen> getAll() {
        return repo.findAll();
    }

    public Canteen getById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Canteen not found with id " + id));
    }

    public Canteen create(Canteen c) {
        return repo.save(c);
    }

    public Canteen update(Long id, Canteen updated) {
        Canteen existing = getById(id);
        existing.setName(updated.getName());
        existing.setLocation(updated.getLocation());
        return repo.save(existing);
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
