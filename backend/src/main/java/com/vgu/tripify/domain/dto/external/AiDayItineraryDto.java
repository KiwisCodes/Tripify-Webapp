package com.vgu.tripify.domain.dto.external;
import java.util.List;

public record AiDayItineraryDto(
        int dayNumber,
        List<AiItineraryItemDto> itineraryItems
) {}