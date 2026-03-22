package com.vgu.tripify.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="day_itineraries")
@Data
@NoArgsConstructor
public class DayItinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer dayNumber;

    @ManyToOne
    @JsonBackReference
    private Trip trip;

    @OneToMany
    private List<ItineraryItem> itineraryItems;
}
