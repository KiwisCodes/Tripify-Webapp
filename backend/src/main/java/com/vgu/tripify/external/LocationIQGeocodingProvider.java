package com.vgu.tripify.external;

import com.vgu.tripify.domain.dto.external.LocationIqResponse;
import com.vgu.tripify.external.helperClass.Coordinate;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import java.time.Duration;

@Service
@RequiredArgsConstructor
public class LocationIQGeocodingProvider implements GeocodingProvider {
    private final RestTemplate restTemplate;

    @Value("${locationiq.api.key}")
    private String key;

    private String baseUrl = "https://us1.locationiq.com/v1/search";

    private final Bucket bucket = Bucket.builder()
            .addLimit(Bandwidth.builder()
                    .capacity(2)
                    .refillGreedy(1, Duration.ofSeconds(1))
                    .build())
            .build();

    @Override
    public Coordinate geocode(String query) {
        try{
            bucket.asBlocking().consume(1); // auto pause if no token available
            URI uri = UriComponentsBuilder.fromUriString(baseUrl)
                .queryParam("key", key)
                .queryParam("q", query)
                .queryParam("format", "json")
                .queryParam("limit", 1)
                .encode() // First Encoding
                .build()
                .toUri();
        // Using URI so that the restTemplate will skip the encoding process
        // If we use String -> restTemplate will encode to URI again -> double encoding
            LocationIqResponse[] response = restTemplate.getForObject(uri, LocationIqResponse[].class);
            // restTemplate -> allow to send get request to external API and then automatically map that to locationIqResponse class
            if (response != null && response.length > 0) {
                System.out.println("Found location: "+ response[0].getDisplayName());
                double latitude = Double.parseDouble(response[0].getLatitude());
                double longitude = Double.parseDouble(response[0].getLongitude());
                return new Coordinate(latitude, longitude);
            }
        } catch (Exception e){
            System.err.println(e.getMessage());
        }
        return null;
    }
}
