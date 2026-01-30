package com.example.jobtracker.service;

import com.example.jobtracker.entity.User;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<?> register(User user);
    ResponseEntity<?> login(User user);
}
