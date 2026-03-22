package com.vgu.tripify.service.impl;

import com.vgu.tripify.domain.dto.request.TripGenerationRequest;
import com.vgu.tripify.domain.dto.response.TripDetailResponse;
import com.vgu.tripify.domain.dto.response.TripSummaryResponse;
import com.vgu.tripify.domain.entity.Trip;
import com.vgu.tripify.repository.TripRepository;
import com.vgu.tripify.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Scanner;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;

    @Override
    public TripDetailResponse generateTrip(Long userId, TripGenerationRequest request) {
        return null;
    }

    @Override
    public TripDetailResponse getTripById(Long userId, Long tripId) {
        return null;
    }

    @Override
    public List<TripSummaryResponse> getUserTrips(Long userId) {
        return null;
    }

    @Override
    public List<Trip> getAllTrips() {
        return tripRepository.findAll();
    }
}
