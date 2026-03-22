package com.vgu.tripify.external;

import com.vgu.tripify.external.helperClass.Coordinate;
import org.springframework.stereotype.Service;

@Service
public class NominatimGeocodingProvider implements GeocodingProvider {
    @Override
    public Coordinate geocode(String placeName) {
        return null;
    }
}
