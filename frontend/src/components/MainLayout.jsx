import React from "react";
import Sidebar from "./Sidebar.jsx";

export default function MainLayout({ children }) {
    return (
        <div className="min-h-screen flex bg-gray-100">

            <Sidebar />


            <main className="flex-1 p-6 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
