package com.vgu.tripify.controller;

import com.vgu.tripify.domain.dto.request.LoginRequest;
import com.vgu.tripify.domain.dto.request.RegisterRequest;
import com.vgu.tripify.domain.dto.response.AuthResponse;
import com.vgu.tripify.domain.dto.response.UserResponse;
import com.vgu.tripify.domain.entity.User;
import com.vgu.tripify.repository.UserRepository;
import com.vgu.tripify.security.JwtTokenProvider;
import com.vgu.tripify.service.UserService;
import com.vgu.tripify.service.impl.AuthService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

//    private final AuthenticationManager authenticationManager;
//    private final UserDetailsService userDetailsService;
//    private final JwtTokenProvider jwtTokenProvider;
//    private final UserRepository userRepository;
    private final UserService userService;
    private final AuthService authService;

//    @PostMapping("/login")
//    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request){
//        authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
//        );
//        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
//        String token = jwtTokenProvider.generateJwtToken(userDetails);
//        User user = userRepository.findByEmail(userDetails.getUsername())
//                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + request.getEmail()));;
//
//        return ResponseEntity.ok(new AuthResponse(token,user.getEmail(), user.getId(), user.getRole(), user.getCredits()));
//    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        AuthResponse response = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/register")
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody RegisterRequest request) {
        // Pass the DTO request to userService
        UserResponse createdUser = userService.register(request);
        // Return 201 Created status and the safe UserResponse DTO
        return ResponseEntity.ok().body(createdUser);
    }

}
