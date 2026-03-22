package com.vgu.tripify.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateUserRequest {
    @NotBlank(message = "Name cannot be null")
    private String firstName;

    @NotBlank(message = "Name cannot be null")
    private String lastName;

    @NotBlank(message = "Must have a currency")
    private String preferredCurrency;

}
