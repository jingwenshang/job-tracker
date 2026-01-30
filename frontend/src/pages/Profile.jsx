import React, { useEffect, useState } from "react";
import API from "../api";
import { Toaster, toast } from "react-hot-toast";

export default function Profile() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get("/user/profile");
                setUser(res.data);
                setEmail(res.data.email || "");
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
                toast.error("❌ Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        try {
            await API.put("/user/email", { email });
            toast.success("✅ Email updated!");
        } catch (err) {
            console.error("Failed to update email:", err);
            toast.error("❌ Failed to update email.");
        }
    };

    if (loading) return <div className="text-center mt-10 text-gray-500">Loading profile...</div>;

    return (
        <div className="p-6 max-w-xl mx-auto">
            <Toaster position="top-right" />
            <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">👤 Profile</h2>

                <div className="mb-4">
                    <label className="block text-gray-600 font-medium mb-1">Username</label>
                    <input
                        type="text"
                        value={user?.username || ""}
                        disabled
                        className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-gray-600 font-medium mb-1">Email for Reminders</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-black"
                        placeholder="your@email.com"
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="block mx-auto bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
                >
                    Save
            </button>
            </div>
        </div>
    );
}
