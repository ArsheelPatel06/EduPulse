// src/roles/teacher/pages/AssignmentManager.jsx
import React, { useState } from 'react';
import { useAppState } from '../../../state/appState';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Plus, Trash2, Calendar, Users, BookOpen, X, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const seedAssignments = [
    { id: 'SA_1', title: 'Linked Lists Implementation', subject: 'Data Structures', type: 'coding', dueDate: new Date(Date.now() + 3 * 86400000).toISOString(), description: 'Implement a singly linked list with insert, delete, and search operations in Python.', xpReward: 500, assignedTo: 'all', status: 'active', createdAt: '2026-06-17T10:00:00Z' },
    { id: 'SA_2', title: 'SQL Joins Practice', subject: 'DBMS', type: 'quiz', dueDate: new Date(Date.now() + 5 * 86400000).toISOString(), description: 'Complete 10 SQL join questions covering INNER, LEFT, RIGHT, and FULL joins.', xpReward: 300, assignedTo: 'all', status: 'active', createdAt: '2026-06-18T10:00:00Z' },
    { id: 'SA_3', title: 'CSS Responsive Layout', subject: 'Web Development', type: 'project', dueDate: new Date(Date.now() - 2 * 86400000).toISOString(), description: 'Build a fully responsive webpage using Flexbox and CSS Grid.', xpReward: 800, assignedTo: 'all', status: 'completed', createdAt: '2026-06-10T10:00:00Z' },
    { id: 'SA_4', title: 'OS Scheduling Quiz', subject: 'Operating Systems', type: 'quiz', dueDate: new Date(Date.now() + 7 * 86400000).toISOString(), description: 'Answer questions on FCFS, SJF, Round Robin with Gantt chart problems.', xpReward: 400, assignedTo: 'all', status: 'active', createdAt: '2026-06-19T10:00:00Z' },
    { id: 'SA_5', title: 'Algorithm Analysis Report', subject: 'Algorithms', type: 'report', dueDate: new Date(Date.now() + 10 * 86400000).toISOString(), description: 'Write a report comparing time complexities of Sorting algorithms.', xpReward: 600, assignedTo: 'all', status: 'draft', createdAt: '2026-06-19T12:00:00Z' },
];

const typeColors = {
    quiz:    { bg: 'bg-purple-500/10', text: 'text-purple-500', border: 'border-purple-500/30' },
    coding:  { bg: 'bg-blue-500/10',   text: 'text-blue-500',   border: 'border-blue-500/30' },
    project: { bg: 'bg-amber-500/10',  text: 'text-amber-500',  border: 'border-amber-500/30' },
    report:  { bg: 'bg-teal-500/10',   text: 'text-teal-500',   border: 'border-teal-500/30' },
};

