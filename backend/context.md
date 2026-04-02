
# Tripify — Project Context for AI Continuation

## 1. Project Overview

**Tripify** is a full-stack AI-powered travel planning web application.
The app allows users to:
- Input a destination city, budget bracket, and vacation length
- Receive an AI-generated daily itinerary with tourist attractions, food places, and hotels
- View their route on an interactive map with GPS pins and polylines
- See an estimated cost breakdown (exportable as an Excel sheet)
- Write reviews and upload photos to earn credits
- Pay for premium credits via Stripe to generate more trips
- Collaborate with friends on trip planning in real-time

The backend is built with **Java 21 + Spring Boot 3.x**, the frontend with **React 18 + Vite**,
and the database is **PostgreSQL 15+**.

---

## 2. Technology Stack

### Backend
- Java 21 + Spring Boot 3.x
- Spring Security (JWT-based authentication)
- Spring Data JPA + Hibernate (ORM)
- Spring WebSocket + STOMP (real-time collaborative editing)
- Spring Mail (email notifications)
- Spring Retry (retry logic for external APIs)
- RabbitMQ (background jobs: weather monitoring, email queue)
- Redis (caching routes/LLM responses, distributed locking for credits)
- Apache POI (Excel/CSV export for cost estimation)
- Lombok (boilerplate reduction: @Data, @AllArgsConstructor, etc.)
- Maven (dependency management)

### External APIs (all free tier)
- Google Gemini API — LLM for itinerary generation
- OpenStreetMap Nominatim — geocoding (place name -> coordinates)
- OSRM (Open Source Routing Machine) — road routing, travel times, polylines
- OpenRouteService — alternative routing + isochrones
- OpenWeatherMap API — weather-based route recalculation
- Foursquare Places API — restaurant/POI discovery with price tiers
- Wikivoyage API — city travel tips, transport guides
- Overpass API (OSM) — raw POI data (opening hours, entry fees)
- Travelpayouts / Makcorps — hotel pricing affiliate API
- Stripe — payment processing for credit upgrades
- Cloudinary / AWS S3 — user photo uploads
- Brevo (Sendinblue) — email notifications (free 300/day)

### Frontend
- React 18 + Vite
- Leaflet.js (interactive maps with route polylines)
- React Query / SWR (API caching, optimistic updates)
- Tailwind CSS or Material-UI
- React Hook Form + Zod (form validation)
- STOMP/WebSocket client (collaborative editing)

### DevOps
- Docker + Docker Compose (local development)
- GitHub Actions (CI/CD)
- Railway / Render (deployment, free tier)
- JUnit 5 + Mockito (unit testing)

---

## 3. User Stories (MoSCoW)

### Must-Have (MVP)
1. **Register/Login:** Email + password, BCrypt hashing, JWT issued on login,
   new users get Role=FREE and 5 credits by default.
2. **AI Trip Generation:** Form with city, days, budget -> call Gemini API ->
   parse response -> save to DB. Deducts 1 credit per generation.
   Graceful fallback if Gemini times out (@ControllerAdvice).
3. **Stripe Payment:** User buys premium credits via Stripe Checkout.
   Stripe Webhook updates user role to PREMIUM in a @Transactional method.
4. **Trip Dashboard:** List of saved trips + estimated cost breakdown
   (Excel-like table). Access control: only owner or ADMIN can view.

### Should-Have
5. **Interactive Map:** Leaflet.js map with pins per POI, route polylines,
   full-screen toggle.
6. **Reviews System:** Text review tied to User and Destination (3NF).

### Could-Have
7. **Gamified Photo Uploads:** Upload photo/review -> earn +2 credits
   (requires AWS S3 + @Transactional credit reward).
8. **Public Transport Tips:** AI provides subway/bus guidance per city.
9. **Dynamic Budget Shifting:** Swap activities if user changes budget bracket.

---

## 4. Package / Folder Structure

