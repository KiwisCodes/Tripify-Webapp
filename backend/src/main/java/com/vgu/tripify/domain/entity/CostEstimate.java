package com.vgu.tripify.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.math.BigDecimal;
import java.util.Currency;


@Entity
@Table(name="cost_estimates")
@Data
@NoArgsConstructor
public class CostEstimate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "trip_id")
    @JsonBackReference // Prevents the infinite JSON loop
    private Trip trip;
    /*
    @joincolumn adds a column named trip_id to the cost_estimates table so we know who this belongs to
    We dont strictly need trip here, since, trip already has CostEstimate.
    But have if we have a list of costestimates, 1 of them is error, now we find to know which trip
    it belongs too, now we dont know, so we keep the trip in here


    but if we keep it here we have a problem, if it send the data of the trip to the frontend,
    spring boot will react:
    Imagine you are asking your Spring Boot server to send a Trip to your React frontend. Here is how Jackson (the JSON converter) handles it:
    Starts at Trip: It converts the trip's ID, name, and dates into JSON.
    Sees @JsonManagedReference: It looks at the CostEstimate attached to the trip.
    Because it is "managed" by the trip, Jackson says, "Okay, I am allowed to go inside the CostEstimate and convert its data too."
    Goes into CostEstimate: It converts the hotel costs, food costs, and currency into JSON.
    Sees @JsonBackReference on the trip field: Jackson says, "STOP! This is a back reference.
    I am not allowed to go back into the Trip object from here."
     */


    //float and double will break, bigdec to do high precision stuff
    private BigDecimal hotelPerNight;
    private BigDecimal foodPerDay;
    private BigDecimal activityPerDay;
    private BigDecimal transportPerDay;
    private Currency currency;
}
