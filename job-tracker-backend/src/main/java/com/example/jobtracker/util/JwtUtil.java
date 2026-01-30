package com.example.jobtracker.util;

import io.jsonwebtoken.*;
import org.springframework.stereotype.Component;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "your_secret_key";
    private final long EXPIRATION_TIME = 86400000; // 1 day


    public String generateToken(String username, Long userId) {
        return Jwts.builder()
                .setSubject(username)
                .claim("userId", userId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }


    public String extractUsername(String token) {
        return parseToken(token).getSubject();
    }


    public Long extractUserId(String token) {
        return parseToken(token).get("userId", Long.class);
    }


    public boolean validateToken(String token) {
        try {
            parseToken(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }


    public String resolveToken(HttpServletRequest request) {
        String bearer = request.getHeader("Authorization");
        if (bearer != null && bearer.startsWith("Bearer ")) {
            return bearer.substring(7);
        }
        return null;
    }


    public String getUsernameFromToken(String token) {
        return extractUsername(token);
    }


    private Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();
    }
}
