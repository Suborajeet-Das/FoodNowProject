package com.foodnow.backend.dto;

import com.foodnow.backend.entity.Item;
import java.math.BigDecimal;

/**
 * Flat DTO for Item — avoids circular Canteen serialization issues.
 */
public class ItemResponse {

    private Long id;
    private String name;
    private BigDecimal price;
    private Integer quantityAvailable;
    private Long canteenId;

    public static ItemResponse from(Item item) {
        ItemResponse r = new ItemResponse();
        r.id                 = item.getId();
        r.name               = item.getName();
        r.price              = item.getPrice();
        r.quantityAvailable  = item.getQuantityAvailable();
        r.canteenId          = item.getCanteen() != null ? item.getCanteen().getId() : null;
        return r;
    }

    public Long getId()                  { return id; }
    public String getName()              { return name; }
    public BigDecimal getPrice()         { return price; }
    public Integer getQuantityAvailable(){ return quantityAvailable; }
    public Long getCanteenId()           { return canteenId; }
}
