# Week 5: Full-Stack Authentication Integration Guide

This guide details how to securely connect your React frontend to your Spring Boot backend. 

---

## 1. Core Concepts & Terminology

### A. CORS (Cross-Origin Resource Sharing)
*   **What it is:** A browser security feature.
*   **Why it exists:** Prevents a website running on `Origin A` from making malicious requests to `Origin B`.
*   **Why we need it:** Your React app and Spring Boot API usually run on different origins during development. Without CORS, the browser blocks the connection by default.
*   **The Pattern:** The backend must explicitly whitelist the frontend origin.

### B. Environment Variables (The Key to Deployment)
*   **The Problem:** Hardcoding `http://localhost:8080` makes your app break when deployed.
*   **The Solution:** Use environment variables. During development, they point to `localhost`. During production (on Vercel/Render), you override them in the dashboard to point to your live URL.
*   **Vite Pattern:** Variables must be prefixed with `VITE_` (e.g., `VITE_API_URL`) to be exposed to the frontend.

### C. Axios Interceptors
*   **Request Interceptor:** Automatically adds the JWT token from `localStorage` to the `Authorization` header of every outgoing request.
*   **Response Interceptor:** Watches for `401 Unauthorized` errors. If found, it clears the token and redirects the user to login, handling expired sessions gracefully.

### D. Spring MVC & Beans
*   **@Configuration & @Bean:** Allows you to define objects (like `RestTemplate` or `WebMvcConfigurer`) that Spring manages and injects into your services automatically.
*   **@Value:** A way to inject configuration values from `application.properties` into your Java variables, making your code environment-agnostic.

---

## 2. Backend Implementation (Spring Boot)

### Step 1: Configure Dynamic CORS in `RestConfig.java`
Update your configuration to allow cross-origin requests using a dynamic property.

**File:** `backend/src/main/java/com/vgu/tripify/config/RestConfig.java`

```java
@Configuration
public class RestConfig {

    // Inject frontend URL from application.properties
    @Value("${app.frontend.url}")
    private String frontendUrl;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    // CORS configuration to trust the frontend based on the dynamic URL
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(frontendUrl) 
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

**File:** `backend/src/main/resources/application.properties`
Add this property:
```properties
app.frontend.url=http://localhost:5173
```

---

## 3. Frontend Implementation (React)

### Step 2: Configure Centralized API Client
Use `axios` for all backend requests. This centralizes URL configuration and authentication handling.

**File:** `frontend/src/api/axios.js`

```javascript
import axios from 'axios';

const api = axios.create({
  // Vite looks for the VITE_API_URL in .env (or environment variables in production)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

// Request Interceptor: Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Optional (Redirect on session expire)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**File:** `frontend/.env`
```text
VITE_API_URL=http://localhost:8080/api
```

---

## 4. Implementation Logic

### Step 3: Connect Pages to API
Import the `api` client and use it for authentication.

**Register Logic (`frontend/src/pages/Register.jsx`):**
```javascript
import api from "../api/axios";

// Inside Register.jsx:
const handleSubmit = async (e) => {
  e.preventDefault();
  // ... validation ...
  try {
    await api.post('/auth/register', { 
        name: formData.fullName, 
        email: formData.email, 
        password: formData.password 
    });
    alert("Registration successful!");
    navigate("/login");
  } catch (err) {
    setError(err.response?.data?.message || "Registration failed.");
  }
};
```

**Login Logic (`frontend/src/pages/Login.jsx`):**
```javascript
import api from "../api/axios";

// Inside Login.jsx:
const handleSubmit = async (e) => {
  e.preventDefault();
  // ... validation ...
  try {
    const res = await api.post('/auth/login', formData);
    // JWT received from backend is stored in localStorage
    localStorage.setItem('token', res.data.token);
    navigate("/dashboard");
  } catch (err) {
    setError("Invalid email or password.");
  }
};
```

---

## 5. Deployment Readiness

1.  **Git Safety:** Ensure `.env` is added to your `.gitignore` to prevent secret/config leaks.
2.  **Environment Variables:** On your hosting platform (Render/Vercel/etc.), set the actual production URLs in the dashboard settings.
    *   Backend (Render): Set `APP_FRONTEND_URL` to your production frontend URL.
    *   Frontend (Vercel): Set `VITE_API_URL` to your production backend URL.
