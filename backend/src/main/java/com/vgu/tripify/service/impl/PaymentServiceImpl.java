package com.vgu.tripify.service.impl;

import com.vgu.tripify.domain.dto.response.CheckoutResponse;
import com.vgu.tripify.service.PaymentService;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Override
    public CheckoutResponse createCheckoutResponseSession(Long userId) {
        return null;
    }

    @Override
    public void handleStripWebhook(String payload, String sigHeader) {

    }
}
