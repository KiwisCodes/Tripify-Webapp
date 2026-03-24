package com.vgu.tripify.service.impl;

import com.vgu.tripify.domain.dto.request.TripGenerationRequest;
import com.vgu.tripify.domain.dto.response.TripDetailResponse;
import com.vgu.tripify.domain.dto.response.TripSummaryResponse;
import com.vgu.tripify.domain.entity.Destination;
import com.vgu.tripify.domain.entity.Trip;
import com.vgu.tripify.domain.entity.User;
import com.vgu.tripify.repository.TripRepository;
import com.vgu.tripify.repository.UserRepository;
import com.vgu.tripify.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Scanner;

@Service
@RequiredArgsConstructor
public class TripServiceImpl implements TripService {
    private final TripRepository tripRepository;
    private final UserRepository userRepository;

    @Override
    public TripDetailResponse generateTrip(Long userId, TripGenerationRequest request) {
        // Create user based on the provided userID
        // TODO: Later we have to encrypt the userID with the token -> better protection
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        Destination newDestination = new  Destination();
        newDestination.setCityName(request.getDestinationCity());

        // 2. Map the Request DTO to a new Trip Entity
        Trip trip = new Trip();
        trip.setUser(user);
        trip.setDestination(newDestination);
        trip.setDurationDays(request.getTripDuration());
        trip.setBudgetBracket(request.getBudgetBracket());


        // 3. Save the Entity to the database
        // Always use the returned instance from save() for further operations
        // because the database generates the ID and may alter the entity state.
        Trip savedTrip = tripRepository.save(trip);

        // 4. Map the saved Entity to the Response DTO
        TripDetailResponse response = new TripDetailResponse();
        response.setId(savedTrip.getId());
        response.setDestinationCity(savedTrip.getDestination().getCityName());
        response.setBudgetBracket(savedTrip.getBudgetBracket());

        // Return the response back to the controller
        return response;


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
