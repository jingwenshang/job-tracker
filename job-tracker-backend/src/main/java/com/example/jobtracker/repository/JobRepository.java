package com.example.jobtracker.repository;

import com.example.jobtracker.entity.Job;
import com.example.jobtracker.entity.JobStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByCompanyContainingIgnoreCase(String company);
    List<Job> findByTitleContainingIgnoreCase(String title);
    List<Job> findByStatus(JobStatus status);
}
