package com.vgu.tripify.domain.dto.response;

import com.vgu.tripify.domain.enums.BudgetBracket;
import lombok.Data;

import java.util.List;

@Data
public class TripDetailResponse {
    private Long id;
    private String destinationCity;
    private BudgetBracket budgetBracket;
    private List<DailyItineraryResponse> dayItineraries;
    private CostEstimateResponse estimateCosts;
}
