package com.vgu.tripify.domain.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class TripDetailResponse {
    private Long id;
    private String destinationCity;
    private String budgetBracket;
    private List<DailyItineraryResponse> dayItineraries;
    private CostEstimateResponse estimateCosts;
}
