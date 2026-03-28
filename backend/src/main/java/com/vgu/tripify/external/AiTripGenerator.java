package com.vgu.tripify.external;

import com.vgu.tripify.domain.entity.DayItinerary;
import com.vgu.tripify.domain.enums.BudgetBracket;
import java.util.List;

public interface AiTripGenerator {
    List<DayItinerary> generateItinerary(String city, int duration, BudgetBracket budget);
}
