package com.vgu.tripify.service;

import com.vgu.tripify.domain.dto.request.CreateReviewRequest;
import com.vgu.tripify.domain.dto.response.ReviewResponse;

import java.util.List;

public interface ReviewService {
    ReviewResponse createReview(Long userId, CreateReviewRequest request);
    List<ReviewResponse> getReviewByDestination(Long destinationId);

}
