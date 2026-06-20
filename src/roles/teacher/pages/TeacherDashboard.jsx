// src/roles/teacher/pages/TeacherDashboard.jsx
import React, { useMemo } from 'react';
import { useAppState } from '../../../state/appState';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, Legend
} from 'recharts';
import StatCard from '../../../components/StatCard';
import RiskBadge from '../../../components/RiskBadge';
import { computeClassStats } from '../../../services/analyticsEngine';
import { weeklyAttendanceData, weeklyPerformanceData } from '../../../data/mockStudents';
import {
    Users, BookOpen, ClipboardList, TrendingUp, AlertTriangle, Calendar,
    ArrowRight, ChevronRight
} from 'lucide-react';

// Chart color palette
const CHART_COLORS = { primary: '#3b82f6', secondary: '#9333ea', success: '#22c55e', warning: '#f59e0b', danger: '#ef4444' };

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-surface border-2 border-border rounded-xl p-3 shadow-xl text-xs">
            <p className="font-bold text-muted mb-1">{label}</p>
            {payload.map((p, i) => (
                <p key={i} className="font-bold" style={{ color: p.color }}>{p.name}: {p.value}%</p>
            ))}
        </div>
    );
};

const courseCompletionData = [
    { name: 'HTML5', completion: 78, students: 48 },
    { name: 'CSS3', completion: 61, students: 48 },
    { name: 'JavaScript', completion: 45, students: 48 },
    { name: 'Data Structures', completion: 52, students: 35 },
    { name: 'Algorithms', completion: 38, students: 35 },
];

const TeacherDashboard = () => {
    const { state } = useAppState();
    const students = state.teacherStudents || [];
    const stats = useMemo(() => computeClassStats(students), [students]);
    const assignments = state.teacherAssignments || [];
    const curriculum = state.teacherCurriculum || [];

    // Top 5 at-risk students
    const atRiskStudents = students.filter(s => s.riskLevel === 'high').slice(0, 5);

    // Top performers
    const topStudents = [...students]
        .sort((a, b) => (b.academicScore || 0) - (a.academicScore || 0))
        .slice(0, 4);

    const statCards = [
        { title: 'Total Students', value: stats.total || 0, icon: Users, color: 'blue', subtitle: 'Enrolled this semester', trend: 8, trendLabel: 'vs last month' },
        { title: 'Active Courses', value: curriculum.filter(c => c.status === 'published').length + 4, icon: BookOpen, color: 'purple', subtitle: 'Published learning paths' },
        { title: 'Assignments Created', value: assignments.length + 6, icon: ClipboardList, color: 'teal', subtitle: 'Across all courses' },
        { title: 'Average Performance', value: `${stats.avgPerformance || 74}%`, icon: TrendingUp, color: 'green', subtitle: 'Academic score avg', trend: 3.2, trendLabel: 'vs last week' },
        { title: 'At-Risk Students', value: stats.atRisk || 0, icon: AlertTriangle, color: 'red', subtitle: 'Needs immediate attention', trend: -2, trendLabel: 'vs last month' },
        { title: 'Avg Attendance', value: `${stats.avgAttendance || 79}%`, icon: Calendar, color: 'amber', subtitle: 'This semester', trend: -1.5, trendLabel: 'vs last week' },
    ];

    return (
        <div className="p-6 space-y-8 max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl font-black text-main">
                    Teacher Dashboard
                </motion.h1>
                <p className="text-muted font-medium mt-1">Overview of your classes and student performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {statCards.map((card, i) => (
                    <div key={card.title} className={i < 2 ? 'col-span-1' : 'col-span-1'}>
                        <StatCard {...card} delay={i * 0.05} />
                    </div>
                ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Attendance Trend */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-black text-base text-main">Attendance Trend</h3>
                            <p className="text-xs text-muted font-medium">8-week class average</p>
                        </div>
                        <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg">Weekly</span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={weeklyAttendanceData}>
                            <defs>
                                <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.2} />
                                    <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="avg" stroke={CHART_COLORS.primary} strokeWidth={2} fill="url(#blueGrad)" name="Attendance" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Performance Trend */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="font-black text-base text-main">Performance Trend</h3>
                            <p className="text-xs text-muted font-medium">Score range per week</p>
                        </div>
                        <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded-lg">Scores</span>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={weeklyPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Line type="monotone" dataKey="avgScore" stroke={CHART_COLORS.primary} strokeWidth={2.5} dot={false} name="Average" />
                            <Line type="monotone" dataKey="topScore" stroke={CHART_COLORS.success} strokeWidth={1.5} dot={false} name="Top" strokeDasharray="4 2" />
                            <Line type="monotone" dataKey="bottomScore" stroke={CHART_COLORS.danger} strokeWidth={1.5} dot={false} name="Bottom" strokeDasharray="4 2" />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            {/* Course Completion Chart */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                className="bg-surface border-2 border-border rounded-2xl p-5">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="font-black text-base text-main">Course Completion</h3>
                        <p className="text-xs text-muted font-medium">% of students who completed each course</p>
                    </div>
                    <Link to="/teacher/curriculum" className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1">
                        Manage <ChevronRight className="w-3 h-3" />
                    </Link>
                </div>
                <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={courseCompletionData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                        <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                        <YAxis type="category" dataKey="name" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={100} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="completion" name="Completion" fill={CHART_COLORS.primary} radius={[0, 6, 6, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>

            {/* Bottom Row: At-Risk + Top Performers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* At-Risk Students */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <h3 className="font-black text-base text-main">At-Risk Students</h3>
                        </div>
                        <Link to="/teacher/students" className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1">
                            View All <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    {atRiskStudents.length === 0 ? (
                        <p className="text-muted text-sm font-medium text-center py-6">No high-risk students. 🎉</p>
                    ) : (
                        <div className="space-y-2.5">
                            {atRiskStudents.map(student => (
                                <div key={student.id} className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center text-red-500 font-black text-sm shrink-0">
                                        {student.name.charAt(0)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm text-main truncate">{student.name}</p>
                                        <p className="text-xs text-muted font-medium">{student.attendance}% att · {student.academicScore}% academic</p>
                                    </div>
                                    <RiskBadge level="high" showLabel={false} size="dot" />
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Top Performers */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-green-500" />
                            <h3 className="font-black text-base text-main">Top Performers</h3>
                        </div>
                        <Link to="/teacher/analytics" className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1">
                            Full Rankings <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                    <div className="space-y-2.5">
                        {topStudents.map((student, index) => (
                            <div key={student.id} className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 border border-green-500/20">
                                <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 font-black text-xs shrink-0">
                                    #{index + 1}
                                </span>
                                <div className="w-8 h-8 rounded-full bg-surface border-2 border-border flex items-center justify-center font-black text-sm text-main shrink-0">
                                    {student.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm text-main truncate">{student.name}</p>
                                    <p className="text-xs text-muted font-medium">{student.course}</p>
                                </div>
                                <span className="text-sm font-black text-green-500">{student.academicScore}%</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TeacherDashboard;
