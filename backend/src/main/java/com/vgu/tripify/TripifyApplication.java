package com.vgu.tripify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class TripifyApplication {

    public static void main(String[] args) {
        SpringApplication.run(TripifyApplication.class, args);
        System.out.println("Hello World");
    }

    @GetMapping
    public String helloWorld() {
        return "Hello World Spring Boot 3636";
    }

}
