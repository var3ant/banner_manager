package ru.nsu.fit.borzov.banner_manager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import ru.nsu.fit.borzov.banner_manager.dto.BannerDto;
import ru.nsu.fit.borzov.banner_manager.dto.BannerPreview;

import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity
public class Banner implements BannerPreview, BannerDto {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false, length = 255)
    //@Column(columnDefinition = "name VARCHAR(255) NOT NULL")
    @NotBlank(message = "Name is blank")
    @Size(max = 255, message = "Name contains more than 255 characters")
    @NotNull
    private String name;

    @Positive(message = "Price less or equal to zero")
    @Digits(integer=8, fraction=2, message = "Invalid Price format")
    @Column(nullable = false, precision=8, scale=2)
    //@Column(columnDefinition = "DECIMAL(8,2) NOT NULL")
    @NotNull(message = "Price is null")
    private Double price;

    @ManyToOne(optional = false)
    @JoinColumn(name = "category")
    @JsonIgnore
    @NotNull
    private Category category;

    @NotBlank(message = "Text is blank")
    @NotNull
    @Column(columnDefinition = "TEXT NOT NULL")
    //@Column(nullable = false)
    //@Type(type="text")
    private String text;

    private boolean isDeleted = false;
}
