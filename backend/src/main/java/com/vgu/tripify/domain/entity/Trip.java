package com.vgu.tripify.domain.entity;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.vgu.tripify.domain.enums.BudgetBracket;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="trips")
@Data //added lombok to maven, auto make getter and setter
@NoArgsConstructor
@AllArgsConstructor
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "destination_id")
    private Destination destination;

    private Integer durationDays;

    @Enumerated(EnumType.STRING) //without this, db store values as 0,1,2 for this var, with this, it stores eg: LOW, MEDIUM
    @Column(name = "budget_bracket")
    private BudgetBracket budgetBracket;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @OneToOne(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private CostEstimate costEstimate;

    // JsonManagedReference prevents infinite loops when sending JSON to React
    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<DayItinerary> itineraries;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference // Stops the infinite JSON loop back to User
    private User user;

    public void addDayItinerary(DayItinerary dayItinerary) {
        if (this.itineraries == null) {
            this.itineraries = new ArrayList<>();
        }
        this.itineraries.add(dayItinerary);
        dayItinerary.setTrip(this);
    }

}
