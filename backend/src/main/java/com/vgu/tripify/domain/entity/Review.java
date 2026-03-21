package com.vgu.tripify.domain.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


     @ManyToOne
     @JoinColumn(name = "user_id")
     @JsonBackReference
     private User user;

    @ManyToOne
    @JoinColumn(name = "destination_id", nullable = false)
    @JsonBackReference // Destination handles the JSON flow
    private Destination destination;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Integer rating; // 1 to 5 stars

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @OneToMany(mappedBy = "review", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Sends the photos to React when a review is loaded
    private List<ReviewPhoto> photos;
}