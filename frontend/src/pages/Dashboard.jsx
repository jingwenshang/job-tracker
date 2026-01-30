import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { toast, Toaster } from "react-hot-toast";

export default function Dashboard() {
    const [interviewReminders, setInterviewReminders] = useState([]);
    const [deadlineReminders, setDeadlineReminders] = useState([]);
    const navigate = useNavigate();

    const fetchReminders = async () => {
        try {
            const res = await API.get("/jobs/upcoming");
            setInterviewReminders(res.data?.interviewReminders ?? []);
            setDeadlineReminders(res.data?.deadlineReminders ?? []);
        } catch (err) {
            console.error("Failed to fetch reminders:", err);
            toast.error("Failed to fetch reminders");
        }
    };

    useEffect(() => {
        fetchReminders();
    }, []);

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <Toaster position="top-right" />

            <h1 className="text-3xl font-bold mb-6">📊 Dashboard</h1>

            {/* Upcoming Reminders */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">🔔 Upcoming Deadlines</h2>
                {interviewReminders.length === 0 && deadlineReminders.length === 0 ? (
                    <p className="text-gray-500">No upcoming interviews or deadlines.</p>
                ) : (
                    <div className="grid gap-4">
                        {interviewReminders.map((job) => (
                            <div key={job.id} className="border rounded p-4 bg-white shadow-sm">
                                <p className="text-sm text-gray-500">Interview</p>
                                <p className="font-semibold">{job.title} @ {job.company}</p>
                                <p className="text-sm text-gray-600">📅 {new Date(job.interviewTime).toLocaleString()}</p>
                            </div>
                        ))}
                        {deadlineReminders.map((job) => (
                            <div key={job.id} className="border rounded p-4 bg-white shadow-sm">
                                <p className="text-sm text-gray-500">Offer Deadline</p>
                                <p className="font-semibold">{job.title} @ {job.company}</p>
                                <p className="text-sm text-gray-600">⚠️ {new Date(job.offerDeadline + "T12:00:00Z").toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Quick Navigation */}
            <section className="mb-10">
                <h2 className="text-xl font-semibold mb-4">⚡️ Quick Access</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <button
                        className="p-4 border rounded shadow hover:bg-gray-50"
                        onClick={() => navigate("/jobs")}
                    >
                        📋 Job Board
                    </button>
                    <button
                        className="p-4 border rounded shadow hover:bg-gray-50"
                        onClick={() => navigate("/tasks")}
                    >
                        ✅ Job Tracker
                    </button>
                    <button
                        className="p-4 border rounded shadow hover:bg-gray-50"
                        onClick={() => navigate("/analytics")}
                    >
                        📈 Analytics
                    </button>
                    <button
                        className="p-4 border rounded shadow hover:bg-gray-50"
                        onClick={() => navigate("/notes")}
                    >
                        🧠 Interview Notes
                    </button>
                    <button
                        className="p-4 border rounded shadow hover:bg-gray-50"
                        onClick={() => navigate("/profile")}
                    >
                        👤 Profile
                    </button>
                </div>
            </section>


        </div>
    );
}
