package com.vgu.tripify.service.impl;

import com.vgu.tripify.service.CreditService;
import org.springframework.stereotype.Service;

@Service
public class CreditServiceImpl implements CreditService {

    @Override
    public void deductCredit(Long userId, int amount){

    }

    @Override
    public void rewardCredit(Long userId, int amount, String reason) {

    }

    @Override
    public int getCredit(Long userId){
        return 0;
    }
}
