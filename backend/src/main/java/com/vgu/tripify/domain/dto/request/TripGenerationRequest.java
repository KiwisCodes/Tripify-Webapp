package com.vgu.tripify.domain.dto.request;

import com.vgu.tripify.domain.entity.Destination;
import com.vgu.tripify.domain.enums.BudgetBracket;
import lombok.Data;
import jakarta.validation.constraints.*;

@Data
public class TripGenerationRequest {

    @NotBlank(message = "Destination is required!")
    private String destinationCity;

    @NotNull(message = "Duration is required")
    @Max(value = 14, message = "Trip cannot exceed 14 days")
    private Integer tripDuration;

    @NotBlank(message = "Budget bracket is required")
    @Pattern(regexp = "^(LOW|MEDIUM|HIGH)$", message = "Budget must be LOW, MEDIUM or HIGH")
    private BudgetBracket budgetBracket;
}
