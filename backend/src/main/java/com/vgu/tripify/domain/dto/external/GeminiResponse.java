package com.vgu.tripify.domain.dto.external;

import lombok.Data;
import java.util.List;

/**
 * STEP 4: The DTO (Data Transfer Object) Translator
 * * WHY WE NEED THIS: Google Gemini replies in a massive block of JSON text.
 * Spring uses a tool called "Jackson" to automatically translate (deserialize)
 * that JSON text into Java objects. But Jackson needs a blueprint to know
 * where to put the data. This class is that blueprint.
 * * THE GOLDEN RULE OF TRANSLATION:
 * 1. { } (Curly braces) in JSON = An Object. We MUST create a custom Java Class for it.
 * 2. [ ] (Square brackets) in JSON = A List. We use Java's List<>.
 * 3. "..." (Quotes) in JSON = Raw data. We just use a standard Java String.
 * * @Data is from Lombok. It secretly writes all the getters() and setters()
 * for us so we don't clutter the file.
 */
@Data
public class GeminiResponse {

    /* * THE OUTER DOLL
     * JSON looks like: { "candidates": [ { ... } ] }
     * Because "candidates" uses [ ], it's a List.
     * Because inside the list are { }, we had to invent a custom 'Candidate' class.
     */
    private List<Candidate> candidates;

    /* * DOLL LAYER 2
     * We use "static class" inside this file so we don't have to create
     * 4 separate files just to read one message. It keeps things organized.
     */
    @Data
    public static class Candidate {

        /*
         * JSON looks like: "content": { ... }
         * Because it's an Object { }, we had to invent a custom 'Content' class.
         */
        private Content content;
    }

    /* DOLL LAYER 3 */
    @Data
    public static class Content {

        /*
         * JSON looks like: "parts": [ { ... } ]
         * Because it's a List of Objects, we use List<Part> and invent a 'Part' class.
         */
        private List<Part> parts;
    }

    /* DOLL LAYER 4 (The center of the nesting doll!) */
    @Data
    public static class Part {

        /*
         * THE ACTUAL TRIP DATA!
         * JSON looks like: "text": "Here is your 3-day Paris trip..."
         * * Notice there are no { } or [ ] around the actual words.
         * It is just plain raw text. Because of this, we DO NOT need to invent
         * another custom class. Java's built-in String is the perfect tool.
         */
        private String text;
    }
}


/*

{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "Here is your 3-day trip..."
          }
        ]
      }
    }
  ]
}
 */