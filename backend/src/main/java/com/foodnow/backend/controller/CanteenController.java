package com.foodnow.backend.controller;

import com.foodnow.backend.entity.Canteen;
import com.foodnow.backend.service.CanteenService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/canteens")
public class CanteenController {

    private final CanteenService service;

    public CanteenController(CanteenService service) {
        this.service = service;
    }

    // GET /api/canteens
    @GetMapping
    public List<Canteen> getAll() {
        return service.getAll();
    }

    // GET /api/canteens/{id}
    @GetMapping("/{id}")
    public Canteen getOne(@PathVariable Long id) {
        return service.getById(id);
    }

    // POST /api/canteens
    @PostMapping
    public Canteen create(@RequestBody Canteen c) {
        return service.create(c);
    }

    // PUT /api/canteens/{id}
    @PutMapping("/{id}")
    public Canteen update(@PathVariable Long id, @RequestBody Canteen c) {
        return service.update(id, c);
    }

    // DELETE /api/canteens/{id}
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
