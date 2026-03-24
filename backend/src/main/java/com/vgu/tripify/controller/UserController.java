package com.vgu.tripify.controller;

import com.vgu.tripify.domain.dto.request.RegisterRequest;
import com.vgu.tripify.domain.dto.request.UpdateUserRequest;
import com.vgu.tripify.domain.dto.response.UserResponse;
import com.vgu.tripify.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

//    public UserController(UserService userService) {
//        this.userService = userService;
//    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody RegisterRequest request) {
        // Pass the DTO request to userService
        UserResponse createdUser = userService.register(request);
        // Return 201 Created status and the safe UserResponse DTO
        return ResponseEntity.ok().body(createdUser);
    }

    @PutMapping("/update")
    public ResponseEntity<UserResponse> updateUser(@Valid @RequestBody UpdateUserRequest request) {
        UserResponse updatedUser = userService.updatePersonalDetail(request);
        return  ResponseEntity.ok().body(updatedUser);
    }

}
