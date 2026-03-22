package com.vgu.tripify.service;

import com.vgu.tripify.domain.dto.request.TripGenerationRequest;
import com.vgu.tripify.domain.dto.response.TripDetailResponse;
import com.vgu.tripify.domain.dto.response.TripSummaryResponse;
import com.vgu.tripify.domain.entity.Trip;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

public interface TripService {
    TripDetailResponse generateTrip(Long userId, TripGenerationRequest request);
    TripDetailResponse getTripById(Long userId, Long tripId); // enforce ownership check

    List<TripSummaryResponse> getUserTrips(Long userId);
    //hung add
    List<Trip> getAllTrips();
}


