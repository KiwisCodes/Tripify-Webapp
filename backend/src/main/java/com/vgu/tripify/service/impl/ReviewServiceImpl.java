package com.vgu.tripify.service.impl;

import com.vgu.tripify.domain.dto.request.CreateReviewRequest;
import com.vgu.tripify.domain.dto.response.ReviewResponse;
import com.vgu.tripify.service.ReviewService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Override
    public ReviewResponse createReview(Long userId, CreateReviewRequest request) {
        return null;
    }

    @Override
    public List<ReviewResponse> getReviewByDestination(Long destinationId) {
        return null;
    }
}
