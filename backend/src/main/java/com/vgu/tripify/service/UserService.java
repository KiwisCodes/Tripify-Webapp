package com.vgu.tripify.service;

import com.vgu.tripify.domain.dto.request.RegisterRequest;
import com.vgu.tripify.domain.dto.request.UpdateUserRequest;
import com.vgu.tripify.domain.dto.response.UserResponse;

public interface UserService {
    UserResponse register(RegisterRequest request);
    UserResponse getUserById(Long id);

    UserResponse updatePersonalDetail(UpdateUserRequest request);
}

