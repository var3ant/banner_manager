package ru.nsu.fit.borzov.banner_manager.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class AddCategoryDto {
    @NotNull
    private String name;
    @NotNull
    private String reqName;

}
