package com.vgu.tripify.external;

import com.vgu.tripify.domain.dto.external.AiTripResponseDto;
import com.vgu.tripify.domain.dto.external.GeminiResponse;
import com.vgu.tripify.domain.entity.DayItinerary;
import com.vgu.tripify.domain.enums.BudgetBracket;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.client.RestTemplate;
import tools.jackson.core.type.TypeReference;
import tools.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
//@ControllerAdvice //when to use this and when not?
public class GeminiTripGeneratorImpl implements AiTripGenerator {
    private final RestTemplate restTemplate;
    @Value("${gemini.api.key}")
    private String geminiApiKey;
    private static final String GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=";
    private final ObjectMapper objectMapper;


    @Override
    public AiTripResponseDto generateItinerary(String city, int duration, BudgetBracket budget) {
        String url = GEMINI_API_BASE_URL + geminiApiKey;

        // Note: I updated the prompt to ask for an OBJECT with a "days" key
        // to match our AiTripResponseDto record.
        String prompt = """
        You are a professional travel agent and local expert for %s.
        Generate a %d-day trip itinerary with a %s budget.
        
        CRITICAL OUTPUT RULES:
        - Return ONLY a raw JSON object. No markdown, no ```json blocks, no explanations.
        - Any response that is not pure JSON will be rejected.
        
        STRICT PLACE NAME RULES (most important):
        - Use the OFFICIAL, SPECIFIC name of the location only (e.g. "Brandenburg Gate" not "Famous gate near the park")
        - Only letters, numbers, spaces, and commas are allowed in placeName
        - NO special characters: no parentheses (), no hyphens -, no slashes /, no quotes, no ampersands &
        - NO vague or generic names like "Local restaurant", "City center walk", "Dinner around Mitte", "Street food area"
        - placeName must be a real, searchable landmark, restaurant, museum, park, or venue
        - placeName must not exceed 50 characters
        - If a place name contains "&", replace it with "and"
        - If a place name contains "-", replace it with a space
        
        DESCRIPTION RULES:
        - description must be 1-2 sentences max
        - description must not exceed 200 characters
        
        ITINERARY RULES:
        - Each day must have exactly 4 to 5 itinerary items
        - Items should follow a logical time order: morning, late morning, lunch, afternoon, evening
        - Cover a variety of place types: landmarks, restaurants, museums, parks, entertainment
        
        The JSON must exactly match this format:
        {
          "days": [
            {
              "dayNumber": 1,
              "itineraryItems": [
                {
                  "placeName": "Brandenburg Gate",
                  "placeType": "Landmark",
                  "description": "Start your morning at this iconic 18th century neoclassical monument in the heart of Berlin."
                }
              ]
            }
          ]
        }
        """.formatted(city, duration, budget);


        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );

        GeminiResponse response = restTemplate.postForObject(url, requestBody, GeminiResponse.class);

        if (response == null || response.getCandidates().isEmpty()) {
            throw new RuntimeException("AI failed to return a response");
        }

        String aiJsonText = response.getCandidates().getFirst().getContent().getParts().getFirst().getText();
        return parseAiResponseToDto(aiJsonText);
    }

    private AiTripResponseDto parseAiResponseToDto(String aiJsonText) {
        try {
            // Remove markdown blocks if Gemini added them anyway
            String cleanJson = aiJsonText.replaceAll("```json|```", "").trim();

            // We no longer need TypeReference!
            // Jackson can map directly to our simple Record class.
            return objectMapper.readValue(cleanJson, AiTripResponseDto.class);

        } catch (Exception e) {
            throw new RuntimeException("AI returned invalid JSON structure: " + e.getMessage(), e);
        }
    }
}
