package com.vgu.tripify.repository;

import com.vgu.tripify.domain.entity.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TripRepository extends JpaRepository<Trip, Long> {
    /*
    By putting Trip here, Spring Data JPA knows that every time you call a method like findAll(),
    it should go to the trips table in your database and turn those rows into Java Trip objects.
    If you had a User entity, you would create a UserRepository extends JpaRepository<User, Long>.
     */
}
