import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JobBoard from './JobBoard';
import API from '../api';

export default function JobApplicationPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">
                        📄 Job Applications
                    </h1>
                    <button
                        onClick={logout}
                        className="text-sm text-red-500 font-medium hover:underline"
                    >
                        💼 Logout
                    </button>
                </div>


                <JobBoard />
            </div>
        </div>
    );
}
