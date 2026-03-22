package com.vgu.tripify.external.helperClass;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import java.util.List;

public class RouteResult {
    // Osrm will return a 'code' => "Oke" or "NoRoute"
    private String code;

    //Osrm return a list of route, -> we only care the first one (i.e fastest one)
    private List<OsrmRoute> routes;

    // Nested class to match OSRM's JSON structure
    @Data
    public static class OsrmRoute {
        private Double distance;
        private Double duration;

        // The encrypted polyline (React Leaflet uses this to draw the blue line on the map)
        private String geometry;

        // OSRM uses snake_case, but Java uses camelCase.
        // @JsonProperty tells Spring Boot how to map it!
        @JsonProperty("weight_name")
        private String weightName;
    }
    public Double getFastestDurationSeconds(){
        if(routes == null || routes.isEmpty()){
            return 0.0;
        }
        return routes.getFirst().getDuration();
    }
}
