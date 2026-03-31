package com.vgu.tripify.domain.dto.response;

import com.vgu.tripify.domain.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import java.util.List;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private Long userId;
    private Role role;
    private int remainingCredit;
}


