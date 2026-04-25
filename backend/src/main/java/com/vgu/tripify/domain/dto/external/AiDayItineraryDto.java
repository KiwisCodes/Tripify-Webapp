package com.vgu.tripify.domain.dto.external;
import java.util.List;

public record AiDayItineraryDto(
        int dayNumber,
        String dayTheme,
        List<AiItineraryItemDto> itineraryItems
) {}