package com.vgu.tripify.external;

import org.springframework.stereotype.Service;

@Service
public class OsrmRoutingProvider implements RoutingProvider {
    @Override
    public RouteResult getRoute(List<Coordinate> waypoints) {
        return null;
    }
}
