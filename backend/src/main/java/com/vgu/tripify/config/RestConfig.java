package com.vgu.tripify.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestConfig {

    // Spring sees this, creates the RestTemplate, and saves it in its memory.
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}