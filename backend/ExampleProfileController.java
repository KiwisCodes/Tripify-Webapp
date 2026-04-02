package com.vgu.tripify.controller;

import com.vgu.tripify.security.CustomUserDetails;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/examples")
public class ExampleProfileController {

    /**
     * GET Request
     * Getting the user's own profile data without needing them to pass an ID in the URL.
     */
    @GetMapping("/profile")
    public ResponseEntity<String> getMyProfile(
            @AuthenticationPrincipal CustomUserDetails currentUser) {
            
        // 1. Extract the ID from the authenticated principal
        Long userId = currentUser.getId(); 
        
        // 2. Use it to fetch data from your service
        // return userService.getUserProfileById(userId);
        
        return ResponseEntity.ok("Fetching profile data for User ID: " + userId);
    }

    /**
     * POST Request
     * Creating a new resource (like a Review or a Trip) tied directly to the user.
     * The frontend only sends the content; the backend securely assigns the author.
     */
    @PostMapping("/reviews")
    public ResponseEntity<String> createReview(
            @RequestBody String reviewContent, 
            @AuthenticationPrincipal CustomUserDetails currentUser) {
            
        Long userId = currentUser.getId(); 
        
        // return reviewService.createReview(userId, reviewContent);
        
        return ResponseEntity.ok("User ID " + userId + " successfully created a review.");
    }

    /**
     * PUT Request
     * Updating user preferences or details. Again, no /api/users/{id} is strictly 
     * needed for self-updates because the token already proves who they are.
     */
    @PutMapping("/profile")
    public ResponseEntity<String> updateMyProfile(
            @RequestBody String updateRequestDto, 
            @AuthenticationPrincipal CustomUserDetails currentUser) {
            
        Long userId = currentUser.getId();
        
        // return userService.updateProfile(userId, updateRequestDto);
        
        return ResponseEntity.ok("Successfully updated profile for User ID: " + userId);
    }
}
