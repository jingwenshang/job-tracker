import React from 'react';
import './JobDetailModal.css';

const JobDetailModal = ({ job, onClose }) => {
    if (!job) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>×</button>

                <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                <p><strong>Company:</strong> {job.company_name}</p>
                <p><strong>Category:</strong> {job.category}</p>
                <p><strong>Location:</strong> {job.candidate_required_location}</p>
                <p><strong>Type:</strong> {job.job_type}</p>
                <p><strong>Published:</strong> {new Date(job.publication_date).toLocaleDateString()}</p>

                <p className="mt-4"><strong>Description:</strong></p>
                <div
                    className="modal-description"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                />

                <div className="mt-6 text-right">
                    <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Apply Now →
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobDetailModal;