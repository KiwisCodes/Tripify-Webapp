package com.vgu.tripify.external;

import com.vgu.tripify.external.helperClass.Coordinate;
import com.vgu.tripify.external.helperClass.RouteResult;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OsrmRoutingProvider implements RoutingProvider {
    @Override
    public RouteResult getRoute(List<Coordinate> waypoints) {
        return null;
    }
}
