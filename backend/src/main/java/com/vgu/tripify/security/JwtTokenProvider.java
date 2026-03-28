package com.vgu.tripify.security;

import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {



    public String generateJwtToken(String username, String password) {
        return "";
    }
    public Long extractUserIdFromJwtToken(String token) {
        return null;
    }

    public boolean isTokenValid(String token) {
        return false;
    }
}
