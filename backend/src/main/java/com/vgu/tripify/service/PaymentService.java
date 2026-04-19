package com.vgu.tripify.service;

import com.vgu.tripify.domain.dto.response.CheckoutResponse;
import com.vgu.tripify.domain.enums.CreditPackage;

public interface PaymentService {
    CheckoutResponse createCheckoutResponseSession(Long userId, CreditPackage creditPackage);
    void processWebhook(String payload, String sigHeader);

}
