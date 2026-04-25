package com.vgu.tripify.domain.dto.external;

import java.math.BigDecimal;

public record AiEstimatedCostsDto(
        BigDecimal hotelPerNight,
        BigDecimal foodPerDay,
        BigDecimal activityPerDay,
        BigDecimal transportPerDay,
        String currency,
        String budgetNotes
) {}