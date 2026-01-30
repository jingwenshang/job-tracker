package com.example.jobtracker.service;

import com.example.jobtracker.entity.Job;
import com.example.jobtracker.entity.JobStatus;

import java.util.List;

public interface JobService {

    Job saveJob(Job job);

    List<Job> getAllJobs();

    List<Job> searchByCompany(String company);

    List<Job> searchByTitle(String title);

    List<Job> filterByStatus(JobStatus status);

    Job updateJob(Long id, Job job);

    void deleteJob(Long id);
}
