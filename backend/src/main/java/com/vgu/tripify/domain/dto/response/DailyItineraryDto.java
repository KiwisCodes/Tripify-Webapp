package com.vgu.tripify.domain.dto.response;

import com.vgu.tripify.domain.entity.ItineraryItem;
import lombok.Data;

import java.util.List;

@Data
public class DailyItineraryDto {
    private Integer dayNumber;
    private String dayTheme; // e.g., "Historical Walk & Local Food"

    // list of visited place
    private List<ItineraryItemDto> items;

}
