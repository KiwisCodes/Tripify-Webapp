package com.vgu.tripify.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CheckoutResponse {
    private String sessionId;

    // Secure Stripe URL -> allow user enter their credit card
    private String checkOutUrl;
}
