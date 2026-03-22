package com.vgu.tripify.domain.dto.response;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ReviewResponse {
    private Long id; // review's ID

    private String authorName;
    private Integer rating;
    private LocalDateTime createdAt;

    private List<String> photoUrls;
}
