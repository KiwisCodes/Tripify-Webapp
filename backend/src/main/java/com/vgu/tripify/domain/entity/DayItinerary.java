package com.vgu.tripify.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="day_itineraries")
@Data
@ToString(exclude = {"trip", "itineraryItems"})
@EqualsAndHashCode(exclude = {"trip", "itineraryItems"})
@NoArgsConstructor
public class DayItinerary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer dayNumber;

    @ManyToOne
    @JsonBackReference
    private Trip trip;


    @OneToMany(mappedBy = "dayItinerary", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("day-item-reference")
    private List<ItineraryItem> itineraryItems;

    public void addItineraryItem(ItineraryItem itineraryItem) {
        if(this.itineraryItems == null) {
            this.itineraryItems = new ArrayList<>();
        }
        this.itineraryItems.add(itineraryItem);
        itineraryItem.setDayItinerary(this);
    }
}
