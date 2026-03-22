package com.vgu.tripify.service;

import com.vgu.tripify.domain.dto.response.CheckoutResponse;

public interface PaymentService {
    CheckoutResponse createCheckoutResponseSession(Long userId);
    void handleStripWebhook(String payload, String sigHeader);

}
