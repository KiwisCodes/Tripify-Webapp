package com.vgu.tripify.external;

public interface RoutingProvider {
    RouteResult getRoute(List<Coordinate> waypoints);
}