```
com.vgu.tripify
├── config/               - Spring Security config, Redis config, RabbitMQ config
├── controller/           - HTTP layer, receives requests, returns responses
├── service/
│   └── impl/             - Business logic implementations
├── repository/           - JPA interfaces extending JpaRepository
├── domain/
│   ├── entity/           - JPA @Entity classes (database tables)
│   ├── enums/            - Role, BudgetBracket, PlaceType
│   └── dto/
│       ├── request/      - DTOs for data coming IN from frontend
│       └── response/     - DTOs for data going OUT to frontend
├── external/
│   ├── gemini/           - Google Gemini API request/response DTOs + implementation
│   ├── maps/             - Coordinate.java, RouteResult.java, OSRM + Nominatim implementations
│   └── stripe/           - Stripe checkout integration
├── security/             - JwtTokenProvider, JwtAuthenticationFilter
└── exception/            - GlobalExceptionHandler + custom exception classes
```

---

## 5. Domain Entities (Database Tables)

### `User.java`
```java
@Entity @Table(name = "users")
- Long id (PK)
- String email
- String passwordHash (BCrypt)
- Role role (FREE / PREMIUM / ADMIN)
- Integer credits (default: 5)
- List<Trip> trips
- List<Review> reviews
```

### `Trip.java`
```java
@Entity @Table(name = "trips")
- Long id (PK)
- User user (@ManyToOne - the owner)
- Destination destination (@ManyToOne)
- Integer durationDays
- BudgetBracket budgetBracket (LOW / MEDIUM / HIGH)
- LocalDateTime createdAt
- List<DayItinerary> itineraries (@OneToMany, cascade = ALL)
- CostEstimate costEstimate (@OneToOne, cascade = ALL)
```

### `DayItinerary.java`
```java
@Entity @Table(name = "day_itineraries")
- Long id (PK)
- Trip trip (@ManyToOne)
- Integer dayNumber (1, 2, 3...)
- List<ItineraryItem> items (@OneToMany, cascade = ALL)
```

### `ItineraryItem.java`
```java
@Entity @Table(name = "itinerary_items")
- Long id (PK)
- DayItinerary itinerary (@ManyToOne)
- String placeName
- String placeType (ATTRACTION / FOOD / HOTEL)
- String description
- Double latitude
- Double longitude
- String suggestedTime (e.g., "09:00 AM")
- String tips
- Integer orderIndex (sequence in the day)
```

### `CostEstimate.java`
```java
@Entity @Table(name = "cost_estimates")
- Long id (PK)
- Trip trip (@OneToOne)
- BigDecimal hotelPerNight
- BigDecimal foodPerDay
- BigDecimal activitiesPerDay
- BigDecimal transportPerDay
- BigDecimal totalEstimated
- String currency (e.g., "VND")
```

### `Destination.java`
```java
@Entity @Table(name = "destinations")
- Long id (PK)
- String cityName
- String country
- Double latitude
- Double longitude
- List<Review> reviews
```

### `Review.java` (3NF: User -> Review <- Destination)
```java
@Entity @Table(name = "reviews")
- Long id (PK)
- User user (@ManyToOne)
- Destination destination (@ManyToOne)
- String content
- Integer rating (1-5)
- LocalDateTime createdAt
- List<ReviewPhoto> photos
```

### `PaymentTransaction.java`
```java
@Entity @Table(name = "payment_transactions")
- Long id (PK)
- User user (@ManyToOne)
- String stripePaymentIntentId
- BigDecimal amount
- String status (PENDING / SUCCESS / FAILED)
- LocalDateTime createdAt
```

### Enums
```java
enum Role { FREE, PREMIUM, ADMIN }
enum BudgetBracket { LOW, MEDIUM, HIGH }
enum PlaceType { ATTRACTION, FOOD, HOTEL, TRANSPORT }
```

---

## 6. Service Interfaces (Segregated per ISP/SOLID)

