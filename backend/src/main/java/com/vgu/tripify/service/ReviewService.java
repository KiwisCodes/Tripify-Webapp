package com.vgu.tripify.service;

public interface ReviewService {
    ReviewResponse createReview(Long userId, CreateReviewRequest request);
    List<ReviewResponse> getReviewByDestination(Long destinationId);

}
