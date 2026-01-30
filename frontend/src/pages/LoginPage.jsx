import React, { useState } from 'react';
import API from '../api.js';
import { useNavigate, Link } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await API.post('/login', { username, password });
            localStorage.setItem('token', res.data.token);
            navigate('/tasks');
        } catch (e) {
            alert('Login failed. Please check your username or password.');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-tr from-gray-100 to-blue-100 flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 border border-gray-200">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
                    Login
                </h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Welcome back to Job Tracker
                </p>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <button
                        onClick={handleLogin}
                        className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-all duration-200"
                    >
                        Login
                    </button>
                </div>

                <p className="text-sm text-center text-gray-600 mt-6">
                    Don’t have an account?{' '}
                    <Link to="/register" className="text-indigo-600 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
