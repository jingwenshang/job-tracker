package com.example.jobtracker.filter;

import com.example.jobtracker.util.JwtUtil;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class JwtFilter implements Filter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest httpReq = (HttpServletRequest) request;
        HttpServletResponse httpResp = (HttpServletResponse) response;

        String uri = httpReq.getRequestURI();
        String method = httpReq.getMethod();
        String authHeader = httpReq.getHeader("Authorization");

        // Debug logging
        System.out.println("🔐 JwtFilter intercepting request");
        System.out.println("URI: " + uri);
        System.out.println("Method: " + method);
        System.out.println("AuthHeader: " + authHeader);

        // Bypass filter for login/register, OPTIONS preflight, and public APIs
        if ("OPTIONS".equalsIgnoreCase(method) ||
                uri.startsWith("/api/login") ||
                uri.startsWith("/api/register") ||
                uri.equals("/api/jobs/remote") ||   // <-- allow unauthenticated access to remotive proxy
                !uri.startsWith("/api/")) {
            chain.doFilter(request, response);
            return;
        }

        // Validate JWT token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtUtil.validateToken(token)) {
                String username = jwtUtil.extractUsername(token);
                Long userId = jwtUtil.extractUserId(token);

                // Add user info to request context
                httpReq.setAttribute("username", username);
                httpReq.setAttribute("userId", userId);

                chain.doFilter(request, response);
                return;
            }
        }

        // Unauthorized response if no valid token
        httpResp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing or invalid token");
    }
}
