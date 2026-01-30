import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMde from "react-mde";
import Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const JobNotesPage = () => {
    const { jobId } = useParams();
    const [value, setValue] = useState("");
    const [selectedTab, setSelectedTab] = useState("write");

    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
    });

    // Load existing notes
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const job = await res.json();
                setValue(job.notes || "");
            } catch (err) {
                console.error("Failed to fetch job notes:", err);
            }
        };

        fetchNotes();
    }, [jobId]);

    const saveNotes = async () => {
        try {
            const res = await fetch(`http://localhost:8080/api/jobs/${jobId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ notes: value }),
            });

            if (!res.ok) throw new Error("Failed to save notes");
            alert("Notes saved!");
        } catch (err) {
            console.error("Error saving notes:", err);
            alert("Failed to save notes");
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">📝 Job Notes (Job ID: {jobId})</h2>
            <ReactMde
                value={value}
                onChange={setValue}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
            />
            <button
                onClick={saveNotes}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Save Notes
            </button>
        </div>
    );
};

export default JobNotesPage;
