package com.example.jobtracker.service;

import com.example.jobtracker.entity.Task;
import java.util.List;

public interface TaskService {
    List<Task> addTask(Task task);
    List<Task> listTasks();
    Task updateTaskStatus(Long id, String status);
    void deleteTask(Long id);
}
