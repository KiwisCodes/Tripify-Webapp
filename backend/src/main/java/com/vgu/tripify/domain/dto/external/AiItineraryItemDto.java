package com.vgu.tripify.domain.dto.external;

public record AiItineraryItemDto(
        String placeName,
        String placeType,
        String time,
        String description
) {}