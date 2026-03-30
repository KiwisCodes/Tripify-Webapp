package com.vgu.tripify.domain.dto.external;
import java.util.List;

public record AiTripResponseDto(
        List<AiDayItineraryDto> days
) {}