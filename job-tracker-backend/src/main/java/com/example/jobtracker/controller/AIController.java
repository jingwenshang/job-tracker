package com.example.jobtracker.controller;

import com.example.jobtracker.dto.AISummaryResponse;
import com.example.jobtracker.service.AIService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/ai")
public class AIController {

    private final AIService aiService;

    public AIController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping(value = "/summarize", consumes = "multipart/form-data")
    public ResponseEntity<AISummaryResponse> summarizeResume(@RequestParam("file") MultipartFile file) {
        try {

            String text = aiService.extractText(file);


            String summary = aiService.summarizeText(text);

            return ResponseEntity.ok(new AISummaryResponse(summary));

        } catch (Exception e) {
            return ResponseEntity.status(500).body(new AISummaryResponse("❌ Error: " + e.getMessage()));
        }
    }
}
