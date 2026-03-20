package com.vgu.tripify.service;

public interface TripService {
    TripResponse generateTrip(Long userId, TripGenerationRequest request);
    TripResponse getTripById(Long userId, Long tripId); // enforce ownership check

    List<TripSummaryResponse> getUserTrips(Long userId);
}


