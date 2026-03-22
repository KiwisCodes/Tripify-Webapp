package com.vgu.tripify.external;

public interface GeocodingProvider {
    Coordinate geocode(String placeName);
}
