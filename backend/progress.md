# Project Progress: Tripify

## Week 2: Foundation & API Design (Completed)
- **Domain Architecture**: Established core Entities (`User`, `Trip`, `Destination`, etc.) and DTOs for safe data transfer.
- **Validation**: Integrated Jakarta Validation for incoming requests.
- **Skeleton Layer**: Defined Service and Repository interfaces.

## Week 3: The "Engine" Phase (In Progress)

### **1. User & Identity Management**
- [x] Basic Registration logic (saving users to DB).
- [x] Profile update functionality.
- [ ] **TODO**: Password encryption (BCrypt).
- [ ] **TODO**: JWT Implementation (currently skeleton).
- [ ] **TODO**: Login endpoint logic.

### **2. Trip & AI Engine**
- [x] Basic `TripServiceImpl` (persisting trip metadata).
- [ ] **TODO**: `GeminiItineraryProvider` implementation (AI logic).
- [ ] **TODO**: `Geocoding` & `Routing` integration (Maps API).
- [ ] **TODO**: Complete mapping of AI response to `ItineraryItem` entities.

### **3. Credit System**
- [ ] **TODO**: Implement credit deduction logic.
- [ ] **TODO**: Logic for checking credit balance before trip generation.

---

## **👨‍💻 Senior Developer's Perspective (Room for Improvement)**

### **1. Security & Data Integrity**
- **Password Safety**: NEVER store plain text passwords. Integrating `BCryptPasswordEncoder` should be the absolute priority before any more user logic is written.
- **Transaction Management**: I noticed the lack of `@Transactional` annotations in services. Without this, database operations that fail halfway (e.g., deducting credit but failing to save the trip) will leave the data in a "dirty" state.
- **Input Validation**: While DTOs have constraints, ensure that email existence checks are case-insensitive and properly handled with custom exceptions (like `EmailAlreadyExistsException` which I see you've started).

### **2. Code Quality & Maintainability**
- **DTO Mapping**: The manual `set/get` between Entities and DTOs in the service layer is already becoming noisy. I recommend using **MapStruct** to automate this. It keeps the business logic focused.
- **Hardcoding**: Default credits and external URLs are hardcoded. Move these to `application.properties` using `@ConfigurationProperties` for better environment management (Dev vs. Prod).
- **Error Handling**: Replace `RuntimeException` with a structured hierarchy of business exceptions. The current `GlobalExceptionHandler` is a good start but needs more specific handlers.

### **3. External API Resilience**
- **Fault Tolerance**: When integrating Gemini or OSRM, don't just use a simple HTTP call. Use `WebClient` and wrap them in **Resilience4j** (Retries/Circuit Breakers). If the AI is slow or down, the whole system shouldn't hang.
- **Mocking**: For Week 3, we need a "Mock Provider" for AI results so Developer B can work on the Credit system without waiting for the real AI API to be ready.

### **4. Testing Strategy**
- **Missing Tests**: We have the architecture, but zero business logic tests. We need **JUnit 5** and **Mockito** tests for `UserService` and `CreditService` immediately.

---
*Status: Skeleton is ready. Moving into high-risk logic. Priority: Security & Transactional integrity.*

Key takeaways from my review:
1. The Foundation is solid: Your DTO/Entity separation and service-layer abstraction are well-structured for scalability.
2. Critical Security Debt: We are currently storing plain-text passwords and have skeleton JWT logic. As a priority, we need to integrate BCrypt and finalize the security filter
   chain before this touches any production-like environment.
3. Engine Readiness: While TripServiceImpl is saving metadata, the AI "brain" (GeminiItineraryProvider) and the credit deduction logic are the next major hurdles.
