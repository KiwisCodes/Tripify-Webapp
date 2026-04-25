package com.vgu.tripify.service.impl;

import com.vgu.tripify.domain.dto.external.AiDayItineraryDto;
import com.vgu.tripify.domain.dto.external.AiItineraryItemDto;
import com.vgu.tripify.domain.dto.external.AiTripResponseDto;
import com.vgu.tripify.domain.dto.request.TripGenerationRequest;
import com.vgu.tripify.domain.dto.response.DailyItineraryResponse;
import com.vgu.tripify.domain.dto.response.ItineraryItemResponse;
import com.vgu.tripify.domain.dto.response.TripDetailResponse;
import com.vgu.tripify.domain.dto.response.TripSummaryResponse;
import com.vgu.tripify.domain.entity.*;
import com.vgu.tripify.external.AiTripGenerator;
import com.vgu.tripify.external.GeocodingProvider;
import com.vgu.tripify.external.helperClass.Coordinate;
import com.vgu.tripify.repository.TripRepository;
import com.vgu.tripify.repository.UserRepository;
import com.vgu.tripify.service.TripService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final AiTripGenerator aiTripGenerator;
    private final GeocodingProvider locationIQGeocodingProvider;
    private final TripPersistenceService tripPersistenceService;

    @Override
    public TripDetailResponse generateTrip(Long userId, TripGenerationRequest request) {
        // 1. VERIFY THE USER AND CHECK CREDITS
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        int cost = 5;
        if (user.getCredits() < cost) {
            throw new RuntimeException("Insufficient credits. Required: " + cost + ", Available: " + user.getCredits());
        }

        // 2. GENERATE THE DATA WITH AI (Now returns the DTO "Envelope")
        AiTripResponseDto aiData = aiTripGenerator.generateItinerary(
                request.getDestinationCity(),
                request.getTripDuration(),
                request.getBudgetBracket()
        );

        // 3. Geocode all locations generated from Gemini
        Map<String, Coordinate> coordinateCache = new HashMap<>();
        for(AiDayItineraryDto dayDto : aiData.days()){
            for(AiItineraryItemDto itemDto : dayDto.itineraryItems()){
                String query = itemDto.placeName() + ", " + request.getDestinationCity();
                Coordinate coordinate = locationIQGeocodingProvider.geocode(query);
                if(coordinate != null){
                    coordinateCache.put(query, coordinate);
                }
            }
        }
        // Use another Java Class / Object to create to allow Proxy to handle transactional action
        return tripPersistenceService.saveAndMapTrip(user, request, aiData, coordinateCache);
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
