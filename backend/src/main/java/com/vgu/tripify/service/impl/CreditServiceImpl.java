package com.vgu.tripify.service.impl;

import com.vgu.tripify.domain.entity.User;
import com.vgu.tripify.repository.UserRepository;
import com.vgu.tripify.service.CreditService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CreditServiceImpl implements CreditService {

    private final UserRepository userRepository;

    @Override
    public void deductCredit(Long userId, int amount){

    }

    @Override
    public void rewardCredit(Long userId, int amount, String reason) {

    }

    @Override
    public int getCredit(Long userId){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getCredits();
    }
}
