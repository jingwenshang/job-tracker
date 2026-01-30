import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Pencil, Check, Plus, GripVertical } from "lucide-react";
import {
    DragDropContext,
    Droppable,
    Draggable,
} from "@hello-pangea/dnd";

const LOCAL_KEY = "interview_notes";

const InterviewNotesPage = () => {
    const [notes, setNotes] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [activeJobId, setActiveJobId] = useState("all");

    // Load job list
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch("http://localhost:8080/api/jobs", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const data = await res.json();
                setJobs(data);
            } catch (e) {
                console.error("Failed to load jobs", e);
            }
        };
        fetchJobs();
    }, []);

    // Load notes from localStorage
    useEffect(() => {
        const saved = localStorage.getItem(LOCAL_KEY);
        if (saved) {
            setNotes(JSON.parse(saved));
        } else {
            setNotes([
                {
                    id: String(Date.now()),
                    jobId: null,
                    content: "# Interview Preparation\n- System Design\n- Behavioral",
                    editing: false,
                },
            ]);
        }
    }, []);

    // Save notes to localStorage
    useEffect(() => {
        localStorage.setItem(LOCAL_KEY, JSON.stringify(notes));
    }, [notes]);

    // Handlers
    const handleAddNote = () => {
        setNotes((prev) => [
            {
                id: String(Date.now()),
                jobId: activeJobId === "all" ? null : Number(activeJobId),
                content: "## New Interview Note",
                editing: true,
            },
            ...prev,
        ]);
    };

    const handleToggleEdit = (id) => {
        setNotes((prev) =>
            prev.map((n) => (n.id === id ? { ...n, editing: !n.editing } : n))
        );
    };

    const handleChangeContent = (id, value) => {
        setNotes((prev) =>
            prev.map((n) => (n.id === id ? { ...n, content: value } : n))
        );
    };

    const handleJobBind = (id, jobId) => {
        setNotes((prev) =>
            prev.map((n) =>
                n.id === id ? { ...n, jobId: jobId ? Number(jobId) : null } : n
            )
        );
    };

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const filtered = filteredNotes();
        const sourceIndex = result.source.index;
        const destIndex = result.destination.index;

        const updatedFiltered = Array.from(filtered);
        const [moved] = updatedFiltered.splice(sourceIndex, 1);
        updatedFiltered.splice(destIndex, 0, moved);

        // Rebuild global notes based on filtered drag
        const newNotes = [...notes];
        let globalIndex = 0;
        for (let i = 0; i < newNotes.length; i++) {
            if (isVisibleInCurrentTab(newNotes[i])) {
                newNotes[i] = updatedFiltered[globalIndex++];
            }
        }
        setNotes(newNotes);
    };

    const filteredNotes = () => {
        if (activeJobId === "all") return notes;
        if (activeJobId === "unassigned") return notes.filter((n) => !n.jobId);
        return notes.filter((n) => n.jobId === Number(activeJobId));
    };

    const isVisibleInCurrentTab = (note) => {
        if (activeJobId === "all") return true;
        if (activeJobId === "unassigned") return !note.jobId;
        return note.jobId === Number(activeJobId);
    };

    const getJobLabel = (jobId) => {
        const job = jobs.find((j) => j.id === jobId);
        return job ? `${job.company} · ${job.title}` : "Unassigned";
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Tabs */}
            <div className="flex gap-2 flex-wrap mb-4">
                {[
                    { id: "all", label: "📋 All" },
                    { id: "unassigned", label: "📂 Unassigned" },
                    ...jobs.map((j) => ({
                        id: String(j.id),
                        label: `🏢 ${j.company} · ${j.title}`,
                    })),
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveJobId(tab.id)}
                        className={`px-3 py-1 text-sm rounded-full border ${
                            activeJobId === tab.id
                                ? "bg-black text-white"
                                : "hover:bg-gray-100"
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">🧠 Interview Notes</h2>
                <button
                    onClick={handleAddNote}
                    className="flex items-center gap-1 px-3 py-1 text-sm rounded border border-black bg-black text-white hover:bg-gray-800"
                >
                    <Plus size={16} />
                    Add Note
                </button>
            </div>

            {/* Notes */}
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="notes">
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex flex-col gap-4"
                        >
                            {filteredNotes().map((note, index) => (
                                <Draggable
                                    key={note.id}
                                    draggableId={note.id}
                                    index={index}
                                >
                                    {(provided) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            className="relative bg-white border rounded-xl shadow-sm hover:shadow-md transition p-4"
                                        >
                                            {/* Drag Handle */}
                                            <div
                                                {...provided.dragHandleProps}
                                                className="absolute top-4 left-4 text-gray-400 cursor-move hover:text-black"
                                            >
                                                <GripVertical size={16} />
                                            </div>

                                            {/* Job binding */}
                                            <div className="ml-8 mb-2">
                                                <select
                                                    value={note.jobId ?? ""}
                                                    onChange={(e) =>
                                                        handleJobBind(
                                                            note.id,
                                                            e.target.value
                                                        )
                                                    }
                                                    className="text-xs border rounded px-2 py-1"
                                                >
                                                    <option value="">Unassigned</option>
                                                    {jobs.map((job) => (
                                                        <option key={job.id} value={job.id}>
                                                            {job.company} · {job.title}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            {/* Content */}
                                            <div className="pl-8 pr-4 pb-10">
                                                {note.editing ? (
                                                    <textarea
                                                        value={note.content}
                                                        onChange={(e) =>
                                                            handleChangeContent(note.id, e.target.value)
                                                        }
                                                        className="w-full min-h-[160px] p-3 border rounded resize-none font-mono text-sm"
                                                    />
                                                ) : (
                                                    <div className="prose max-w-none text-sm">
                                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                            {note.content}
                                                        </ReactMarkdown>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Button */}
                                            <div className="absolute bottom-4 right-4">
                                                <button
                                                    onClick={() => handleToggleEdit(note.id)}
                                                    className="flex items-center gap-1 px-3 py-1 text-xs rounded border border-black bg-black text-white hover:bg-gray-800"
                                                >
                                                    {note.editing ? (
                                                        <>
                                                            <Check size={14} /> Done
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Pencil size={14} /> Edit
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default InterviewNotesPage;
