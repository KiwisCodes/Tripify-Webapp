package com.vgu.tripify.controller;

import com.vgu.tripify.domain.dto.request.TripGenerationRequest;
import com.vgu.tripify.domain.dto.response.TripDetailResponse;
import com.vgu.tripify.domain.entity.Trip;
import com.vgu.tripify.security.CustomUserDetails;
import com.vgu.tripify.service.CreditService;
import com.vgu.tripify.service.TripService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/trips")
@RequiredArgsConstructor
public class TripController {
    private final TripService tripService;
    private final CreditService creditService;

    @PostMapping
    public ResponseEntity<TripDetailResponse> createTrip(Authentication authentication, @Valid @RequestBody TripGenerationRequest request){
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Long userId = userDetails.getId();
        TripDetailResponse tripDetailResponse = tripService.generateTrip(userId, request);
        return ResponseEntity.ok().body(tripDetailResponse);
    }

    @GetMapping("/credits/{userId}")
    public int getCredits(@PathVariable("userId") Long userId){
        return creditService.getCredit(userId);
    }

    @GetMapping
    public List<Trip> getAllTrips(){
        return tripService.getAllTrips();
    }
}
