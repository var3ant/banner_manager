package ru.nsu.fit.borzov.banner_manager.dto;

import lombok.Data;

@Data
public class ResponseBannerDto {

    private Long id;

    private String name;

    private Double price;

    private Long categoryId;

    private String text;
}
