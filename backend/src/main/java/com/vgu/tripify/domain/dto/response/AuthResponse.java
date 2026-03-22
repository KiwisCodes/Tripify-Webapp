package com.vgu.tripify.domain.dto.response;

import lombok.Data;
import java.util.List;

@Data
public class AuthResponse {
    private String token;
    private String email;
    private String role;
    private int remainingCredit;
}


