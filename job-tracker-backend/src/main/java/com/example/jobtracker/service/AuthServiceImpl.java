package com.example.jobtracker.service;

import com.example.jobtracker.entity.User;
import com.example.jobtracker.repository.UserRepository;
import com.example.jobtracker.service.AuthService;
import com.example.jobtracker.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public ResponseEntity<?> register(User user) {
        if (userRepository.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User already exists!");
        }

        String hashed = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
        user.setPassword(hashed);
        userRepository.save(user);
        return ResponseEntity.ok("Registered successfully!");
    }

    @Override
    public ResponseEntity<?> login(User user) {
        System.out.println("username：" + user.getUsername() + "，keyword：" + user.getPassword());
        User dbUser = userRepository.findByUsername(user.getUsername());

        if (dbUser == null || dbUser.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        if (!BCrypt.checkpw(user.getPassword(), dbUser.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        String token = jwtUtil.generateToken(dbUser.getUsername(), dbUser.getId());
        Map<String, String> response = Collections.singletonMap("token", token);
        return ResponseEntity.ok(response);
    }
}
