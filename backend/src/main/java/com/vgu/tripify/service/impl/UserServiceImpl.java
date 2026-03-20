package com.vgu.tripify.service.impl;

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
        return null;
    }

    @Override
    public void updatePersonalDetail(Long id, UpdateUserRequest request) {

    }
}
