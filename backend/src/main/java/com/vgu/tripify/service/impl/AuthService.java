package com.vgu.tripify.service.impl;

import com.vgu.tripify.domain.dto.request.LoginRequest;
import com.vgu.tripify.domain.dto.response.AuthResponse;
import com.vgu.tripify.security.CustomUserDetailService;
import com.vgu.tripify.security.CustomUserDetails;
import com.vgu.tripify.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final CustomUserDetailService customUserDetailService;

    public AuthResponse authenticateUser(LoginRequest loginRequest) {
        // Authenticate Credentials
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword())
        );

        // load the custom user details
        CustomUserDetails userDetails = (CustomUserDetails) customUserDetailService.loadUserByUsername(loginRequest.getEmail());

        // generate token using ID as subject
        String token = jwtTokenProvider.generateJwtToken(userDetails);

        return new AuthResponse(
                token,
                userDetails.getUsername(),
                userDetails.getId(),
                userDetails.getRole(),
                userDetails.getCredits()
        );
    }
}
