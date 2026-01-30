import React, { useEffect, useState } from "react";
import JobDetailModal from "./JobDetailModal";

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/jobs/remote", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                const data = await res.json();
                const parsed = typeof data === "string" ? JSON.parse(data) : data;
                const jobList = parsed.jobs ?? parsed;
                setJobs(jobList);
            } catch (error) {
                console.error("Failed to fetch jobs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">💼 Explore Remote Jobs</h2>

            {loading ? (
                <p className="text-gray-500">Loading jobs...</p>
            ) : jobs.length === 0 ? (
                <p className="text-gray-500">No jobs found.</p>
            ) : (
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="border rounded p-4 hover:bg-gray-50 cursor-pointer shadow-sm"
                            onClick={() => setSelectedJob(job)}
                        >
                            <div className="font-semibold text-lg">{job.title}</div>
                            <div className="text-sm text-gray-600">{job.company_name}</div>
                            <div className="text-sm text-gray-500">
                                Category: {job.category}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {selectedJob && (
                <JobDetailModal
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default JobList;
