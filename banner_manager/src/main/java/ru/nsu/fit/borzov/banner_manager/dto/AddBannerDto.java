package ru.nsu.fit.borzov.banner_manager.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class AddBannerDto {
    @NotNull
    private String name;
    @NotNull
    private Double price;
    @NotNull
    private String text;
    @NotNull
    private Long categoryId;
}
