package com.vgu.tripify.domain.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data // lombok: auto generate getter and setter and constructor
public class RegisterRequest {
    @NotBlank(message = "Email cannot be empty")
    @Email(message = "Must be a valid email format")
    private String email;

    @NotBlank(message = "Password cannot be empty")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    private String password;
}

