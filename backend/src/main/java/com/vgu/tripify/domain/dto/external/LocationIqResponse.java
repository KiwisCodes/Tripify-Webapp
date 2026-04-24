package com.vgu.tripify.domain.dto.external;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class LocationIqResponse {
    @JsonProperty("lat")
    private String latitude;
    @JsonProperty("lon")
    private String longitude;
    @JsonProperty("display_name")
    private String displayName; // tell the Jackson
}

// Jackson is the translator between web and our backend service
// Json property will map the json -> display_name to our variable displayName

