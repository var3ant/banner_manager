package ru.nsu.fit.borzov.banner_manager.dto;

import ru.nsu.fit.borzov.banner_manager.model.Category;

public interface BannerDto {
    Long getId();
    String getName();
    Double getPrice();
    Category getCategory();
}
