package com.vgu.tripify.service.impl;

import com.vgu.tripify.domain.dto.request.RegisterRequest;
import com.vgu.tripify.domain.dto.request.UpdateUserRequest;
import com.vgu.tripify.domain.dto.response.UserResponse;
import com.vgu.tripify.service.UserService;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Override
    public UserResponse register(RegisterRequest request) {
        return null;
    }

    @Override
    public UserResponse getUserById(Long id) {
//        Example of handling DTO

        // 1. Get from DB
//        User userEntity = userRepository.findById(userId).orElseThrow();
//
//        // 2. Put into safe DTO
//        UserResponse response = new UserResponse();
//        response.setEmail(userEntity.getEmail());
//        response.setRemainingCredits(userEntity.getCredits());
//        response.setRole(userEntity.getRole().name());
//
//        // 3. Return DTO to Controller
//        return response;

        return null;
    }

    @Override
    public void updatePersonalDetail(Long id, UpdateUserRequest request) {

    }
}
