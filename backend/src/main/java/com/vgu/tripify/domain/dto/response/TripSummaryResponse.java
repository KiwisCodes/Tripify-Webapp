package com.vgu.tripify.domain.dto.response;

import lombok.Data;

@Data
public class TripSummaryResponse {
    // DTO for list view
    private Long id;
    private String destinationCity;
    private String durationDays;
    private String createdAt;
}



