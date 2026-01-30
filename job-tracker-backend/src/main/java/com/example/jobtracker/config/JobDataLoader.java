package com.example.jobtracker.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.InputStream;
import java.util.List;
import com.example.jobtracker.entity.Job;
import org.springframework.stereotype.Component;

@Component
public class JobDataLoader {
    public static List<Job> loadJobs() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream is = JobDataLoader.class.getResourceAsStream("/static/jobs.json");
            return List.of(mapper.readValue(is, Job[].class));
        } catch (Exception e) {
            throw new RuntimeException("Failed to load jobs", e);
        }
    }
}