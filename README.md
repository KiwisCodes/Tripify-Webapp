# Tripify WebApp

Tripify is a full-stack AI-driven travel planning application. It allows users to generate, visualize, and manage personalized travel itineraries, complete with budget estimates, day-by-day plans, and interactive map visualizations.

## Key Features

- **AI Itinerary Generation**: Leverages Google Gemini to create detailed daily travel plans.
- **Interactive Mapping**: Visualizes destinations and routes using Leaflet.js.
- **User Management**: Secure authentication with JWT.
- **Credit-Based System**: Monetizable itinerary generation with Stripe integration.
- **Budget & Trip Planning**: Customizable trips based on budget and duration.

## Tech Stack

### Backend
- **Framework**: Java 21, Spring Boot 3.x
- **Database**: PostgreSQL
- **Security**: Spring Security (JWT, BCrypt)
- **Payments**: Stripe
- **AI/External APIs**: Google Gemini (AI), Nominatim (Geocoding), OSRM (Routing)

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS
- **Maps**: Leaflet.js
- **State/Auth**: LocalStorage & Axios Interceptors

---

## Prerequisites

- **Java**: JDK 21+
- **Node.js**: v20+
- **PostgreSQL**: 15+
- **Build Tools**: Maven (wrapper included) & npm/pnpm

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd Tripify-Webapp
```

### 2. Backend Setup
1.  Navigate to the backend folder: `cd backend`
2.  Ensure PostgreSQL is running.
3.  Configure `backend/src/main/resources/application.properties` with your database credentials.
4.  Run the application: `./mvnw spring-boot:run`

### 3. Frontend Setup
1.  Navigate to the frontend folder: `cd frontend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file (`frontend/.env`) and add:
    ```text
    VITE_API_URL=http://localhost:8080/api
    ```
4.  Start the development server: `npm run dev`

---

## Architecture Overview

### Directory Structure

```text
Tripify-Webapp/
├── backend/
│   ├── src/main/java/com/vgu/tripify/
│   │   ├── config/      # RestConfig, SecurityConfig
│   │   ├── controller/  # Auth, Trip, Payment, User
│   │   ├── domain/      # DTOs, Entities, Enums
│   │   ├── external/    # AI/Geocoding Providers
│   │   ├── repository/  # Database access
│   │   └── service/     # Business logic
│   └── src/main/resources/
└── frontend/
    ├── src/
    │   ├── api/         # Axios instance
    │   ├── components/  # Reusable UI components
    │   ├── hooks/       # Custom React hooks
    │   └── pages/       # Dashboard, Login, Register, Home
```

### Request Lifecycle
1. Frontend calls `api` (Axios instance).
2. Request passes through `JwtAuthenticationFilter` on the backend.
3. Controller delegates business logic to Service.
4. Service interacts with Repository (JPA) and External API providers (Gemini/OSRM).
5. Data is mapped to DTOs and returned as JSON.

---

## Environment Variables

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| `VITE_API_URL` | Frontend link to backend API |
| `STRIPE_API_KEY` | Secret key for payment processing |
| `GEMINI_API_KEY` | API Key for AI itinerary generation |

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `backend/mvnw spring-boot:run` | Start Spring Boot server |
| `frontend/npm run dev` | Start React development server |
| `frontend/npm run build` | Build frontend for production |

---

## Troubleshooting

- **CORS Issues**: Ensure `http://localhost:5173` is allowed in your backend `RestConfig.java`.
- **400 Bad Request**: Verify that your JSON payload matches the structure of the DTO (e.g., ensure no extra fields like `name` if not expected).
- **Database Connection**: Ensure `POSTGRES_HOST`, `PORT`, etc., are correctly set in your environment.
