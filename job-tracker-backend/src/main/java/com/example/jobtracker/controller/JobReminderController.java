package com.example.jobtracker.controller;

import com.example.jobtracker.dto.JobReminderResponse;
import com.example.jobtracker.util.JobReminderScheduler;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/jobs/upcoming")
public class JobReminderController {

    private final JobReminderScheduler jobReminderScheduler;

    public JobReminderController(JobReminderScheduler jobReminderScheduler) {
        this.jobReminderScheduler = jobReminderScheduler;
    }

    @GetMapping
    public JobReminderResponse getUpcomingJobs() {
        return jobReminderScheduler.getUpcomingReminders();
    }
}
