package ru.nsu.fit.borzov.banner_manager.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
@Entity
public class Category {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank(message = "Name is blank")
    @Column(length = 255, nullable = false)
    //@Column(columnDefinition = "name VARCHAR(255) NOT NULL")
    @Size(max = 255, message = "Name contains more than 255 characters")
    private String name;

    @Column(name = "req_name", length = 255, nullable = false)
    //@Column(columnDefinition = "req_name VARCHAR(255) NOT NULL")
    @NotBlank(message = "Request name is blank")
    @Size(max = 255, message = "Request name contains more than 255 characters")
    private String reqName;

    @JsonIgnore
    private boolean isDeleted = false;

}
