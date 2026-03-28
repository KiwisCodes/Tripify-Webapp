package com.vgu.tripify.external;

import com.vgu.tripify.domain.entity.DayItinerary;
import com.vgu.tripify.domain.enums.BudgetBracket;

import java.util.List;

public class GeminiTripGeneratorImpl implements AiTripGenerator {
    @Override
    public List<DayItinerary> generateItinerary(String city, int duration, BudgetBracket budget) {
        return List.of();
    }
}
