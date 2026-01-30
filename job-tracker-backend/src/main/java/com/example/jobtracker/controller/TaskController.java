package com.example.jobtracker.controller;

import com.example.jobtracker.entity.Task;
import com.example.jobtracker.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskService taskService;

    // Add new task (content + optional status)
    @PostMapping("/add")
    public List<Task> addTask(@RequestBody Task task) {
        return taskService.addTask(task);
    }

    // List all tasks for current user
    @GetMapping("/list")
    public List<Task> listTasks() {
        return taskService.listTasks();
    }

    // Update task status
    @PostMapping("/update/{id}")
    public Task updateTaskStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> body
    ) {
        String status = body.get("status");
        return taskService.updateTaskStatus(id, status);
    }

    // Delete task
    @DeleteMapping("/delete/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
