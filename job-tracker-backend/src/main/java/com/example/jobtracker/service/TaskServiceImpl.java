package com.example.jobtracker.service;

import com.example.jobtracker.entity.Task;
import com.example.jobtracker.entity.User;
import com.example.jobtracker.repository.TaskRepository;
import com.example.jobtracker.repository.UserRepository;
import com.example.jobtracker.util.UserContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<Task> addTask(Task task) {
        Long userId = UserContext.getUserId();
        if (userId == null) throw new RuntimeException("No userId found in context");

        User user = userRepo.findById(userId).orElse(null);
        if (user == null) throw new RuntimeException("User not found");

        task.setUser(user);
        taskRepo.save(task);
        return taskRepo.findByUser(user);
    }

    @Override
    public List<Task> listTasks() {
        Long userId = UserContext.getUserId();
        if (userId == null) throw new RuntimeException("No userId found in context");

        User user = userRepo.findById(userId).orElse(null);
        if (user == null) throw new RuntimeException("User not found");

        return taskRepo.findByUser(user);
    }

    @Override
    public Task updateTaskStatus(Long id, String status) {
        Task task = taskRepo.findById(id).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(status);
        return taskRepo.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepo.deleteById(id);
    }
}
