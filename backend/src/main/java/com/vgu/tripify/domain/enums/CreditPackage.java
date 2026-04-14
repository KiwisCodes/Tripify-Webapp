package com.vgu.tripify.domain.enums;

import lombok.Getter;

@Getter
public enum CreditPackage {
    EXPLORER("Explorer Bundle", 900L, 500),      // $9.00 (900 cents), 500 credits
    GLOBETROTTER("Globetrotter Pack", 4900L, 5000); // $49.00 (4900 cents), 5000 credits

    private final String displayName;
    private final Long priceInCents;
    private final Integer credits;

    CreditPackage(String displayName, Long priceInCents, Integer credits) {
        this.displayName = displayName;
        this.priceInCents = priceInCents;
        this.credits = credits;
    }
}