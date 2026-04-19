package com.vgu.tripify.controller;

import com.vgu.tripify.domain.dto.response.CheckoutResponse;
import com.vgu.tripify.domain.enums.CreditPackage;
import com.vgu.tripify.service.PaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/payments/create-session")
    public ResponseEntity<CheckoutResponse> createCheckoutSession(
            @RequestParam Long userId,
            @RequestParam CreditPackage packageType) {

        log.info("User {} requested to buy the {} package", userId, packageType.name());
        CheckoutResponse response = paymentService.createCheckoutResponseSession(userId, packageType);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/webhooks/stripe")
    public ResponseEntity<Void> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        log.info("Received Stripe Webhook signal");

        // ADDED TRY-CATCH HERE TO CATCH THE SILENT CRASH
        try {
            paymentService.processWebhook(payload, sigHeader);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("CRASH IN WEBHOOK PROCESSING: ", e); // This is the magic line we need!
            return ResponseEntity.badRequest().build();
        }
    }
}
/*

choose /webhooks because it differs from the frontend api
/api/payments: Usually represents actions your frontend (React) or
User takes (e.g., GET /history or POST /create-session).
These require a JWT Token because you know who the user is.
 */
