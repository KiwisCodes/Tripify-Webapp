# Week 3 Tasks: The "Engine" Phase

This week, we move from the **Skeleton** (DTOs/Interfaces) to the **Engine** (Business Logic).

---

## **Assignee: Developer A (The "AI & Maps" Expert)**
*Focus: Implementing external integrations and core Trip generation.*

### **1. AI Itinerary Generation**
- **Implement `GeminiItineraryProvider.java`**: 
    - Write the logic to call Google's Gemini API.
    - Parse the AI's response into the `TripDetailResponse` structure.
- **Service Logic**: 
    - Complete `TripServiceImpl.generateTrip()`.
    - Handle edge cases (e.g., if the AI fails, return a friendly error).

### **2. Geocoding & Routing**
- **Implement `NominatimGeocodingProvider`**:
    - Add logic to convert the "Destination City" string into latitude/longitude coordinates.
- **Implement `OsrmRoutingProvider`**:
    - Add logic to calculate travel times between itinerary items (e.g., "15 mins drive from Point A to Point B").

### **3. Data Storage**
- **Save Generated Trip**: 
    - Ensure the AI-generated itinerary is correctly saved as a `Trip` entity in the database.
    - Map the generated data from the AI back to `ItineraryItem` entities.

---

## **Assignee: Developer B (The "Security & Core Logic" Expert)**
*Focus: User management, credits, and database operations.*

### **1. Authentication & Security**
- **Complete `AuthService` & `AuthController`**:
    - Implement `register()` and `login()` logic.
    - Secure the `/api/trips` endpoints so only logged-in users can access them.
- **Password Security**:
    - Ensure passwords are encrypted using `BCrypt` before being saved to the database.

### **2. Credit System Implementation**
- **Implement `CreditServiceImpl.deductCredit()`**:
    - Logic to check if a user has enough credits (1 credit = 1 trip).
    - Throw an error if they have 0 credits.
- **Implement `CreditServiceImpl.getCredit()`**:
    - Return the user's current balance to the frontend.

### **3. User Management**
- **Complete `UserServiceImpl`**:
    - Implement `getUserById()` with proper mapping to `UserResponse` DTO (following the example Hvu left).
    - Implement `updatePersonalDetail()` for profile updates.

---

### **Week 3 Goal:** 
By the end of the week, we should be able to:
1. Log in.
2. Request a 3-day trip to "Paris".
3. See a real AI-generated response saved in our database.
4. Have 1 credit deducted from the user profile.
