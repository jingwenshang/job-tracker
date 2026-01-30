package com.example.jobtracker.service;

import com.example.jobtracker.entity.Job;
import com.example.jobtracker.entity.JobStatus;
import com.example.jobtracker.repository.JobRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobServiceImpl implements JobService {

    private final JobRepository jobRepository;

    public JobServiceImpl(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    @Override
    public Job saveJob(Job job) {
        return jobRepository.save(job);
    }

    @Override
    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    @Override
    public List<Job> searchByCompany(String company) {
        return jobRepository.findByCompanyContainingIgnoreCase(company);
    }

    @Override
    public List<Job> searchByTitle(String title) {
        return jobRepository.findByTitleContainingIgnoreCase(title);
    }

    @Override
    public List<Job> filterByStatus(JobStatus status) {
        return jobRepository.findByStatus(status);
    }

    @Override
    public Job updateJob(Long id, Job updatedJob) {
        Job job = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));

        job.setTitle(updatedJob.getTitle());
        job.setCompany(updatedJob.getCompany());
        job.setLocation(updatedJob.getLocation());
        job.setStatus(updatedJob.getStatus());
        job.setInterviewTime(updatedJob.getInterviewTime());
        job.setOfferDeadline(updatedJob.getOfferDeadline());

        return jobRepository.save(job);
    }

    @Override
    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }
}
