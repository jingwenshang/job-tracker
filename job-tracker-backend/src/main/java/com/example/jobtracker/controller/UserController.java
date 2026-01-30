package com.example.jobtracker.controller;

import com.example.jobtracker.entity.User;
import com.example.jobtracker.repository.UserRepository;
import com.example.jobtracker.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public UserController(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(HttpServletRequest request) {
        String token = jwtUtil.resolveToken(request);
        String username = jwtUtil.getUsernameFromToken(token);
        User user = userRepository.findByUsername(username);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/email")
    public ResponseEntity<?> updateEmail(
            HttpServletRequest request,
            @RequestBody Map<String, String> body
    ) {
        String email = body.get("email");
        String token = jwtUtil.resolveToken(request);
        String username = jwtUtil.getUsernameFromToken(token);

        User user = userRepository.findByUsername(username);
        user.setEmail(email);
        userRepository.save(user);

        return ResponseEntity.ok().build();
    }
}
