package com.vgu.tripify.domain.dto.response;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class CostEstimateResponse {
    private BigDecimal estimateHotelPerNight;
    private BigDecimal estimateFoodPerDay;
    private BigDecimal estimateActivityPerDay;
    private BigDecimal estimateTransportPerDay;

    private BigDecimal totalEstimatedCost;

    private String currency;

    // From AI, additional Tip
    private String budgetNotes;
}
