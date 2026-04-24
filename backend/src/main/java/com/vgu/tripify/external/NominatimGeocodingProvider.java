//package com.vgu.tripify.external;
//
//import com.vgu.tripify.external.helperClass.Coordinate;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.List;
//import java.util.Map;
//
//@Service
//@RequiredArgsConstructor
//public class NominatimGeocodingProvider implements GeocodingProvider {
//
//    private final RestTemplate restTemplate;
//    private static final String NOMINATIM_URL = "https://nominatim.openstreetmap.org/search?q={query}&format=json&limit=1";
//
//    @Override
//    public Coordinate geocode(String query) {
//        try {
//            HttpHeaders headers = new HttpHeaders();
//            headers.set("User-Agent", "Tripify-Webapp (vgu.com)");
//            HttpEntity<String> entity = new HttpEntity<>(headers);
//
//            ResponseEntity<List> response = restTemplate.exchange(
//                    NOMINATIM_URL,
//                    HttpMethod.GET,
//                    entity, // to follow the requirement of nominatim provider
//                    List.class, // tell spring to deserialize JSON array into java LIST
//                    query
//            );
//            // java return a list of json objects
//            List<Map<String, Object>> results = response.getBody();
//
//            if (results != null && !results.isEmpty()) {
//                Map<String, Object> firstResult = results.get(0);
//                Double lat = Double.parseDouble((String) firstResult.get("lat"));
//                Double lon = Double.parseDouble((String) firstResult.get("lon"));
//                return new Coordinate(lat, lon);
//            }
//        } catch (Exception e) {
//            // Log error or handle appropriately
//            System.err.println("Geocoding failed for query: " + query + ". Error: " + e.getMessage());
//        }
//        return null;
//    }
//}
