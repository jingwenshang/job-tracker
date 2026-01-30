import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    ClipboardList,
    BarChart3,
    NotebookPen,
    User,
    LogOut,
    Files,
    Sparkles,
} from "lucide-react";

const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "Applications", icon: ClipboardList, path: "/tasks" },
    { label: "Analytics", icon: BarChart3, path: "/analytics" },
    { label: "Notes", icon: NotebookPen, path: "/notes" },
    { label: "Explore", icon: Files, path: "/jobs" },
    { label: "AI Assistant", icon: Sparkles, path: "/ai" },
    { label: "Profile", icon: User, path: "/profile" },
];

export default function Sidebar() {
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="min-h-screen w-60 bg-black text-white flex flex-col justify-between p-4">
            <div>
                <h1 className="text-xl font-bold mb-6">🧠 JobTracker</h1>

                <ul className="space-y-3">
                    {navItems.map(({ label, icon: Icon, path }) => (
                        <li key={label}>
                            <Link
                                to={path}
                                className={`flex items-center gap-3 p-2 rounded transition
                                    hover:bg-gray-800
                                    ${location.pathname === path ? "bg-gray-800" : ""}
                                `}
                            >
                                <Icon size={18} />
                                <span>{label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm hover:text-red-400 transition"
            >
                <LogOut size={18} />
                Logout
            </button>
        </div>
    );
}
