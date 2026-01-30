package com.example.jobtracker.dto;

public class AISummaryResponse {
    private String summary;

    public AISummaryResponse() {}

    public AISummaryResponse(String summary) {
        this.summary = summary;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }
}
