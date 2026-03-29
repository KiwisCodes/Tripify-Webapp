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
import com.vgu.tripify.repository.TripRepository;
import com.vgu.tripify.repository.UserRepository;
import com.vgu.tripify.service.TripService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Scanner;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;
    private final UserRepository userRepository;
    private final AiTripGenerator aiTripGenerator;
    private final GeocodingProvider geocodingProvider; //later

    @Override
    @Transactional
    public TripDetailResponse generateTrip(Long userId, TripGenerationRequest request) {
        // 1. VERIFY THE USER
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // 2. GENERATE THE DATA WITH AI (Now returns the DTO "Envelope")
        AiTripResponseDto aiData = aiTripGenerator.generateItinerary(
                request.getDestinationCity(),
                request.getTripDuration(),
                request.getBudgetBracket()
        );

        // 3. BUILD THE DESTINATION
        Destination destination = new Destination();
        destination.setCityName(request.getDestinationCity());

        // 4. BUILD THE PARENT TRIP
        Trip trip = new Trip();
        trip.setUser(user);
        trip.setDestination(destination);
        trip.setDurationDays(request.getTripDuration());
        trip.setBudgetBracket(request.getBudgetBracket());
        trip.setCreatedAt(LocalDateTime.now());

        /* * 5. THE STITCHING (DTO -> Entity Mapping)
         * We manually iterate through the AI data and build our JPA Entity tree.
         * Using your 'add...' methods ensures the bi-directional links are set correctly.
         */
        for (AiDayItineraryDto dayDto : aiData.days()) {
            DayItinerary dayEntity = new DayItinerary();
            dayEntity.setDayNumber(dayDto.dayNumber());

            // Link Day to Trip (Parent)
            trip.addDayItinerary(dayEntity);

            for (AiItineraryItemDto itemDto : dayDto.itineraryItems()) {
                ItineraryItem itemEntity = new ItineraryItem();
                itemEntity.setPlaceName(itemDto.placeName());
                itemEntity.setPlaceType(itemDto.placeType());
                itemEntity.setDescription(itemDto.description());

                // Link Item to Day (Parent)
                dayEntity.addItineraryItem(itemEntity);
            }
        }

        // 6. SAVE TO THE DATABASE
        // CascadeType.ALL handles the saving of destination, days, and items automatically.
        Trip savedTrip = tripRepository.save(trip);

        // 7. RETURN THE RESULT
        return mapToTripDetailResponse(savedTrip);
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

    /**
     * Converts a full Database Entity (Trip) into a lightweight Response DTO.
     */
    private TripDetailResponse mapToTripDetailResponse(Trip trip) {
        TripDetailResponse response = new TripDetailResponse();
        response.setId(trip.getId());
        response.setDestinationCity(trip.getDestination().getCityName());
        response.setBudgetBracket(trip.getBudgetBracket());

        if (trip.getItineraries() != null) {
            List<DailyItineraryResponse> dailyResponses = trip.getItineraries().stream()
                    .map(day -> {
                        DailyItineraryResponse dayDto = new DailyItineraryResponse();
                        dayDto.setDayNumber(day.getDayNumber());
                        dayDto.setItems(day.getItineraryItems().stream()
                                .map(item -> {
                                    ItineraryItemResponse itemDto = new ItineraryItemResponse();
                                    itemDto.setPlaceName(item.getPlaceName());
                                    itemDto.setPlaceType(item.getPlaceType());
                                    return itemDto;
                                }).toList());
                        return dayDto;
                    }).toList();
            response.setDayItineraries(dailyResponses);
        }
        return response;
    }
}
