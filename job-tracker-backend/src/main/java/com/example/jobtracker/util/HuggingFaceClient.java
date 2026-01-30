package com.example.jobtracker.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class HuggingFaceClient {

    private static final String API_URL =
            "model_url";

    private static final String API_TOKEN = "your_token";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String summarize(String resumeText) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(API_TOKEN);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(List.of(MediaType.APPLICATION_JSON));

        String prompt =
                "You are an AI career assistant.\n\n" +
                        "Analyze the resume below and provide:\n" +
                        "1. A concise professional summary (skills, experience, tech stack)\n" +
                        "2. Suitable job roles\n" +
                        "3. Key strengths and possible career direction\n\n" +
                        "Resume:\n" +
                        resumeText;

        Map<String, Object> payload = new HashMap<>();
        payload.put("inputs", prompt);
        payload.put("parameters", Map.of(
                "max_new_tokens", 350,
                "temperature", 0.3
        ));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(payload, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                    API_URL,
                    HttpMethod.POST,
                    request,
                    String.class
            );

            if (!response.getStatusCode().is2xxSuccessful()) {
                return "❌ Hugging Face API error: " + response.getStatusCode();
            }

            JsonNode root = objectMapper.readTree(response.getBody());


            if (root.isArray() && root.size() > 0) {
                JsonNode first = root.get(0);
                if (first.has("summary_text")) {
                    return first.get("summary_text").asText();
                } else if (first.has("generated_text")) {
                    return first.get("generated_text").asText();
                }
            }


            if (root.has("results") && root.get("results").isArray()) {
                JsonNode first = root.get("results").get(0);
                if (first.has("summary_text")) {
                    return first.get("summary_text").asText();
                } else if (first.has("generated_text")) {
                    return first.get("generated_text").asText();
                }
            }

            return "❌ Unexpected Hugging Face response format.";

        } catch (Exception e) {
            e.printStackTrace();
            return "❌ Exception while calling Hugging Face: " + e.getMessage();
        }
    }
}
