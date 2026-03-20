package com.vgu.tripify.service.impl;

import com.vgu.tripify.service.TripService;
import org.springframework.stereotype.Service;

@Service
public class TripServiceImpl implements TripService {
    @Override
    public TripResponse generateTrip(Long userId, TripGenerationRequest request) {
        return null;
    }

    @Override
    public TripResponse getTripById(Long userId, Long tripId) {
        return null;
    }

    @Override
    public List<TripSummaryResponse> getUserTrips(Long userId) {
        return null;
    }
}
