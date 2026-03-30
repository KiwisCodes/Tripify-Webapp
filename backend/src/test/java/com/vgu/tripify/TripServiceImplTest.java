package com.vgu.tripify;

import com.vgu.tripify.domain.dto.external.AiDayItineraryDto;
import com.vgu.tripify.domain.dto.external.AiItineraryItemDto;
import com.vgu.tripify.domain.dto.external.AiTripResponseDto;
import com.vgu.tripify.domain.dto.request.TripGenerationRequest;
import com.vgu.tripify.domain.dto.response.TripDetailResponse;
import com.vgu.tripify.domain.entity.Trip;
import com.vgu.tripify.domain.entity.User;
import com.vgu.tripify.domain.enums.BudgetBracket;
import com.vgu.tripify.external.AiTripGenerator;
import com.vgu.tripify.external.GeocodingProvider;
import com.vgu.tripify.repository.TripRepository;
import com.vgu.tripify.repository.UserRepository;
import com.vgu.tripify.service.impl.TripServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TripServiceImplTest {

    @Mock
    private TripRepository tripRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AiTripGenerator aiTripGenerator;

    @Mock
    private GeocodingProvider geocodingProvider;

    @InjectMocks
    private TripServiceImpl tripService;

    @Test
    void testGenerateTrip_Success() {
        // ==========================================
        // ARRANGE
        // ==========================================
        Long fakeUserId = 1L;
        TripGenerationRequest request = new TripGenerationRequest();
        request.setDestinationCity("Tokyo");
        request.setTripDuration(3);
        request.setBudgetBracket(BudgetBracket.MEDIUM);

        User fakeUser = new User();
        fakeUser.setId(fakeUserId);

        // 1. Create the new DTO-style fake data
        AiItineraryItemDto fakeItem = new AiItineraryItemDto(
                "The Louvre", "Museum", "Classic art."
        );

        AiDayItineraryDto fakeDay = new AiDayItineraryDto(
                1, List.of(fakeItem)
        );

        // This is the "Envelope" the AI now returns
        AiTripResponseDto fakeAiResponse = new AiTripResponseDto(
                List.of(fakeDay)
        );

        // 2. Train the fakes
        when(userRepository.findById(fakeUserId)).thenReturn(Optional.of(fakeUser));

        // UPDATED: Now returning the AiTripResponseDto instead of a List
        when(aiTripGenerator.generateItinerary(anyString(), anyInt(), any()))
                .thenReturn(fakeAiResponse);

        when(tripRepository.save(any(Trip.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // ==========================================
        // ACT
        // ==========================================
        TripDetailResponse response = tripService.generateTrip(fakeUserId, request);

        // ==========================================
        // ASSERT
        // ==========================================
        assertNotNull(response);
        verify(tripRepository, times(1)).save(any(Trip.class));
        verify(userRepository, times(1)).findById(fakeUserId);
        verify(aiTripGenerator, times(1)).generateItinerary("Tokyo", 3, BudgetBracket.MEDIUM);
    }
}