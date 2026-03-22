package com.vgu.tripify.domain.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.vgu.tripify.domain.enums.Role;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Entity
@Table(name="users")
@NoArgsConstructor
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private Role role;
    private Integer credits = 5;//start with 5 credits for ex
    private String passwordHash;

    // 1 User -> Many Trips
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Trip> trips;
    // 1 User -> Many Payments
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<PaymentTransaction> paymentTransactions;

    // 1 User -> Many Reviews
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Review> reviews;
}