```java
// Business services
UserService        - register, getUserById, updatePersonalDetails
CreditService      - deductCredit, rewardCredit, getBalance (uses @Lock for race conditions)
TripService        - generateTrip, getTripById, getUserTrips
ItineraryExportService - exportToExcel (uses Apache POI)
ReviewService      - createReview, getReviewsByDestination
PaymentService     - getProviderName, createPayment (Strategy Pattern for multi-provider)

// External provider interfaces
AiItineraryProvider   - generate(AiItineraryRequest) -> AiItineraryResponse
GeocodingProvider     - geocode(String placeName) -> Coordinate
RoutingProvider       - getRoute(List<Coordinate> waypoints) -> RouteResult
```

### Strategy Pattern for Payments
Multiple payment implementations (Stripe, PayPal, VietQR) all implement `PaymentService`.
A `PaymentFactory` class (@Component) is injected with `List<PaymentService>` by Spring Boot
and builds a Map<String, PaymentService> at startup.
The Controller calls `paymentFactory.getPaymentService("STRIPE")` dynamically.
Adding a new provider (e.g., MoMo) requires ONLY creating a new @Service class — no
modification to existing Controller or Factory code (Open-Closed Principle).

---

## 7. Service Implementations

### `TripServiceImpl` — Core Orchestration
The most complex service. It orchestrates all external providers:
1. Build a prompt string (city, days, budget).
2. Call `AiItineraryProvider.generate()` -> get list of place names from Gemini.
3. For each place name, call `GeocodingProvider.geocode()` -> get Coordinate from Nominatim.
4. Collect all Coordinates into a `List<Coordinate>`.
5. Call `RoutingProvider.getRoute(waypoints)` -> get `RouteResult` from OSRM.
6. Call `CreditService.deductCredit(userId, 1)` with Pessimistic Locking.
7. Build and save `Trip`, `DayItinerary`, `ItineraryItem`, `CostEstimate` entities.
8. Return `TripDetailResponse` DTO.

### `CreditServiceImpl` — Race Condition Prevention
Uses `@Lock(LockModeType.PESSIMISTIC_WRITE)` on the User row before deducting
to prevent two simultaneous requests from both succeeding with only 1 credit remaining.

---

## 8. DTOs (Data Transfer Objects)

### Request DTOs (Frontend -> Backend)
```
RegisterRequest       - email (@Email), password (@Size min=8)
TripGenerationRequest - destinationCity (@NotBlank), durationDays (@Min 1 @Max 14),
                        budgetBracket (@Pattern LOW|MEDIUM|HIGH)
UpdateUserRequest     - firstName, lastName, preferredCurrency (no credits field)
CreateReviewRequest   - destinationId, rating (@Min 1 @Max 5), content (@Size max=1000), 
                        photoUrls (List<String>). userId is NOT here; extracted from JWT.
```

### Response DTOs (Backend -> Frontend)
```
AuthResponse          - token (JWT), email, role, remainingCredits
UserResponse          - email, remainingCredits, role (NO password)
TripSummaryResponse   - id, destinationCity, durationDays, createdAt (for list view)
TripDetailResponse    - id, destinationCity, budgetBracket, 
                        List<DailyItineraryDto>, CostEstimateDto (for single trip view)
DailyItineraryDto     - dayNumber, dayTheme, List<ItineraryItemDto>
ItineraryItemDto      - time, placeName, placeType, description, travelTips, 
                        latitude, longitude, orderIndex
CostEstimateDto       - hotelPerNight, foodPerDay, activitiesPerDay, 
                        transportPerDay, totalEstimatedCost, currency (BigDecimal)
ReviewResponse        - id, authorName, rating, content, createdAt, photoUrls
CheckoutResponse      - sessionId, checkoutUrl (React does window.location.href = checkoutUrl)
```

---

## 9. External Classes

### `Coordinate.java`
Helper class in `external/maps/`. Holds latitude and longitude.
Has a `toOsrmString()` helper method that formats "lon,lat" as required by OSRM API.
Used inside the TripServiceImpl loop when converting place names to coordinates.
NOT used in the ItineraryItem entity (that uses raw Double latitude/longitude for simplicity).

