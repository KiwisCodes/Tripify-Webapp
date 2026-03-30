package com.vgu.tripify.external;

import com.vgu.tripify.domain.dto.external.AiTripResponseDto;
import com.vgu.tripify.domain.entity.DayItinerary;
import com.vgu.tripify.domain.enums.BudgetBracket;
import java.util.List;

public interface AiTripGenerator {
    AiTripResponseDto generateItinerary(String city, int duration, BudgetBracket budget);
}
