package com.vgu.tripify.domain.dto.response;
import lombok.Data;

@Data
public class ItineraryItemResponse {
    private String time;
    private String placeName;
    private String placeType; // Attraction , FOOD, HOTEL

    // MAP Coordinates
    private Double lattitude;
    private Double longitude;

    // Route Line
    private Integer orderIndex; // 1(first stop) -> 2(second stop)
}
