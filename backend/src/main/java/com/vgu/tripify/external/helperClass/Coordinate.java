package com.vgu.tripify.external.helperClass;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Coordinate {
    private Double latitude;
    private Double longitude;

    public String toOsrmString() {
        return latitude.toString() + ", " + longitude.toString();
    }
}
