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
    You are a professional travel agent.
    Generate a %d day trip itinerary to %s with a %s budget.
    
    CRITICAL INSTRUCTIONS:
    - Return ONLY a raw JSON object.
    - Do not include markdown formatting or ```json blocks.
    
    The JSON must exactly match this strict format:
    {
      "days": [
        {
          "dayNumber": 1,
          "itineraryItems": [
            { 
              "placeName": "The Louvre",
              "placeType": "Museum",
              "description": "Spend the morning exploring classic art."
            }
          ]
        }
      ]
    }
    """.formatted(duration, city, budget);

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
