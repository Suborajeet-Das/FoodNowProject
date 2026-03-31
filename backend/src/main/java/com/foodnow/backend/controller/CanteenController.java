package com.foodnow.backend.controller;

import com.foodnow.backend.entity.Canteen;
import com.foodnow.backend.service.CanteenService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/canteens")
public class CanteenController {

    private final CanteenService canteenService;

    public CanteenController(CanteenService canteenService) {
        this.canteenService = canteenService;
    }

    @PostMapping
    public ResponseEntity<Canteen> createCanteen(@RequestBody Canteen canteen) {
        return ResponseEntity.ok(canteenService.create(canteen));
    }

    @GetMapping
    public ResponseEntity<List<Canteen>> getAllCanteens() {
        return ResponseEntity.ok(canteenService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Canteen> getCanteenById(@PathVariable Long id) {
        Canteen canteen = canteenService.getById(id);
        if (canteen != null) {
            return ResponseEntity.ok(canteen);
        }
        return ResponseEntity.notFound().build();
    }
}
