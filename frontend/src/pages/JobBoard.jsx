import React, { useEffect, useState } from "react";
import API from "../api";
import { toast, Toaster } from "react-hot-toast";

export default function JobBoard() {
    const [jobs, setJobs] = useState([]);
    const [newJob, setNewJob] = useState({
        company: "",
        title: "",
        status: "APPLIED",
        interviewTime: "",
        offerDeadline: "",
    });
    const [editingJobId, setEditingJobId] = useState(null);
    const [editData, setEditData] = useState({
        company: "",
        title: "",
        status: "APPLIED",
        interviewTime: "",
        offerDeadline: "",
    });

    const statusOptions = {
        APPLIED: "Applied",
        INTERVIEW: "Interviewing",
        OFFER: "Offer",
        REJECTED: "Rejected",
    };
    const statusKeys = Object.keys(statusOptions);

    const fetchJobs = async () => {
        try {
            const res = await API.get("/jobs");
            setJobs(res.data);
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
        }
    };

    const fetchUpcomingReminders = async () => {
        try {
            const res = await API.get("/jobs/upcoming");

            const interviewReminders = res.data?.interviewReminders ?? [];
            const deadlineReminders = res.data?.deadlineReminders ?? [];

            interviewReminders.forEach((job) => {
                toast(`📅 Interview soon: ${job.company} · ${job.title}`, {
                    icon: "⏰",
                });
            });

            deadlineReminders.forEach((job) => {
                toast(`⚠️ Offer deadline today: ${job.company} · ${job.title}`, {
                    icon: "🚨",
                });
            });
        } catch (err) {
            console.error("Failed to fetch reminders:", err);
        }
    };

    const handleAddJob = async () => {
        if (!newJob.company || !newJob.title) return;

        try {
            const res = await API.post("/jobs", newJob);
            if (res.status === 200 || res.status === 201) {
                setNewJob({
                    company: "",
                    title: "",
                    status: "APPLIED",
                    interviewTime: "",
                    offerDeadline: "",
                });
                fetchJobs();
            }
        } catch (err) {
            console.error("Failed to add job:", err);
        }
    };

    const handleEdit = (job) => {
        setEditingJobId(job.id);
        setEditData({
            company: job.company,
            title: job.title,
            status: job.status,
            interviewTime: job.interviewTime?.slice(0, 16) || "",
            offerDeadline: job.offerDeadline || "",
        });
    };

    const handleUpdate = async (id) => {
        try {
            await API.put(`/jobs/${id}`, editData);
            setEditingJobId(null);
            fetchJobs();
        } catch (err) {
            console.error("Failed to update job:", err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/jobs/${id}`);
            fetchJobs();
        } catch (err) {
            console.error("Failed to delete job:", err);
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchUpcomingReminders();
    }, []);

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Toaster position="top-right" />

            {/* Add Job */}
            <div className="bg-white shadow p-4 mb-6 rounded">
                <div className="flex flex-wrap gap-2 mb-4">
                    <input
                        className="border p-2 w-[13rem]"
                        placeholder="Company"
                        value={newJob.company}
                        onChange={(e) =>
                            setNewJob({ ...newJob, company: e.target.value })
                        }
                    />
                    <input
                        className="border p-2 w-[13rem]"
                        placeholder="Title"
                        value={newJob.title}
                        onChange={(e) =>
                            setNewJob({ ...newJob, title: e.target.value })
                        }
                    />
                    <select
                        className="border p-2"
                        value={newJob.status}
                        onChange={(e) =>
                            setNewJob({ ...newJob, status: e.target.value })
                        }
                    >
                        {statusKeys.map((key) => (
                            <option key={key} value={key}>
                                {statusOptions[key]}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="datetime-local"
                        className="border p-2 w-[13rem]"
                        value={newJob.interviewTime}
                        onChange={(e) =>
                            setNewJob({
                                ...newJob,
                                interviewTime: e.target.value,
                            })
                        }
                    />
                    <input
                        type="date"
                        className="border p-2 w-[13rem]"
                        value={newJob.offerDeadline}
                        onChange={(e) =>
                            setNewJob({
                                ...newJob,
                                offerDeadline: e.target.value,
                            })
                        }
                    />
                    <button
                        className="bg-black text-white px-4 py-2 rounded ml-auto disabled:bg-gray-300"
                        onClick={handleAddJob}
                        disabled={!newJob.company || !newJob.title}
                    >
                        Add Job
                    </button>
                </div>
            </div>

            {/* Job list */}
            {jobs.map((job) => (
                <div
                    key={job.id}
                    className="bg-white shadow p-4 mb-4 rounded flex justify-between items-start"
                >
                    {editingJobId === job.id ? (
                        <div className="flex flex-col gap-2 w-full">
                            <input
                                className="border p-2"
                                value={editData.company}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        company: e.target.value,
                                    })
                                }
                            />
                            <input
                                className="border p-2"
                                value={editData.title}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        title: e.target.value,
                                    })
                                }
                            />
                            <select
                                className="border p-2"
                                value={editData.status}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        status: e.target.value,
                                    })
                                }
                            >
                                {statusKeys.map((key) => (
                                    <option key={key} value={key}>
                                        {statusOptions[key]}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="datetime-local"
                                className="border p-2"
                                value={editData.interviewTime}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        interviewTime: e.target.value,
                                    })
                                }
                            />
                            <input
                                type="date"
                                className="border p-2"
                                value={editData.offerDeadline}
                                onChange={(e) =>
                                    setEditData({
                                        ...editData,
                                        offerDeadline: e.target.value,
                                    })
                                }
                            />
                            <button
                                className="bg-gray-800 text-white px-4 py-1 rounded mt-2"
                                onClick={() => handleUpdate(job.id)}
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Title:</strong> {job.title}</p>
                            <p><strong>Status:</strong> {statusOptions[job.status]}</p>
                            {job.interviewTime && (
                                <p>
                                    <strong>Interview:</strong>{" "}
                                    {new Date(job.interviewTime).toLocaleString()}
                                </p>
                            )}
                            {job.offerDeadline && (
                                <p>
                                    <strong>Deadline:</strong>{" "}
                                    {new Date(job.offerDeadline + 'T12:00:00Z').toLocaleDateString()}
                                </p>
                            )}
                        </div>
                    )}

                    <div className="flex flex-col gap-2 ml-4">
                        <button
                            className="bg-black text-white px-3 py-1 rounded"
                            onClick={() => handleEdit(job)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-black text-white px-3 py-1 rounded"
                            onClick={() => handleDelete(job.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
