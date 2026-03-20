package com.vgu.tripify.service;

public interface CreditService {
    void deductCredit(Long userId, int amount);
    void rewardCredit(Long userId, int amount, String reason);
    int getCredit(Long userId);
}


