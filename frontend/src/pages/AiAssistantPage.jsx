import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import API from "../api";

export default function AiAssistantPage() {
    const [file, setFile] = useState(null);
    const [summary, setSummary] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setSummary("");
    };

    const handleAnalyze = async () => {
        if (!file) {
            toast.error("Please upload your resume first.");
            return;
        }

        setLoading(true);
        toast.loading("Analyzing...");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await API.post("/ai/summarize", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            const { summary } = res.data;
            setSummary(summary);
            toast.dismiss();
            toast.success("✅ Analysis complete!");
        } catch (err) {
            console.error("Failed to analyze resume:", err);
            toast.dismiss();
            toast.error("❌ Failed to analyze resume.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <Toaster position="top-right" />
            <h2 className="text-2xl font-bold mb-4">🤖 AI Assistant</h2>

            <input
                type="file"
                accept=".pdf,.txt"
                onChange={handleFileChange}
                className="mb-4"
            />

            <button
                onClick={handleAnalyze}
                disabled={loading || !file}
                className="bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                Analyze Resume
            </button>

            {summary && (
                <div className="mt-6 bg-white p-4 rounded shadow">
                    <h3 className="font-semibold mb-2">🧠 Resume Summary:</h3>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}
