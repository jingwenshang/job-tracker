import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api.js';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {

            await API.post('/register', { username, password });


            const res = await API.post('/login', { username, password });
            localStorage.setItem('token', res.data.token);

            navigate('/dashboard');
        } catch (err) {
            if (err.response?.status === 409) {
                alert('Username already exists');
            } else {
                alert('Registration failed');
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
                    Create an Account
                </h1>

                <form onSubmit={handleRegister} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-semibold py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-green-600 hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
