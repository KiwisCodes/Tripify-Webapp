# Week 2 Review vs. MVP Scope

Looking at your `progress.md`, you have successfully established the foundation for the **Spring Architecture** and **Database & JPA** rubric criteria. Hưng has the core Trip domain ready, and Hoàng has laid the groundwork for User and credits.

Right now, your controllers are returning mock data and using a "mock-register." To stay on track for your MVP and hit the grading criteria, Phase 3 needs to tackle the highest-risk integrations: **Security (JWT), AI (Gemini), and Payments (Stripe).**

Since you want to focus strictly on the backend this week and ensure tasks are completely independent, here is your Scrum plan.

---

## Week 3 Scrum Tasks: High-Risk Backend Integrations
*These tasks are designed so that Hưng and Hoàng can work in parallel without blocking each other.*

### Task 1 (Hoàng): Security & Auth Foundation
* **Title:** Implement JWT Authentication & BCrypt Hashing
* **User Story:** As a user, I want to securely register and log in so that my account and trip data are protected.
* **Acceptance Criteria:**
  1. Add Spring Security and JWT dependencies to `pom.xml`.
  2. Update the `UserController` to replace mock-register with a real endpoint that hashes passwords using `BCryptPasswordEncoder` before saving to the DB.
  3. Create a Login endpoint that authenticates the user and returns a signed JWT.
  4. Implement a JWT Filter to secure the `/api/trips` and `/api/users/{id}/credits` endpoints.
* **Rubric Check:** Ensure strictly layered architecture using `@RequiredArgsConstructor` for dependency injection.

---

### Task 2 (Hưng): AI Strategy Pattern & Integration
* **Title:** Implement Gemini API Integration via Strategy Pattern
* **User Story:** As a user, I want to submit a destination and budget to receive an AI-generated trip itinerary.
* **Acceptance Criteria:**
  1. Create an `AiTripGenerator` interface (satisfying the **Strategy Pattern** rubric requirement).
  2. Create `GeminiTripGeneratorImpl` that implements this interface and uses `RestTemplate` or `WebClient` to call the Gemini API.
  3. Pass a hardcoded or simple prompt to Gemini, and successfully parse the JSON response into your Java `DayItinerary` DTOs.
  4. Save the parsed DTOs into the database using your existing `TripRepository`.
* **Independence Note:** You do not need Hoàng's JWT setup for this. You can temporarily bypass security for your specific test endpoint or use a hardcoded User ID.

---

### Task 3 (Hoàng or Hưng): Stripe Webhook Receiver
* **Title:** Implement Stripe Webhook Listener & Transaction Logic
* **User Story:** As a system, I want to securely listen for Stripe payment confirmations so that I can automatically upgrade a user's role or credit balance.
* **Acceptance Criteria:**
  1. Create a `PaymentProcessor` interface (Strategy Pattern).
  2. Expose a POST endpoint (e.g., `/api/webhooks/stripe`) that accepts Stripe events.
  3. Implement logic to verify the Stripe webhook signature (to prevent fake requests).
  4. Update the User entity's credits and save a `PaymentTransaction` record.
* **Rubric Check:** Use `@Transactional` on the service method handling the webhook.