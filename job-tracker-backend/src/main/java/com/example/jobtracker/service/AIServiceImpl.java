package com.example.jobtracker.service.impl;

import com.example.jobtracker.service.AIService;
import com.example.jobtracker.util.HuggingFaceClient;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class AIServiceImpl implements AIService {

    private final HuggingFaceClient huggingFaceClient;

    public AIServiceImpl(HuggingFaceClient huggingFaceClient) {
        this.huggingFaceClient = huggingFaceClient;
    }

    @Override
    public String extractText(MultipartFile file) throws Exception {
        String filename = file.getOriginalFilename();
        if (filename == null) {
            throw new IllegalArgumentException("Filename is null");
        }

        // -------- TXT --------
        if (filename.endsWith(".txt")) {
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8)
            );

            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line).append("\n");
            }
            return sb.toString();
        }

        // -------- PDF --------
        if (filename.endsWith(".pdf")) {
            PDDocument document = PDDocument.load(file.getInputStream());
            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document);
            document.close();
            return text;
        }

        throw new IllegalArgumentException("Unsupported file type: " + filename);
    }

    @Override
    public String summarizeText(String resumeText) throws Exception {


        String prompt =
                "You are an AI career assistant.\n\n" +
                        "Analyze the following resume and provide:\n" +
                        "1. A concise professional summary (skills, experience, tech stack).\n" +
                        "2. Suitable job roles this candidate matches.\n" +
                        "3. Key strengths and possible career direction.\n\n" +
                        "Resume:\n" +
                        resumeText;

        return huggingFaceClient.summarize(prompt);
    }
}
