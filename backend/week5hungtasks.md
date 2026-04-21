# Week 5: Full-Stack Authentication Integration Guide

This guide details how to securely connect your React frontend to your Spring Boot backend for production-ready deployment.

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

---

## 2. Backend Implementation (Spring Boot)

### Step 1: Configure Dynamic CORS in `RestConfig.java`
Update your configuration to allow cross-origin requests using a dynamic property.

**File:** `backend/src/main/java/com/vgu/tripify/config/RestConfig.java`

```java
@Configuration
public class RestConfig {

    // Inject frontend URL from application.properties (defaults to localhost)
    @Value("${app.frontend.url:http://localhost:5173}")
    private String frontendUrl;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins(frontendUrl) // Dynamic origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}
```

---

## 3. Frontend Implementation (React)

### Step 2: Configure Centralized API Client
Use `import.meta.env` to ensure your app automatically switches between local and production URLs.

**File:** `frontend/src/api/axios.js`

```javascript
import axios from 'axios';

const api = axios.create({
  // Vite automatically reads this from .env or deployment settings
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

// Request Interceptor: Attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response Interceptor: Handle expired sessions (401)
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

---

## 4. Connection Logic & Auth Strategies

### Step 3: Implement Auth Logic
Use the `api` instance from `axios.js`.

**Register Logic (`frontend/src/pages/Register.jsx`):**
```javascript
import api from '../api/axios';

const handleRegister = async (formData) => {
  try {
    await api.post('/auth/register', formData);
    alert("Registration successful!");
  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }
};
```

**Login Logic (`frontend/src/pages/Login.jsx`):**
```javascript
import api from '../api/axios';

const handleLogin = async (formData) => {
  try {
    const res = await api.post('/auth/login', formData);
    localStorage.setItem('token', res.data.token);
    window.location.href = '/dashboard';
  } catch (err) {
    alert("Invalid email or password");
  }
};
```

### Step 4: Advanced Scalability Patterns
1.  **State Persistence:** Don't rely solely on `localStorage`. Use **React Context** to keep `isAuthenticated` synced across your app.
2.  **Route Protection:** Wrap your dashboard routes in `ProtectedRoute.jsx`. It should check the context, and if `!isAuthenticated`, redirect to `/login`.

---

## 5. Deployment Readiness

1.  **Local Environment:** Ensure `frontend/.env` contains `VITE_API_URL=http://localhost:8080/api`. Ensure `.env` is in your `.gitignore`.
2.  **Cloud Deployment:**
    *   On your frontend hosting platform (Vercel/Render/etc.), set the Environment Variable `VITE_API_URL` to your live backend API URL.
    *   On your backend hosting platform, set the environment property `app.frontend.url` to your live frontend website URL.