### `RouteResult.java`
Catches the response from the OSRM API. Contains:
- `code` (e.g., "Ok" or "NoRoute")
- `List<OsrmRoute> routes` (nested: distance in meters, duration in seconds, geometry polyline)
- `getFastestDurationSeconds()` helper method.
  The `geometry` string is passed to the React frontend for Leaflet.js to draw the route line.

### `AiItineraryRequest.java`
Wraps the user's prompt into the exact JSON structure Google Gemini requires:
`{ "contents": [{ "parts": [{ "text": "..." }] }] }`

### `AiItineraryResponse.java`
Parses Gemini's response. Contains nested Candidate -> Content -> Part structure.
Has a `getExtractedText()` helper method to dig through nesting and return the raw JSON string.

---

## 10. Security Architecture

- `JwtTokenProvider` — generates JWT on login, validates JWT on each request.
- `JwtAuthenticationFilter` (extends OncePerRequestFilter) — intercepts every request,
  reads the Authorization header, validates the token, and sets the user identity.
- `GlobalExceptionHandler` (@RestControllerAdvice) — centralizes all error handling:
    - TripNotFoundException -> 404
    - AccessDeniedException -> 403
    - InsufficientCreditsException -> 402
    - AiProviderException -> 503
    - StripeWebhookException -> 400

---

## 11. Architectural Principles Applied

- **SRP:** Controllers only receive/return HTTP. Services only do business logic.
  Repositories only talk to the database. No mixing of responsibilities.
- **OCP:** Strategy Pattern for PaymentService. New providers added without changing
  existing code. Same principle for AiItineraryProvider and RoutingProvider.
- **LSP:** All implementations can replace their interfaces without breaking behavior.
- **ISP:** Services split into focused interfaces (UserService, CreditService, TripService)
  rather than one giant God Service.
- **DIP:** Controllers depend on interfaces, not concrete implementations.
  Spring Boot injects the correct concrete class at runtime.

---

## 12. Request Lifecycle (Full Flow)

1. React sends `POST /api/trips/generate` with JWT in Authorization header + TripRequest JSON body.
2. Tomcat (embedded server) receives the HTTP request on port 8080.
3. JwtAuthenticationFilter validates the token, extracts userId, sets security context.
4. TripController @Valid validates the TripGenerationRequest DTO.
5. TripController calls TripService.generateTrip(userId, request).
6. TripServiceImpl calls Gemini (via AiItineraryProvider) for place names.
7. TripServiceImpl loops, calls Nominatim (via GeocodingProvider) for each Coordinate.
8. TripServiceImpl calls OSRM (via RoutingProvider) with the full List<Coordinate>.
9. TripServiceImpl calls CreditService.deductCredit() with Pessimistic Lock.
10. TripServiceImpl saves all entities to PostgreSQL via repositories.
11. TripServiceImpl maps the saved entity to a TripDetailResponse DTO.
12. TripController wraps it in ResponseEntity.ok() and returns to Tomcat.
13. Tomcat sends the HTTP 200 response with the JSON body back to React.

---

## 13. What Is Left To Build

The following methods currently return `null` (stub implementations):
- `TripServiceImpl.generateTrip()` — needs Gemini + Nominatim + OSRM integration
- `TripServiceImpl.getUserTrips()` — needs repository call + mapping to TripSummaryResponse
- `OsrmRoutingProvider.getRoute()` — needs RestTemplate HTTP call to OSRM
- `NominatimGeocodingProvider.geocode()` — needs RestTemplate HTTP call to Nominatim
- `GeminiItineraryProvider.generate()` — needs RestTemplate HTTP call to Gemini API
- `AiItineraryProvider` interface — needs correct method signature fixed
  (currently references itself instead of returning AiItineraryResponse)
- Stripe webhook handler — needs Stripe SDK integration + @Transactional role upgrade
- CreditService — needs Pessimistic Lock implementation
- ItineraryExportService — needs Apache POI Excel generation
- ReviewService — needs basic CRUD + S3 photo URL storage
