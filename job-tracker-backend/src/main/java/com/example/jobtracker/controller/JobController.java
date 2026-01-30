package com.example.jobtracker.controller;

import com.example.jobtracker.entity.Job;
import com.example.jobtracker.entity.JobStatus;
import com.example.jobtracker.service.JobService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public Job createJob(@RequestBody Job job) {
        return jobService.saveJob(job);
    }

    @GetMapping
    public List<Job> getAllJobs() {
        return jobService.getAllJobs();
    }

    @GetMapping("/search/company")
    public List<Job> searchByCompany(@RequestParam String keyword) {
        return jobService.searchByCompany(keyword);
    }

    @GetMapping("/search/title")
    public List<Job> searchByTitle(@RequestParam String keyword) {
        return jobService.searchByTitle(keyword);
    }

    @GetMapping("/filter/status")
    public List<Job> filterByStatus(@RequestParam JobStatus status) {
        return jobService.filterByStatus(status);
    }

    @PutMapping("/{id}")
    public Job updateJob(@PathVariable Long id, @RequestBody Job job) {
        return jobService.updateJob(id, job);
    }

    @DeleteMapping("/{id}")
    public void deleteJob(@PathVariable Long id) {
        jobService.deleteJob(id);
    }


    @GetMapping("/remote")
    public ResponseEntity<?> fetchLocalMockJobs() {
        try {
            InputStream inputStream = new ClassPathResource("static/jobs.json").getInputStream();
            JsonNode node = objectMapper.readTree(inputStream);
            return ResponseEntity.ok(node);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to load local jobs: " + e.getMessage());
        }
    }
}