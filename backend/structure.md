# Tripify Backend Structure

A Spring Boot 4.x application (Java 21) for trip planning and management, integrating AI-driven itineraries and location services.

```text
/
├── .mvn/                               # Maven wrapper configuration
├── src/                                # Source code
│   ├── main/
│   │   ├── java/com/vgu/tripify/
│   │   │   ├── TripifyApplication.java # Main entry point & root controller
│   │   │   ├── config/                 # Application configuration
│   │   │   │   └── RestConfig.java     # Configuration for REST clients/CORS
│   │   │   ├── controller/             # REST API Endpoints
│   │   │   │   ├── AuthController.java # Authentication (Login/Register)
│   │   │   │   ├── CreditController.java # User credit/points management
│   │   │   │   ├── PaymentController.java # Transaction & payment processing
│   │   │   │   ├── ReviewController.java # Trip/Destination reviews
│   │   │   │   ├── TripController.java # Core trip management & generation
│   │   │   │   └── UserController.java # User profile management
│   │   │   ├── domain/                 # Core domain models
│   │   │   │   ├── dto/                # Data Transfer Objects
│   │   │   │   │   ├── external/       # Mapping for third-party API responses (Gemini, etc.)
│   │   │   │   │   ├── request/        # Input payloads for API requests
│   │   │   │   │   └── response/       # Structured API response payloads
│   │   │   │   ├── entity/             # JPA Entities (Database schema mapping)
│   │   │   │   │   ├── Trip.java       # Core trip record
│   │   │   │   │   ├── User.java       # User account details
│   │   │   │   │   ├── Destination.java # Location/POI data
│   │   │   │   │   └── ...             # Other supporting entities (Review, Payment, etc.)
│   │   │   │   └── enums/              # Shared enumerations (Roles, BudgetBrackets)
│   │   │   ├── exception/              # Error handling
│   │   │   │   ├── GlobalExceptionHandler.java # Centralized API error responses
│   │   │   │   └── ...                 # Custom application exceptions
│   │   │   ├── external/               # Integration with 3rd-party services
│   │   │   │   ├── AiTripGenerator.java # Interface for AI trip logic
│   │   │   │   ├── GeminiTripGeneratorImpl.java # Google Gemini AI implementation
│   │   │   │   ├── GeocodingProvider.java # Interface for coordinate lookup
│   │   │   │   ├── NominatimGeocodingProvider.java # OpenStreetMap Nominatim implementation
│   │   │   │   ├── RoutingProvider.java # Interface for pathfinding logic
│   │   │   │   ├── OsrmRoutingProvider.java # OSRM routing implementation
│   │   │   │   └── helperClass/        # Utility classes for external integrations
│   │   │   ├── repository/             # Spring Data JPA Repositories
│   │   │   │   ├── TripRepository.java # Database operations for Trips
│   │   │   │   └── UserRepository.java # Database operations for Users
│   │   │   ├── security/               # Authentication & Authorization logic
│   │   │   │   ├── JwtTokenProvider.java # JWT generation and validation
│   │   │   │   └── JwtAuthenticationFilter.java # Security filter for JWT processing
│   │   │   └── service/                # Business logic layer
│   │   │       ├── TripService.java    # Core business logic interface
│   │   │       ├── impl/               # Service implementations
│   │   │       │   ├── TripServiceImpl.java # Logic for trip planning and management
│   │   │       │   └── ...             # Other service implementations
│   │   │       └── ...                 # Other service interfaces (User, Payment, etc.)
│   │   └── resources/                  # App configuration (application.properties, etc.)
│   └── test/                           # Unit and Integration tests
│       └── java/com/vgu/tripify/       # Test cases for services and controllers
├── docker-compose.yml                  # Infrastructure setup (PostgreSQL, etc.)
├── pom.xml                             # Maven project dependencies and build config
├── progress.md                         # Project development status and roadmap
├── testCRUD.http                       # HTTP client file for manual API testing
├── week3tasks.md                       # Task list for development week 3
└── mvnw                                # Maven wrapper executable
```

## Key Components

- **AI Integration**: Uses Google Gemini to generate dynamic travel itineraries.
- **Location Services**: Integrates with Nominatim (Geocoding) and OSRM (Routing).
- **Security**: Stateless authentication using JWT.
- **Database**: Managed via Spring Data JPA with PostgreSQL.
- **Validation**: Strict input validation using Jakarta Bean Validation.
