package com.example.jobtracker.util;


import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class UserContext {

    public static String getUsername() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attr == null) return null;
        HttpServletRequest req = attr.getRequest();
        Object username = req.getAttribute("username");
        return username != null ? username.toString() : null;
    }

    public static Long getUserId() {
        ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        if (attr == null) return null;
        HttpServletRequest req = attr.getRequest();
        Object userId = req.getAttribute("userId");
        return userId != null ? Long.parseLong(userId.toString()) : null;
    }
}



