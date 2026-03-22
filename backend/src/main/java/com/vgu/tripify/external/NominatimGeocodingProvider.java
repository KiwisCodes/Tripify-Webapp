package com.vgu.tripify.external;

import org.springframework.stereotype.Service;

@Service
public class NominatimGeocodingProvider implements GeocodingProvider {
    @Override
    public Coordinate geocode(String placeName) {
        return null;
    }
}
