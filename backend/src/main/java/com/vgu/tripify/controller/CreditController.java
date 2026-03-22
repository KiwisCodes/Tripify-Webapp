package com.vgu.tripify.controller;

import com.vgu.tripify.service.CreditService;
import com.vgu.tripify.service.impl.CreditServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/credits")
@RequiredArgsConstructor
public class CreditController {
    private final CreditService creditService;

//    public CreditController(CreditService creditService){
//        this.creditService = creditService;
//    }

    @GetMapping("/{userId}")
    public int getCredit(@PathVariable("userId") Long userId){
        return creditService.getCredit(userId);
    }
}
