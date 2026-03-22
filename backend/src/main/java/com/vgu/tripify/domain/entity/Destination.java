package com.vgu.tripify.domain.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Entity
@Table(name="destinations")
@Data
@NoArgsConstructor
@RequiredArgsConstructor
public class Destination {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="city_name")
    private String cityName;//with the @Entity and @Table, Hibernate will make a col for each attribute anyway, using @Column just to make it more explicit
    private String country;
    private Double latitude;
    private Double longitude;
    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Review> reviews;
}
