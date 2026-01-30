package com.example.jobtracker.repository;

import com.example.jobtracker.entity.Task;
import com.example.jobtracker.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUser(User user);
}
