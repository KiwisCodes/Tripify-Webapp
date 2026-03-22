package com.vgu.tripify.domain.dto.response;

import lombok.Data;

@Data
public class UserResponse {
    private String email;
    private int remainingCredits;
    private String role; // "Free" or "Premium" -> hide or show ads
}
