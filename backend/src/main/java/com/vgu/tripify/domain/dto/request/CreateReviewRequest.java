package com.vgu.tripify.domain.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.util.List;

@Data
public class CreateReviewRequest {
    // Which destination ? ID, City
    @NotNull(message = "Desitnation ID is required")
    private Long desitnationId;

    @Min(value = 1, message=("Rating must be at least 1"))
    @Max(value = 5, message=("Rating cannot exceed 5"))
    private Integer rating;

    @NotBlank(message = "Review content cannot be empty")
    @Size(max = 3000, message = "Review message cannot exceed 3000 characters")
    private String reviewContent;

    // Photos URL
    private List<String> photoUrls;

    // userID can be extracted from jwt token in the controller
}
