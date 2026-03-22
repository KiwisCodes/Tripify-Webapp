package com.vgu.tripify.service;

import com.vgu.tripify.domain.entity.Trip;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

public interface TripService {
    TripResponse generateTrip(Long userId, TripGenerationRequest request);
    TripResponse getTripById(Long userId, Long tripId); // enforce ownership check

    List<TripSummaryResponse> getUserTrips(Long userId);
    //hung add
    List<Trip> getAllTrips();
}


