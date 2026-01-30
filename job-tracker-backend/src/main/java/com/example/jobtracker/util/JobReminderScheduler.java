package com.example.jobtracker.util;

import com.example.jobtracker.dto.JobReminderResponse;
import com.example.jobtracker.entity.Job;
import com.example.jobtracker.entity.User;
import com.example.jobtracker.repository.JobRepository;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class JobReminderScheduler {

    private final JobRepository jobRepository;
    private final JavaMailSender mailSender;

    public JobReminderScheduler(JobRepository jobRepository, JavaMailSender mailSender) {
        this.jobRepository = jobRepository;
        this.mailSender = mailSender;
    }

    private static final ZoneId ZONE_ID = ZoneId.of("America/New_York");

    @Scheduled(cron = "0 0 * * * *")
    public void checkUpcomingDeadlines() {
        Map<User, List<Job>> userToUpcomingJobs = getUpcomingJobsGroupedByUser();

        for (Map.Entry<User, List<Job>> entry : userToUpcomingJobs.entrySet()) {
            User user = entry.getKey();
            String email = user.getEmail();

            if (email == null || email.isEmpty()) continue;

            StringBuilder messageBuilder = new StringBuilder();

            for (Job job : entry.getValue()) {
                if (job.getInterviewTime() != null) {
                    messageBuilder.append("🔔 Interview soon: ")
                            .append(job.getCompany())
                            .append(" · ")
                            .append(job.getTitle())
                            .append(" at ")
                            .append(job.getInterviewTime())
                            .append("\n");
                }

                if (job.getOfferDeadline() != null &&
                        job.getOfferDeadline().isEqual(LocalDate.now(ZONE_ID))) {
                    messageBuilder.append("⚠️ Offer deadline today: ")
                            .append(job.getCompany())
                            .append(" · ")
                            .append(job.getTitle())
                            .append("\n");
                }
            }

            if (!messageBuilder.isEmpty()) {
                sendReminderEmail(email, messageBuilder.toString());
            }
        }
    }

    private void sendReminderEmail(String to, String message) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setTo(to);
        mail.setSubject("Job Reminder - Upcoming Interview/Deadline");
        mail.setText(message);
        mailSender.send(mail);
    }

    public JobReminderResponse getUpcomingReminders() {
        LocalDateTime now = LocalDateTime.now(ZONE_ID);
        LocalDateTime upcoming = now.plusHours(3);
        LocalDate today = now.toLocalDate();

        List<Job> interviewReminders = new ArrayList<>();
        List<Job> deadlineReminders = new ArrayList<>();

        for (Job job : jobRepository.findAll()) {
            if (job.getInterviewTime() != null &&
                    !job.getInterviewTime().isBefore(now) &&
                    job.getInterviewTime().isBefore(upcoming)) {
                interviewReminders.add(job);
            }

            if (job.getOfferDeadline() != null &&
                    job.getOfferDeadline().isEqual(today)) {
                deadlineReminders.add(job);
            }
        }

        return new JobReminderResponse(interviewReminders, deadlineReminders);
    }

    public Map<User, List<Job>> getUpcomingJobsGroupedByUser() {
        LocalDateTime now = LocalDateTime.now(ZONE_ID);
        LocalDateTime upcoming = now.plusHours(3);
        LocalDate today = now.toLocalDate();

        return jobRepository.findAll().stream()
                .filter(job ->
                        (job.getInterviewTime() != null &&
                                !job.getInterviewTime().isBefore(now) &&
                                job.getInterviewTime().isBefore(upcoming)) ||
                                (job.getOfferDeadline() != null &&
                                        job.getOfferDeadline().isEqual(today))
                )
                .collect(Collectors.groupingBy(Job::getUser));
    }
}
