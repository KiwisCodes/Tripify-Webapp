package com.vgu.tripify.service;

public interface PaymentService {
    CheckoutResponse createCheckoutResponseSession(Long userId);
    void handleStripWebhook(String payload, String sigHeader);

}
