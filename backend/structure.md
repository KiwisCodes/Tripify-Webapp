# Tripify Backend Structure

A Spring Boot 4.x application (Java 21) for trip planning and management, integrating AI-driven itineraries and location services.

```text
/
├── .mvn/                               # Maven wrapper configuration
├── src/                                # Source code
│   ├── main/
│   │   ├── java/com/vgu/tripify/
│   │   │   ├── TripifyApplication.java # Main entry point
│   │   │   ├── config/                 # Application configuration
│   │   │   │   └── RestConfig.java     # Bean configuration for RestTemplate/CORS
│   │   │   ├── controller/             # REST API Endpoints
│   │   │   │   ├── AuthController.java # Authentication (Login/Register)
│   │   │   │   ├── CreditController.java # User credit management
│   │   │   │   ├── PaymentController.java # Stripe & Webhook processing
│   │   │   │   ├── ReviewController.java # Trip/Destination reviews
│   │   │   │   ├── TripController.java # Core trip generation logic
│   │   │   │   └── UserController.java # User profile management
│   │   │   ├── domain/                 # Core domain models
│   │   │   │   ├── dto/                # Data Transfer Objects
│   │   │   │   │   ├── external/       # Gemini API mapping (Records & JSON envelopes)
│   │   │   │   │   ├── request/        # Validated input payloads (Register, TripGen, etc.)
│   │   │   │   │   └── response/       # Structured API response payloads
│   │   │   │   ├── entity/             # JPA Entities (PostgreSQL mapping)
│   │   │   │   │   ├── Trip.java       # Parent entity for itineraries
│   │   │   │   │   ├── User.java       # User & Credit balance
│   │   │   │   │   ├── DayItinerary.java # One-to-Many child of Trip
│   │   │   │   │   ├── ItineraryItem.java # Individual stops/locations
│   │   │   │   │   ├── CostEstimate.java # AI-generated budget details
│   │   │   │   │   └── ...             # Review, Destination, Tip, PaymentTransaction
│   │   │   │   └── enums/              # Enumerations (BudgetBracket, CreditPackage, Role)
│   │   │   ├── exception/              # Global Error Handling
│   │   │   │   ├── GlobalExceptionHandler.java # @RestControllerAdvice for JSON errors
│   │   │   │   └── EmailAlreadyExistsException.java
│   │   │   ├── external/               # 3rd-Party Service Strategies
│   │   │   │   ├── AiTripGenerator.java # Interface for AI logic
│   │   │   │   ├── GeminiTripGeneratorImpl.java # Gemini 1.5 Flash implementation
│   │   │   │   ├── GeocodingProvider.java # Interface for Lat/Lon lookup
│   │   │   │   ├── NominatimGeocodingProvider.java # OpenStreetMap implementation
│   │   │   │   ├── RoutingProvider.java # Interface for pathfinding
│   │   │   │   ├── OsrmRoutingProvider.java # Open Source Routing Machine impl
│   │   │   │   └── helperClass/        # Coordinate and RouteResult utilities
│   │   │   ├── repository/             # Spring Data JPA Repositories
│   │   │   │   ├── TripRepository.java 
│   │   │   │   └── UserRepository.java 
│   │   │   ├── security/               # Security & Identity
│   │   │   │   ├── JwtTokenProvider.java # JWT generation/validation
│   │   │   │   ├── JwtAuthenticationFilter.java # Stateless filter
│   │   │   │   ├── SecurityConfig.java # SecurityFilterChain & @Lazy injection
│   │   │   │   └── CustomUserDetailService.java # DB-to-Security bridge
│   │   │   └── service/                # Business Logic Layer
│   │   │       ├── TripService.java    
│   │   │       ├── impl/               # Implementations
│   │   │       │   ├── TripServiceImpl.java # "Stitching" AI DTOs to JPA Entities
│   │   │       │   ├── StripePaymentServiceImpl.java # Secure Stripe Webhook logic
│   │   │       │   └── ...             # AuthService, CreditService, UserServiceImpl
│   │   └── resources/                  
│   └── test/                           
│       └── java/com/vgu/tripify/       # TripServiceImplTest, ApplicationTests
├── docker-compose.yml                  # Postgres 15 & pgAdmin orchestration
├── pom.xml                             # Java 21, Spring Boot 4.0.4, Lombok, Stripe
├── interview.md                        # Technical deep-dive & interview prep guide
├── progress.md                         # Roadmap and task tracking
└── testCRUD.http                       # Manual REST testing suite
```

## Architecture & Integration Highlights

- **Monolith / Layered Architecture**: Clear separation of Web, Service, Data, and Security layers.
- **AI Engine**: Gemini 1.5 Flash integration using Prompt Discipline and Jackson Record parsing.
- **Strategy Pattern**: Used for Geocoding and Routing to ensure system extensibility.
- **Stripe Payments**: Webhook-based asynchronous credit fulfillment with signature verification.
- **Modern Stack**: Java 21 (Records, Text Blocks), Spring Boot 4.x, and Dockerized Infrastructure.
