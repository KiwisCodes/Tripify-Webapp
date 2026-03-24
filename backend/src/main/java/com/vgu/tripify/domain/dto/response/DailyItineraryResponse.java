package com.vgu.tripify.domain.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class DailyItineraryResponse {
    private Integer dayNumber;
    private String dayTheme; // e.g., "Historical Walk & Local Food"

    // list of visited place
    private List<ItineraryItemResponse> items;

}
