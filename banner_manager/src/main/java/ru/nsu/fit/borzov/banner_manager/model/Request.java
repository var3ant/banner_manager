package ru.nsu.fit.borzov.banner_manager.model;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;

@Data
@Entity
public class Request {

    @Id
    @GeneratedValue
    private Long id;

    @Column(name = "user_agent", nullable = false)
    //@Column(columnDefinition = "user_agent VARCHAR(255) NOT NULL")
    private String userAgent;

    @Column(name = "ip_address", length = 255, nullable = false)
    @Size(max = 255, message = "ipAddress contains more than 255 characters")
    //@Column(columnDefinition = "ip_address VARCHAR(255) NOT NULL")
    private String ipAddress;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    //@Column(columnDefinition = "date DATETIME NOT NULL")
    private Date date;

    @ManyToOne(optional = true)
    @JoinColumn(name = "banner_id")
    private Banner banner;

}
