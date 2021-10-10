package ru.nsu.fit.borzov.banner_manager.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class UpdateCategoryDto {

    @NotNull
    private Long id;

    @NotNull
    private String name;

    @NotNull
    private String reqName;

}
