// src/roles/teacher/pages/StudentManagement.jsx
import React, { useState, useMemo } from 'react';
import { useAppState } from '../../../state/appState';
import { motion, AnimatePresence } from 'framer-motion';
import RiskBadge from '../../../components/RiskBadge';
import { getStaticRecommendation } from '../../../services/analyticsEngine';
import {
    Search, Filter, X, ChevronDown, Users, ArrowUpDown,
    BookOpen, Calendar, Zap, TrendingUp, AlertTriangle, CheckCircle, Clock
} from 'lucide-react';

// Student Detail Modal
const StudentDetailModal = ({ student, onClose }) => {
    if (!student) return null;
    const recs = getStaticRecommendation(student, student.academicScore, student.engagementScore);
    const quizAvg = student.quizScores?.length > 0
        ? Math.round(student.quizScores.reduce((a, b) => a + b, 0) / student.quizScores.length)
        : 0;

    const stats = [
        { label: 'Academic Score', value: `${student.academicScore}%`, color: student.academicScore >= 70 ? 'text-green-500' : student.academicScore >= 50 ? 'text-amber-500' : 'text-red-500' },
        { label: 'Engagement', value: `${student.engagementScore}%`, color: 'text-blue-500' },
        { label: 'Attendance', value: `${student.attendance}%`, color: student.attendance >= 75 ? 'text-green-500' : 'text-red-500' },
        { label: 'Quiz Average', value: `${quizAvg}%`, color: 'text-purple-500' },
        { label: 'Learning Score', value: student.xp?.toLocaleString(), color: 'text-amber-500' },
        { label: 'Streak', value: `${student.streak} days`, color: student.streak > 0 ? 'text-green-500' : 'text-muted' },
    ];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-surface border-2 border-border rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]"
            >
                {/* Header */}
                <div className="p-5 border-b-2 border-border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 border-2 border-blue-500/30 flex items-center justify-center font-black text-blue-500 text-lg">
                        {student.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h2 className="font-black text-lg text-main">{student.name}</h2>
                        <p className="text-xs text-muted font-medium">{student.id} · {student.course} · Year {student.year}</p>
                    </div>
                    <RiskBadge level={student.riskLevel} />
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-base transition-colors text-muted"><X className="w-5 h-5" /></button>
                </div>

                {/* Stats Grid */}
                <div className="p-5 grid grid-cols-3 gap-3">
                    {stats.map(({ label, value, color }) => (
                        <div key={label} className="bg-base border-2 border-border rounded-xl p-3 text-center">
                            <p className={`text-lg font-black ${color}`}>{value}</p>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-wider">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Assignments */}
                <div className="px-5 pb-3">
                    <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Assignments</p>
                    <div className="h-2.5 bg-base rounded-full overflow-hidden border border-border">
                        <div
                            className="h-full bg-purple-600 rounded-full transition-all"
                            style={{ width: `${(student.assignmentsCompleted / student.totalAssignments) * 100}%` }}
                        />
                    </div>
                    <p className="text-xs text-muted font-medium mt-1">{student.assignmentsCompleted} / {student.totalAssignments} completed</p>
                </div>

                {/* Quiz History */}
                <div className="px-5 pb-4">
                    <p className="text-xs font-bold text-muted uppercase tracking-wider mb-2">Recent Quiz Scores</p>
                    <div className="flex gap-2">
                        {student.quizScores?.map((score, i) => (
                            <div key={i} className={`flex-1 rounded-lg p-2 text-center text-sm font-black border-2 ${score >= 70 ? 'bg-green-500/10 border-green-500/30 text-green-500' : score >= 50 ? 'bg-amber-500/10 border-amber-500/30 text-amber-500' : 'bg-red-500/10 border-red-500/30 text-red-500'}`}>
                                {score}
                            </div>
                        ))}
                    </div>
                </div>

                {/* AI Recommendations */}
                <div className="px-5 pb-5">
                    <div className="bg-blue-500/5 border-2 border-blue-500/20 rounded-xl p-4">
                        <p className="text-xs font-black text-blue-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" /> AI Recommendations
                        </p>
                        <ul className="space-y-2">
                            {recs.map((rec, i) => (
                                <li key={i} className="text-xs text-muted font-medium flex items-start gap-2">
                                    <span className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-500 text-[9px] font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const StudentManagement = () => {
    const { state } = useAppState();
    const students = state.teacherStudents || [];

    const [search, setSearch] = useState('');
    const [riskFilter, setRiskFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [sortDir, setSortDir] = useState('asc');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const toggleSort = (col) => {
        if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortBy(col); setSortDir('asc'); }
    };

    const filtered = useMemo(() => {
        return students
            .filter(s => {
                const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
                    s.id.toLowerCase().includes(search.toLowerCase()) ||
                    s.course.toLowerCase().includes(search.toLowerCase());
                const matchRisk = riskFilter === 'all' || s.riskLevel === riskFilter;
                return matchSearch && matchRisk;
            })
            .sort((a, b) => {
                const dir = sortDir === 'asc' ? 1 : -1;
                if (sortBy === 'name') return dir * a.name.localeCompare(b.name);
                if (sortBy === 'attendance') return dir * (a.attendance - b.attendance);
                if (sortBy === 'academic') return dir * ((a.academicScore || 0) - (b.academicScore || 0));
                if (sortBy === 'engagement') return dir * ((a.engagementScore || 0) - (b.engagementScore || 0));
                return 0;
            });
    }, [students, search, riskFilter, sortBy, sortDir]);

    const riskCounts = useMemo(() => ({
        all: students.length,
        low: students.filter(s => s.riskLevel === 'low').length,
        medium: students.filter(s => s.riskLevel === 'medium').length,
        high: students.filter(s => s.riskLevel === 'high').length,
    }), [students]);

    const SortBtn = ({ col, label }) => (
        <button onClick={() => toggleSort(col)} className="flex items-center gap-1 hover:text-blue-500 transition-colors">
            {label}
            <ArrowUpDown className={`w-3 h-3 ${sortBy === col ? 'text-blue-500' : 'text-muted'}`} />
        </button>
    );

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-black text-main">Student Management</h1>
                <p className="text-muted font-medium mt-1">Track academic performance, engagement, and risk levels.</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted" />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name, ID or course..."
                        className="w-full bg-surface border-2 border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-main placeholder-muted focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    {search && <button onClick={() => setSearch('')} className="absolute right-3 top-3 text-muted hover:text-main"><X className="w-4 h-4" /></button>}
                </div>

                {/* Risk Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                    {[
                        { key: 'all', label: 'All', color: 'border-border text-main' },
                        { key: 'low', label: 'Low Risk', color: 'border-green-500/40 text-green-500' },
                        { key: 'medium', label: 'Medium', color: 'border-amber-500/40 text-amber-500' },
                        { key: 'high', label: 'High Risk', color: 'border-red-500/40 text-red-500' },
                    ].map(({ key, label, color }) => (
                        <button
                            key={key} onClick={() => setRiskFilter(key)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold border-2 transition-all ${riskFilter === key ? color + ' bg-current/5' : 'border-border text-muted hover:border-gray-400'}`}
                        >
                            {label} ({riskCounts[key]})
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-surface border-2 border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-border bg-base">
                                <th className="text-left px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">
                                    <SortBtn col="name" label="Student" />
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-black text-muted uppercase tracking-wider hidden md:table-cell">Course</th>
                                <th className="text-left px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">
                                    <SortBtn col="attendance" label="Attendance" />
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-black text-muted uppercase tracking-wider hidden lg:table-cell">
                                    <SortBtn col="academic" label="Avg Score" />
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-black text-muted uppercase tracking-wider hidden xl:table-cell">
                                    <SortBtn col="engagement" label="Engagement" />
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">Risk Level</th>
                                <th className="text-left px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((student, i) => (
                                <motion.tr
                                    key={student.id}
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                                    className="border-b border-border last:border-0 hover:bg-base transition-colors"
                                >
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-500/30 flex items-center justify-center font-black text-blue-500 text-sm shrink-0">
                                                {student.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-main">{student.name}</p>
                                                <p className="text-xs text-muted font-medium">{student.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">
                                        <p className="text-sm font-medium text-muted">{student.course}</p>
                                        <p className="text-xs text-muted/60">Year {student.year}</p>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-base rounded-full overflow-hidden border border-border">
                                                <div
                                                    className={`h-full rounded-full ${student.attendance >= 75 ? 'bg-green-500' : student.attendance >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                                                    style={{ width: `${student.attendance}%` }}
                                                />
                                            </div>
                                            <span className={`text-sm font-bold ${student.attendance >= 75 ? 'text-green-500' : student.attendance >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                                                {student.attendance}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 hidden lg:table-cell">
                                        <span className={`font-bold text-sm ${student.academicScore >= 70 ? 'text-green-500' : student.academicScore >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                                            {student.academicScore}%
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 hidden xl:table-cell">
                                        <div className="flex items-center gap-1">
                                            <div className="w-12 h-1.5 bg-base rounded-full overflow-hidden border border-border">
                                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${student.engagementScore}%` }} />
                                            </div>
                                            <span className="text-xs font-bold text-blue-500">{student.engagementScore}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <RiskBadge level={student.riskLevel} />
                                    </td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => setSelectedStudent(student)}
                                            className="text-xs font-bold text-blue-500 hover:bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors border border-blue-500/30"
                                        >
                                            View
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {filtered.length === 0 && (
                        <div className="text-center py-12 text-muted">
                            <Users className="w-8 h-8 mx-auto mb-2 opacity-40" />
                            <p className="font-bold">No students found</p>
                        </div>
                    )}
                </div>
                <div className="px-4 py-2 border-t border-border bg-base">
                    <p className="text-xs font-bold text-muted">{filtered.length} of {students.length} students</p>
                </div>
            </div>

            {/* Student Detail Modal */}
            <AnimatePresence>
                {selectedStudent && <StudentDetailModal student={selectedStudent} onClose={() => setSelectedStudent(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default StudentManagement;
