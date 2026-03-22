package com.vgu.tripify.external;

import com.vgu.tripify.external.helperClass.Coordinate;

public interface GeocodingProvider {
    Coordinate geocode(String placeName);
}
