package com.vgu.tripify.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalDateTime;

@Entity
@Table(name="itinerary_items")
@Data
@ToString(exclude = {"dayItinerary"})
@EqualsAndHashCode(exclude = {"dayItinerary"})
@NoArgsConstructor
public class ItineraryItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String placeName;
    private String placeType;
    private String description;
    private Double latitude;
    private Double longitude;
    private LocalDateTime suggestedTime;

    @ManyToOne
    @JoinColumn(name = "tip_id")
    private Tip tip;

    @ManyToOne
    @JsonBackReference("day-item-reference")
    private DayItinerary dayItinerary;
}
