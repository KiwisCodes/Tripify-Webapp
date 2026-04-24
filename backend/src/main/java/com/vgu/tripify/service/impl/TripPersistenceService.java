package com.vgu.tripify.service.impl;

import com.vgu.tripify.domain.dto.external.AiDayItineraryDto;
import com.vgu.tripify.domain.dto.external.AiItineraryItemDto;
import com.vgu.tripify.domain.dto.external.AiTripResponseDto;
import com.vgu.tripify.domain.dto.request.TripGenerationRequest;
import com.vgu.tripify.domain.dto.response.*;
import com.vgu.tripify.domain.entity.*;
import com.vgu.tripify.external.helperClass.Coordinate;
import com.vgu.tripify.repository.TripRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TripPersistenceService {
    private final TripRepository tripRepository;

    @Transactional
    public TripDetailResponse saveAndMapTrip(User user, TripGenerationRequest request, AiTripResponseDto aiData, Map<String, Coordinate> coordinateCache) {

        // 4. BUILD THE DESTINATION
        // might need to check if destination exist
        Destination destination = new Destination();
        destination.setCityName(request.getDestinationCity());

        /* 5. THE STITCHING (DTO -> Entity Mapping)
         * We manually iterate through the AI data and build our JPA Entity tree.
         * Using your 'add...' methods ensures the bi-directional links are set correctly.
         */
        Trip trip = new Trip();
        trip.setUser(user);
        trip.setDestination(destination);
        trip.setDurationDays(request.getTripDuration());
        trip.setBudgetBracket(request.getBudgetBracket());
        trip.setCreatedAt(LocalDateTime.now());

        for (AiDayItineraryDto dayDto : aiData.days()) {
            DayItinerary dayEntity = new DayItinerary();
            dayEntity.setDayNumber(dayDto.dayNumber());
            for (AiItineraryItemDto itemDto : dayDto.itineraryItems()) {
                String query = itemDto.placeName() + ", " + request.getDestinationCity();
                Coordinate coordinate = coordinateCache.get(query);
                if(coordinate == null) {
                    System.out.println("Skipping" + itemDto.placeName() + ", " + request.getDestinationCity());
                    continue;
                }
                ItineraryItem itemEntity = new ItineraryItem();
                itemEntity.setPlaceName(itemDto.placeName());
                itemEntity.setPlaceType(itemDto.placeType());
                itemEntity.setDescription(itemDto.description());

                // Use pre-fetched Coordinate from Cache
                itemEntity.setLatitude(coordinate.getLatitude());
                itemEntity.setLongitude(coordinate.getLongitude());
                dayEntity.addItineraryItem(itemEntity);
            }
            if(dayEntity.getItineraryItems().isEmpty()){
                System.out.println("Skipping day " +  dayDto.dayNumber() + " - no valid location!");
                continue;
            }
            trip.addDayItinerary(dayEntity);
        }
        // 6. SAVE TO THE DATABASE
        // CascadeType.ALL handles the saving of destination, days, and items automatically.
        Trip savedTrip = tripRepository.save(trip);

        // 7. Return result
        return mapToTripDetailResponse(savedTrip);
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
                                    itemDto.setLatitude(item.getLatitude());
                                    itemDto.setLongitude(item.getLongitude());
                                    return itemDto;
                                }).toList());
                        return dayDto;
                    }).toList();
            response.setDayItineraries(dailyResponses);
        }
        return response;
    }
}
