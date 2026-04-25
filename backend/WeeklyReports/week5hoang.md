# Tripify Week 5: Geocoding & Service Architecture

This week focused on stabilizing our external integrations, optimizing data persistence, and ensuring architectural integrity through strategic refactoring.

---

## 1. The Geocoding Engine (`LocationIQGeocodingProvider`)

**The Problem:** Gemini provides place names (text), but we need coordinates (lat/long) for map rendering. Free APIs like LocationIQ have strict rate limits and specific encoding requirements that can easily lead to failures if not handled precisely.

###  Rate Limiting with Bucket4j
*   **What:** Implemented a `Bucket` that allows 1 token per second (`refillGreedy`).
*   **Why:** A 5-day trip involves ~25 locations. Without rate limiting, 25 simultaneous API calls would trigger a `429 Too Many Requests` error, potentially resulting in a blocked API key.
*   **How:** `bucket.asBlocking().consume(1)` automatically pauses execution until a token is available, ensuring "polite" and stable API interaction.

### Precision URL Encoding
*   **What:** Transitioned from `String` URLs to `java.net.URI` using `UriComponentsBuilder`.
*   **Why:** `RestTemplate` encodes strings by default. If a query already contains special characters (e.g., `%20`), passing it as a string causes **"Double Encoding"**, leading to `404` or `400` errors.
*   **How:** Using the `URI` object tells Spring that the encoding is already handled, ensuring the request reaches the provider exactly as intended.

### ️ Mapping Logic
*   **Where:** Created `LocationIqResponse` using Jackson's `@JsonProperty`.
*   **Why:** External APIs often use `snake_case` (e.g., `display_name`). This mapping allows our Java domain to remain idiomatic (using `displayName`) while correctly translating the JSON response.

---

## 2. Service Layer Refactoring (`TripServiceImpl` & `TripPersistenceService`)

**The Problem:** The generation process was becoming monolithic and bloated. Furthermore, database transactions were failing due to the "Self-Invocation" limitation of Spring AOP.

### The Transactional Split
*   **What:** Extracted the logic for saving `Trip`, `DayItinerary`, and `ItineraryItem` into a dedicated `TripPersistenceService`.
*   **Why (The "Proxy" Lesson):** Spring's `@Transactional` works via Proxies. If `methodA()` calls a `@Transactional methodB()` within the same class, the proxy is bypassed, and no transaction is started. Moving it to a new service ensures the Proxy is engaged and the transaction is honored.

###  The Coordinate Cache Strategy
*   **What:** Implemented a `Map<String, Coordinate> coordinateCache` within `TripServiceImpl`.
*   **How:** All locations are geocoded *before* the database transaction begins.
*   **Why:** Geocoding is slow due to rate limits. We must **never** perform slow, external network calls inside a `@Transactional` block. Keeping a transaction open during these calls exhausts database connection pools and risks system crashes under load.

###  Manual Mapping (DTO -> Entity)
*   **What:** Developed a robust mapping loop in `TripPersistenceService` to "stitch" AI data into the JPA entity tree.
*   **Why:** This ensures bi-directional relationships (e.g., `day.addItineraryItem(item)`) are set correctly, allowing Hibernate to persist the entire trip structure with a single `repository.save(trip)` call via `CascadeType.ALL`.

---

## Key Takeaways & Lessons Learned

*   **"Respect the API":** Building production-grade integrations requires more than just a `GET` request; it requires rate limiting (`Bucket4j`) and defensive error handling to ensure one failed location doesn't break the entire flow.
*   **"Transaction Hygiene":** `@Transactional` blocks should be as "thin" and "fast" as possible. External dependencies (AI/Geocoding) must live outside the transaction; only the final state persistence belongs inside.
*   **"The Power of the Prompt":** Code stability begins at the data source. By enforcing "Strict Place Name Rules" in the Gemini prompt (no special characters, 50-char limit), the reliability of the downstream geocoding logic improved significantly.
