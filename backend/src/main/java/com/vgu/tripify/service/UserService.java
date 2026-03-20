package com.vgu.tripify.service;

public interface UserService {
    UserResponse register(RegisterRequest request);
    UserResponse getUserById(Long id);

    void updatePersonalDetail(Long id, UpdateUserRequest request);
}