const CreateAssignmentModal = ({ onSave, onClose }) => {
    const [form, setForm] = useState({ title: '', subject: '', type: 'quiz', description: '', dueDate: '', xpReward: 300, assignedTo: 'all' });
    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface border-2 border-border rounded-2xl w-full max-w-lg shadow-2xl">
                <div className="p-5 border-b-2 border-border flex items-center justify-between">
                    <h2 className="font-black text-lg text-main">Create Assignment</h2>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-base transition-colors text-muted"><X className="w-5 h-5" /></button>
                </div>
                <div className="p-5 space-y-4">
                    <div>
                        <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Title *</label>
                        <input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Assignment title"
                            className="w-full bg-base border-2 border-border rounded-xl py-2.5 px-4 text-sm text-main placeholder-muted focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Subject *</label>
                            <input value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="e.g. DBMS"
                                className="w-full bg-base border-2 border-border rounded-xl py-2.5 px-3 text-sm text-main placeholder-muted focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Type</label>
                            <select value={form.type} onChange={e => set('type', e.target.value)}
                                className="w-full bg-base border-2 border-border rounded-xl py-2.5 px-3 text-sm text-main focus:outline-none focus:border-blue-500 transition-colors">
                                {['quiz', 'coding', 'project', 'report'].map(t => <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Description</label>
                        <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3} placeholder="Describe the assignment task..."
                            className="w-full bg-base border-2 border-border rounded-xl py-2.5 px-4 text-sm text-main placeholder-muted focus:outline-none focus:border-blue-500 transition-colors resize-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Due Date *</label>
                            <input type="date" value={form.dueDate} onChange={e => set('dueDate', e.target.value)}
                                className="w-full bg-base border-2 border-border rounded-xl py-2.5 px-3 text-sm text-main focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                        <div>
                            <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">XP Reward</label>
                            <input type="number" value={form.xpReward} onChange={e => set('xpReward', +e.target.value)} min={100} step={100}
                                className="w-full bg-base border-2 border-border rounded-xl py-2.5 px-3 text-sm text-main focus:outline-none focus:border-blue-500 transition-colors" />
                        </div>
                    </div>
                </div>
                <div className="p-5 border-t-2 border-border flex gap-3">
                    <button onClick={onClose} className="flex-1 py-2.5 border-2 border-border rounded-xl text-sm font-bold text-muted hover:text-main transition-colors">Cancel</button>
                    <button
                        onClick={() => { if (form.title && form.subject && form.dueDate) { onSave({ ...form, status: 'active' }); onClose(); } }}
                        disabled={!form.title || !form.subject || !form.dueDate}
                        className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors disabled:opacity-50">
                        Create Assignment
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

const AssignmentManager = () => {
    const { state, dispatch } = useAppState();
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('all');

    const teacherAssignments = state.teacherAssignments || [];
    const allAssignments = [...seedAssignments, ...teacherAssignments];
    const filtered = filter === 'all' ? allAssignments : allAssignments.filter(a => a.status === filter);

    const handleSave = (form) => dispatch({ type: 'TEACHER_ADD_ASSIGNMENT', payload: form });
    const handleDelete = (id) => { if (!seedAssignments.find(s => s.id === id)) dispatch({ type: 'TEACHER_DELETE_ASSIGNMENT', payload: id }); };

    const formatDue = (dateStr) => {
        const d = new Date(dateStr);
        const now = new Date();
        const diff = Math.ceil((d - now) / 86400000);
        if (diff < 0) return { text: 'Overdue', color: 'text-red-500' };
        if (diff === 0) return { text: 'Due Today', color: 'text-amber-500' };
        if (diff <= 3) return { text: `Due in ${diff}d`, color: 'text-amber-500' };
        return { text: `Due ${d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`, color: 'text-muted' };
    };

    const counts = { all: allAssignments.length, active: allAssignments.filter(a => a.status === 'active').length, completed: allAssignments.filter(a => a.status === 'completed').length, draft: allAssignments.filter(a => a.status === 'draft').length };

    return (
        <div className="p-6 space-y-6 max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-main">Assignment Manager</h1>
                    <p className="text-muted font-medium mt-1">Create, assign, and track student assignments.</p>
                </div>
                <button onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shrink-0">
                    <Plus className="w-4 h-4" /> Create Assignment
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3">
                {[
                    { label: 'Total', value: counts.all, color: 'text-blue-500' },
                    { label: 'Active', value: counts.active, color: 'text-green-500' },
                    { label: 'Completed', value: counts.completed, color: 'text-muted' },
                    { label: 'Drafts', value: counts.draft, color: 'text-amber-500' },
                ].map(({ label, value, color }) => (
                    <div key={label} className="bg-surface border-2 border-border rounded-xl p-4 text-center">
                        <p className={`text-2xl font-black ${color}`}>{value}</p>
                        <p className="text-xs font-bold text-muted uppercase tracking-wider mt-1">{label}</p>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div className="flex gap-1.5 bg-surface border-2 border-border rounded-xl p-1 w-fit">
                {['all', 'active', 'completed', 'draft'].map(f => (
                    <button key={f} onClick={() => setFilter(f)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${filter === f ? 'bg-blue-500/20 text-blue-500' : 'text-muted hover:text-main'}`}>
                        {f} ({counts[f]})
                    </button>
                ))}
            </div>

            {/* Assignment Cards */}
            <div className="space-y-3">
                {filtered.map((a, i) => {
                    const due = formatDue(a.dueDate);
                    const tc = typeColors[a.type] || typeColors.quiz;
                    const isSeeded = !!seedAssignments.find(s => s.id === a.id);
                    return (
                        <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                            className="bg-surface border-2 border-border rounded-2xl p-5 flex items-start gap-4 hover:border-blue-500/30 transition-colors">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${tc.bg} ${tc.border}`}>
                                <ClipboardList className={`w-5 h-5 ${tc.text}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                    <h3 className="font-black text-main">{a.title}</h3>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${tc.bg} ${tc.text} ${tc.border}`}>{a.type}</span>
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border uppercase ${a.status === 'active' ? 'bg-green-500/10 text-green-500 border-green-500/30' : a.status === 'completed' ? 'bg-muted/10 text-muted border-muted/30' : 'bg-amber-500/10 text-amber-500 border-amber-500/30'}`}>{a.status}</span>
                                </div>
                                <p className="text-xs text-muted font-medium mb-2">{a.subject}</p>
                                {a.description && <p className="text-xs text-muted font-medium line-clamp-1">{a.description}</p>}
                                <div className="flex items-center gap-4 mt-2 text-xs font-bold">
                                    <span className={`flex items-center gap-1 ${due.color}`}><Clock className="w-3 h-3" />{due.text}</span>
                                    <span className="flex items-center gap-1 text-amber-500"><span>⚡</span>{a.xpReward} XP</span>
                                    <span className="flex items-center gap-1 text-muted"><Users className="w-3 h-3" />All Students</span>
                                </div>
                            </div>
                            {!isSeeded && (
                                <button onClick={() => handleDelete(a.id)}
                                    className="p-2 rounded-xl text-muted hover:text-red-500 hover:bg-red-500/10 transition-colors shrink-0">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-16 text-muted">
                    <ClipboardList className="w-10 h-10 mx-auto mb-3 opacity-30" />
                    <p className="font-bold text-lg">No assignments found</p>
                </div>
            )}

            <AnimatePresence>
                {showModal && <CreateAssignmentModal onSave={handleSave} onClose={() => setShowModal(false)} />}
            </AnimatePresence>
        </div>
    );
};

export default AssignmentManager;
