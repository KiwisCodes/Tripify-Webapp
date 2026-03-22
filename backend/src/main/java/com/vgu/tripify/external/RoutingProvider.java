package com.vgu.tripify.external;

import com.vgu.tripify.external.helperClass.Coordinate;
import com.vgu.tripify.external.helperClass.RouteResult;

import java.util.List;

public interface RoutingProvider {
    RouteResult getRoute(List<Coordinate> waypoints);
}
