# Security Audit Report - Week 5

This report outlines security considerations based on the current backend codebase.

## Summary
The backend uses Spring Boot 3 with Spring Security and JWT-based authentication. Passwords are handled correctly using BCrypt. Secret management is delegated to configuration properties.

## Vulnerabilities & Observations

| ID | Vulnerability | Severity | Description | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **VULN-001** | Secret Exposure (Config) | Low/Info | Configuration properties like `stripe.webhook.secret` and `jwt.secret` are used. | Ensure these are NOT committed to version control and are injected via environment variables in production. |
| **VULN-002** | Credential Leakage in Logs | Low | `StripePaymentServiceImpl` logs a portion of the secret key in case of webhook errors. | Remove logs that output sensitive secrets or partial keys. |

## Detailed Findings

### VULN-001: Secret Exposure via Config Properties
*   **Location:** `backend/src/main/java/com/vgu/tripify/service/impl/StripePaymentServiceImpl.java` (L32), `backend/src/main/java/com/vgu/tripify/security/JwtTokenProvider.java` (L21)
*   **Description:** The application uses Spring's `@Value` annotation to load sensitive configuration at runtime. While this is the correct architectural pattern, the security depends on these values being injected via environment variables (e.g., in a CI/CD pipeline or server dashboard) rather than being stored in `application.properties` that might be checked into Git.
*   **Recommendation:** Strictly adhere to the practice of never committing `application-prod.properties` if it contains real secrets. Use environment variables exclusively for production secrets.

### VULN-002: Credential Leakage in Logs
*   **Location:** `backend/src/main/java/com/vgu/tripify/service/impl/StripePaymentServiceImpl.java` (L97)
*   **Line Content:** `log.error("Expected secret starts with: {}", endpointSecret.substring(0, 10));`
*   **Description:** The code logs a portion of a secret key when a Stripe webhook event fails. Even partial secrets can significantly reduce the entropy for an attacker.
*   **Recommendation:** Remove this log statement. If debugging is required, log only the event type or a non-sensitive identifier, not components of the secret key.

## Security Posture
*   **Password Storage:** The use of `BCryptPasswordEncoder` in `SecurityConfig.java` is an industry-standard, secure approach.
*   **Authentication:** The implementation of `JwtAuthenticationFilter` correctly checks JWTs on each request and clears sensitive information after authentication.
*   **CORS:** The CORS implementation added in `RestConfig.java` follows safe practices (e.g., using explicit origins rather than `*` when `allowCredentials` is `true`).
