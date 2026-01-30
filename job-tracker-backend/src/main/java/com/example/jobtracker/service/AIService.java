package com.example.jobtracker.service;

import org.springframework.web.multipart.MultipartFile;

public interface AIService {

    String extractText(MultipartFile file) throws Exception;

    String summarizeText(String input) throws Exception;
}
