package com.vgu.tripify.controller;

import com.vgu.tripify.service.CreditService;
import com.vgu.tripify.service.TripService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips")
public class TripController {
    private final TripService tripService;
    private final CreditService creditService;

    public TripController(TripService tripService, CreditService creditService) {
        this.tripService = tripService;
        this.creditService = creditService;
    }

    @PostMapping
    public TripResponse createTrip(@RequestBody TripRequest request){
        creditService.deductCredit(request.userId(), 1);
        return tripService.generateTrip(request.userId(), request);
    }

    @GetMapping("/credits/{userId}")
    public int getCredits(@PathVariable("userId") Long userId){
        return creditService.getCredit(userId);
    }
}
