package com.foodnow.backend.repository;

import com.foodnow.backend.entity.Canteen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CanteenRepository extends JpaRepository<Canteen, Long> {
}
