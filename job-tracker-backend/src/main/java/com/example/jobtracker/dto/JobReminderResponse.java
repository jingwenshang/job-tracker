package com.example.jobtracker.dto;

import com.example.jobtracker.entity.Job;
import java.util.List;

public class JobReminderResponse {

    private List<Job> interviewReminders;
    private List<Job> deadlineReminders;

    public JobReminderResponse(List<Job> interviewReminders, List<Job> deadlineReminders) {
        this.interviewReminders = interviewReminders;
        this.deadlineReminders = deadlineReminders;
    }

    public List<Job> getInterviewReminders() {
        return interviewReminders;
    }

    public List<Job> getDeadlineReminders() {
        return deadlineReminders;
    }
}
