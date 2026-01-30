import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import TaskPage from "./pages/JobApplicationPage.jsx";
import JobList from "./pages/JobList.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import InterviewNotesPage from "./pages/InterviewNotesPage.jsx";
import Profile from "./pages/Profile.jsx";
import DashboardPage from "./pages/Dashboard.jsx";
import AiAssistantPage from "./pages/AiAssistantPage.jsx";

import MainLayout from "./components/MainLayout.jsx";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const location = useLocation();

    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, [location]);

    return (
        <Routes>
            {/* Auth */}
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route
                path="/dashboard"
                element={
                    token ? (
                        <MainLayout>
                            <DashboardPage />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/tasks"
                element={
                    token ? (
                        <MainLayout>
                            <TaskPage />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/jobs"
                element={
                    token ? (
                        <MainLayout>
                            <JobList />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/analytics"
                element={
                    token ? (
                        <MainLayout>
                            <AnalyticsPage />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/notes"
                element={
                    token ? (
                        <MainLayout>
                            <InterviewNotesPage />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />
            <Route
                path="/profile"
                element={
                    token ? (
                        <MainLayout>
                            <Profile />
                        </MainLayout>
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route path="/ai" element={
                token ? <MainLayout><AiAssistantPage /></MainLayout> : <Navigate to="/login" />} />

            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    );
}

export default App;
