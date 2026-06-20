// src/roles/teacher/pages/CurriculumManager.jsx
import React, { useState } from 'react';
import { useAppState } from '../../../state/appState';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BookOpen, Plus, Trash2, Eye, EyeOff, ChevronDown, ChevronRight,
    FileQuestion, Layers, GraduationCap, CheckCircle, X, Tag
} from 'lucide-react';

// Modal for creating a new learning path
const CreatePathModal = ({ onSave, onClose }) => {
    const [form, setForm] = useState({ title: '', subject: '', chapter: '', description: '', difficulty: 'Beginner', xpReward: 500, type: 'learning_path' });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface border-2 border-border rounded-2xl w-full max-w-lg shadow-2xl">
                <div className="p-5 border-b-2 border-border flex items-center justify-between">
                    <h2 className="font-black text-lg text-main">Create Learning Path</h2>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-base transition-colors text-muted"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-5 space-y-4">
                    {[
                        { label: 'Title', key: 'title', placeholder: 'e.g. Introduction to Linked Lists' },
                        { label: 'Subject', key: 'subject', placeholder: 'e.g. Data Structures' },
                        { label: 'Chapter', key: 'chapter', placeholder: 'e.g. Chapter 3: Linear Data Structures' },
                    ].map(({ label, key, placeholder }) => (
                        <div key={key}>
                            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">{label}</label>
                            <input
                                value={form[key]} onChange={e => set(key, e.target.value)} placeholder={placeholder}
                                className="w-full bg-base border-2 border-border rounded-xl py-2.5 px-4 text-sm text-main placeholder-muted focus:outline-none focus:border-blue-500 transition-colors"
                            />
                        </div>
                    ))}
                    <div>
                        <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Description</label>
                        <textarea
                            value={form.description} onChange={e => set('description', e.target.value)} rows={2} placeholder="Brief description of this learning path..."
                            className="w-full bg-base border-2 border-border rounded-xl py-2.5 px-4 text-sm text-main placeholder-muted focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Difficulty</label>
                            <select value={form.difficulty} onChange={e => set('difficulty', e.target.value)}
                                className="w-full bg-base border-2 border-border rounded-xl py-2.5 px-3 text-sm text-main focus:outline-none focus:border-blue-500 transition-colors">
                                {['Beginner', 'Intermediate', 'Advanced'].map(d => <option key={d}>{d}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">XP Reward</label>
                            <input type="number" value={form.xpReward} onChange={e => set('xpReward', +e.target.value)} min={100} step={100}
                                className="w-full bg-base border-2 border-border rounded-xl py-2.5 px-3 text-sm text-main focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Content Type</label>
                        <div className="flex gap-2">
                            {[
                                { type: 'learning_path', label: 'Learning Path', icon: GraduationCap },
                                { type: 'quiz', label: 'Quiz Set', icon: FileQuestion },
                                { type: 'flashcard', label: 'Flashcard Set', icon: Layers },
                            ].map(({ type, label, icon: Icon }) => (
                                <button key={type} onClick={() => set('type', type)}
                                    className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl border-2 text-xs font-bold transition-all ${form.type === type ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-border text-muted hover:border-gray-400'}`}>
                                    <Icon className="w-4 h-4" />{label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="p-5 border-t-2 border-border flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 border-2 border-border rounded-xl text-sm font-bold text-muted hover:text-main transition-colors">Cancel</button>
                    <button
                        onClick={() => { if (form.title && form.subject) { onSave(form); onClose(); } }}
                        disabled={!form.title || !form.subject}
                        className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                        Create (Draft)
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const difficultyColors = {
    Beginner: 'text-green-500 bg-green-500/10 border-green-500/30',
    Intermediate: 'text-amber-500 bg-amber-500/10 border-amber-500/30',
    Advanced: 'text-red-500 bg-red-500/10 border-red-500/30',
};

const typeIcons = {
    learning_path: GraduationCap,
    quiz: FileQuestion,
    flashcard: Layers,
};

// Seed curriculum items so the page isn't empty on first load
const seedCurriculum = [
    { id: 'SEED_1', title: 'Introduction to Linked Lists', subject: 'Data Structures', chapter: 'Chapter 3: Linear Data Structures', description: 'Understand singly and doubly linked lists, insertion/deletion operations.', difficulty: 'Intermediate', xpReward: 750, type: 'learning_path', status: 'published', createdAt: '2026-06-15T10:00:00Z' },
    { id: 'SEED_2', title: 'SQL Joins & Normalization', subject: 'DBMS', chapter: 'Chapter 5: Relational Algebra', description: 'Master INNER, LEFT, RIGHT, FULL joins and normal forms (1NF–3NF).', difficulty: 'Advanced', xpReward: 1200, type: 'quiz', status: 'published', createdAt: '2026-06-16T10:00:00Z' },
    { id: 'SEED_3', title: 'CSS Flexbox & Grid', subject: 'Web Development', chapter: 'Chapter 2: Layouts', description: 'Build responsive layouts using modern CSS layout techniques.', difficulty: 'Beginner', xpReward: 500, type: 'flashcard', status: 'draft', createdAt: '2026-06-17T10:00:00Z' },
    { id: 'SEED_4', title: 'Process Scheduling Algorithms', subject: 'Operating Systems', chapter: 'Chapter 4: CPU Scheduling', description: 'FCFS, SJF, Round Robin, and Priority Scheduling with Gantt charts.', difficulty: 'Advanced', xpReward: 1000, type: 'learning_path', status: 'published', createdAt: '2026-06-18T10:00:00Z' },
];

const CurriculumManager = () => {
    const { state, dispatch } = useAppState();
    const [showModal, setShowModal] = useState(false);
    const [filterSubject, setFilterSubject] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    // Combine seed + teacher-created
    const allCurriculum = [...seedCurriculum, ...(state.teacherCurriculum || [])];

    const subjects = ['all', ...new Set(allCurriculum.map(c => c.subject))];

    const filtered = allCurriculum.filter(c => {
        const matchSub = filterSubject === 'all' || c.subject === filterSubject;
        const matchStatus = filterStatus === 'all' || c.status === filterStatus;
        return matchSub && matchStatus;
    });

    const handleSave = (form) => {
        dispatch({ type: 'TEACHER_ADD_CURRICULUM', payload: form });
    };

    const handlePublish = (id) => {
        if (!seedCurriculum.find(s => s.id === id)) {
            dispatch({ type: 'TEACHER_PUBLISH_CURRICULUM', payload: id });
        }
    };

    const handleDelete = (id) => {
        if (!seedCurriculum.find(s => s.id === id)) {
            dispatch({ type: 'TEACHER_DELETE_CURRICULUM', payload: id });
        }
    };

    const pubCount = allCurriculum.filter(c => c.status === 'published').length;
    const draftCount = allCurriculum.filter(c => c.status === 'draft').length;

    return (
        <div className="p-6 space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-main">Curriculum Manager</h1>
                    <p className="text-muted font-medium mt-1">Create and publish learning paths, quizzes, and flashcard sets.</p>
                </div>
                <button onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shrink-0">
                    <Plus className="w-4 h-4" /> Create Content
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Content', value: allCurriculum.length, color: 'text-blue-500' },
                    { label: 'Published', value: pubCount, color: 'text-green-500' },
                    { label: 'Drafts', value: draftCount, color: 'text-amber-500' },
                ].map(({ label, value, color }) => (
                    <div key={label} className="bg-surface border-2 border-border rounded-xl p-4 text-center">
                        <p className={`text-2xl font-black ${color}`}>{value}</p>
                        <p className="text-xs font-bold text-muted uppercase tracking-wider mt-1">{label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
                <div className="flex gap-1.5 bg-surface border-2 border-border rounded-xl p-1 flex-wrap">
                    {subjects.map(s => (
                        <button key={s} onClick={() => setFilterSubject(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${filterSubject === s ? 'bg-blue-500/20 text-blue-500' : 'text-muted hover:text-main'}`}>
                            {s === 'all' ? 'All Subjects' : s}
                        </button>
                    ))}
                </div>
                <div className="flex gap-1.5 bg-surface border-2 border-border rounded-xl p-1">
                    {['all', 'published', 'draft'].map(s => (
                        <button key={s} onClick={() => setFilterStatus(s)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${filterStatus === s ? 'bg-blue-500/20 text-blue-500' : 'text-muted hover:text-main'}`}>
                            {s === 'all' ? 'All Status' : s}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filtered.map((item, i) => {
                    const TypeIcon = typeIcons[item.type] || BookOpen;
                    const isPublished = item.status === 'published';
                    const isSeeded = !!seedCurriculum.find(s => s.id === item.id);

                    return (
                        <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                            className="bg-surface border-2 border-border rounded-2xl p-5 hover:border-blue-500/40 transition-colors group">
                            <div className="flex items-start gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                                    <TypeIcon className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <h3 className="font-black text-sm text-main leading-tight">{item.title}</h3>
                                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${difficultyColors[item.difficulty]}`}>{item.difficulty}</span>
                                    </div>
                                    <p className="text-xs text-muted font-medium mt-0.5">{item.subject} · {item.chapter || 'No chapter'}</p>
                                </div>
                                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border shrink-0 ${isPublished ? 'bg-green-500/10 border-green-500/30 text-green-500' : 'bg-amber-500/10 border-amber-500/30 text-amber-500'}`}>
                                    {item.status}
                                </span>
                            </div>

                            {item.description && <p className="text-xs text-muted font-medium mb-3 line-clamp-2">{item.description}</p>}

                            <div className="flex items-center gap-3 text-xs font-bold text-muted mb-4">
                                <span className="flex items-center gap-1"><Tag className="w-3 h-3" />{item.type.replace('_', ' ')}</span>
                                <span className="flex items-center gap-1 text-amber-500"><span>⚡</span>{item.xpReward} XP</span>
                            </div>

                            <div className="flex gap-2">
                                {!isPublished && (
                                    <button onClick={() => handlePublish(item.id)}
                                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-colors ${isSeeded ? 'opacity-50 cursor-not-allowed bg-base border border-border text-muted' : 'bg-green-500/10 border border-green-500/30 text-green-500 hover:bg-green-500/20'}`}
                                        disabled={isSeeded}>
                                        <Eye className="w-3.5 h-3.5" /> Publish
                                    </button>
                                )}
                                {isPublished && (
                                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold bg-green-500/10 border border-green-500/30 text-green-500 cursor-default">
                                        <CheckCircle className="w-3.5 h-3.5" /> Live
                                    </button>
                                )}
                                {!isSeeded && (
                                    <button onClick={() => handleDelete(item.id)}
                                        className="p-2 rounded-xl text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors border border-border">
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-muted">
                    <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-bold text-lg">No curriculum items yet</p>
                    <p className="text-sm">Click "Create Content" to add your first learning path.</p>
                </div>
            )}

            {/* Teacher → Student notice */}
            <div className="bg-blue-500/5 border-2 border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
                <GraduationCap className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm text-muted font-medium">
                    <span className="text-blue-500 font-bold">Published</span> content automatically appears in your students' Learning Paths and Assignments sections.
                </p>
            </div>

            <AnimatePresence>
                {showModal && <CreatePathModal onSave={handleSave} onClose={() => setShowModal(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default CurriculumManager;
