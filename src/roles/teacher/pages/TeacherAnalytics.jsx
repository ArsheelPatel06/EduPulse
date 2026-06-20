// src/roles/teacher/pages/TeacherAnalytics.jsx
import React, { useMemo, useState } from 'react';
import { useAppState } from '../../../state/appState';
import { motion } from 'framer-motion';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, Legend, RadarChart, Radar, PolarGrid,
    PolarAngleAxis, PolarRadiusAxis, ScatterChart, Scatter, ZAxis
} from 'recharts';
import RiskBadge from '../../../components/RiskBadge';
import { weeklyAttendanceData, weeklyPerformanceData } from '../../../data/mockStudents';
import { BarChart2, TrendingUp, Users, AlertTriangle } from 'lucide-react';

const COLORS = { primary: '#3b82f6', purple: '#9333ea', success: '#22c55e', warning: '#f59e0b', danger: '#ef4444', teal: '#14b8a6' };

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-surface border-2 border-border rounded-xl p-3 shadow-xl text-xs">
            <p className="font-bold text-muted mb-1">{label}</p>
            {payload.map((p, i) => (
                <p key={i} className="font-bold" style={{ color: p.color }}>{p.name}: {p.value}{typeof p.value === 'number' && p.value <= 100 ? '%' : ''}</p>
            ))}
        </div>
    );
};

const engagementTrend = [
    { week: 'Week 1', engagement: 65, xpEarned: 8200, active: 18 },
    { week: 'Week 2', engagement: 68, xpEarned: 9100, active: 19 },
    { week: 'Week 3', engagement: 62, xpEarned: 7800, active: 17 },
    { week: 'Week 4', engagement: 70, xpEarned: 10200, active: 20 },
    { week: 'Week 5', engagement: 67, xpEarned: 9500, active: 19 },
    { week: 'Week 6', engagement: 72, xpEarned: 11000, active: 20 },
    { week: 'Week 7', engagement: 69, xpEarned: 9800, active: 19 },
    { week: 'Week 8', engagement: 74, xpEarned: 11500, active: 20 },
];

const subjectPerformance = [
    { subject: 'HTML5', avgScore: 78, attendance: 88, completion: 82 },
    { subject: 'CSS3', avgScore: 72, attendance: 84, completion: 75 },
    { subject: 'JavaScript', avgScore: 65, attendance: 79, completion: 61 },
    { subject: 'Data Str.', avgScore: 58, attendance: 76, completion: 52 },
    { subject: 'Algorithms', avgScore: 54, attendance: 73, completion: 45 },
    { subject: 'OS', avgScore: 61, attendance: 80, completion: 58 },
];

const ChartCard = ({ title, subtitle, children, delay = 0 }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
        className="bg-surface border-2 border-border rounded-2xl p-5">
        <div className="mb-4">
            <h3 className="font-black text-base text-main">{title}</h3>
            {subtitle && <p className="text-xs text-muted font-medium mt-0.5">{subtitle}</p>}
        </div>
        {children}
    </motion.div>
);

const TeacherAnalytics = () => {
    const { state } = useAppState();
    const students = state.teacherStudents || [];

    const [rankPage, setRankPage] = useState(0);
    const PAGE_SIZE = 5;

    const sortedByScore = useMemo(() =>
        [...students].sort((a, b) => (b.academicScore || 0) - (a.academicScore || 0)), [students]);

    const atRisk = students.filter(s => s.riskLevel === 'high');
    const medRisk = students.filter(s => s.riskLevel === 'medium');

    const rankPaged = sortedByScore.slice(rankPage * PAGE_SIZE, (rankPage + 1) * PAGE_SIZE);
    const totalPages = Math.ceil(sortedByScore.length / PAGE_SIZE);

    // Risk distribution for bar chart
    const riskDist = [
        { name: 'Low Risk', value: students.filter(s => s.riskLevel === 'low').length, fill: COLORS.success },
        { name: 'Medium Risk', value: students.filter(s => s.riskLevel === 'medium').length, fill: COLORS.warning },
        { name: 'High Risk', value: students.filter(s => s.riskLevel === 'high').length, fill: COLORS.danger },
    ];

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-black text-main">Analytics Dashboard</h1>
                <p className="text-muted font-medium mt-1">Comprehensive view of class performance, attendance, and engagement.</p>
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartCard title="Attendance Trend" subtitle="8-week class average" delay={0.1}>
                    <ResponsiveContainer width="100%" height={220}>
                        <AreaChart data={weeklyAttendanceData}>
                            <defs>
                                <linearGradient id="attGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.25} />
                                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[60, 100]} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="avg" stroke={COLORS.primary} strokeWidth={2.5} fill="url(#attGrad)" name="Attendance" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Performance Trend" subtitle="Score range across all students" delay={0.15}>
                    <ResponsiveContainer width="100%" height={220}>
                        <LineChart data={weeklyPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Line type="monotone" dataKey="avgScore" stroke={COLORS.primary} strokeWidth={2.5} dot={false} name="Average" />
                            <Line type="monotone" dataKey="topScore" stroke={COLORS.success} strokeWidth={1.5} dot={false} name="Top" strokeDasharray="4 2" />
                            <Line type="monotone" dataKey="bottomScore" stroke={COLORS.danger} strokeWidth={1.5} dot={false} name="Bottom" strokeDasharray="4 2" />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Charts Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ChartCard title="Engagement Trend" subtitle="Weekly engagement score" delay={0.2} >
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={engagementTrend}>
                            <defs>
                                <linearGradient id="engGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS.purple} stopOpacity={0.25} />
                                    <stop offset="95%" stopColor={COLORS.purple} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="engagement" stroke={COLORS.purple} strokeWidth={2} fill="url(#engGrad)" name="Engagement" />
                        </AreaChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Subject Performance" subtitle="Avg score & attendance by subject" delay={0.25}>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={subjectPerformance}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="subject" tick={{ fontSize: 9, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[0, 100]} tick={{ fontSize: 9, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="avgScore" name="Avg Score" fill={COLORS.primary} radius={[3, 3, 0, 0]} />
                            <Bar dataKey="attendance" name="Attendance" fill={COLORS.teal} radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                <ChartCard title="Risk Distribution" subtitle="Students by risk category" delay={0.3}>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={riskDist} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" horizontal={false} />
                            <XAxis type="number" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={80} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" name="Students" radius={[0, 6, 6, 0]}>
                                {riskDist.map((entry, i) => (
                                    <rect key={i} fill={entry.fill} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>
            </div>

            {/* Rankings & At-Risk */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Student Rankings */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-blue-500" />
                            <h3 className="font-black text-base text-main">Student Rankings</h3>
                        </div>
                        <div className="flex items-center gap-1">
                            <button onClick={() => setRankPage(p => Math.max(0, p - 1))} disabled={rankPage === 0}
                                className="w-6 h-6 rounded-lg bg-base border border-border text-xs font-bold text-muted hover:text-main disabled:opacity-30 transition-colors">‹</button>
                            <span className="text-xs font-bold text-muted px-2">{rankPage + 1}/{totalPages}</span>
                            <button onClick={() => setRankPage(p => Math.min(totalPages - 1, p + 1))} disabled={rankPage === totalPages - 1}
                                className="w-6 h-6 rounded-lg bg-base border border-border text-xs font-bold text-muted hover:text-main disabled:opacity-30 transition-colors">›</button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {rankPaged.map((s, i) => (
                            <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-base transition-colors">
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 ${i + rankPage * PAGE_SIZE < 3 ? 'bg-amber-500 text-white' : 'bg-base border border-border text-muted'}`}>
                                    #{i + rankPage * PAGE_SIZE + 1}
                                </span>
                                <div className="w-7 h-7 rounded-full bg-blue-500/15 flex items-center justify-center font-black text-blue-500 text-xs shrink-0">{s.name.charAt(0)}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm text-main truncate">{s.name}</p>
                                    <div className="flex items-center gap-2">
                                        <div className="h-1 w-20 bg-base rounded-full overflow-hidden border border-border">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.academicScore}%` }} />
                                        </div>
                                        <span className="text-xs font-bold text-blue-500">{s.academicScore}%</span>
                                    </div>
                                </div>
                                <RiskBadge level={s.riskLevel} showLabel={false} size="dot" />
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* At-Risk Panel */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <h3 className="font-black text-base text-main">At-Risk Students</h3>
                        <span className="ml-auto text-xs font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded-lg">{atRisk.length} HIGH · {medRisk.length} MEDIUM</span>
                    </div>
                    <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                        {[...atRisk, ...medRisk].slice(0, 10).map(s => (
                            <div key={s.id} className={`flex items-center gap-3 p-2.5 rounded-xl border ${s.riskLevel === 'high' ? 'bg-red-500/5 border-red-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                                <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center font-black text-sm text-main shrink-0">{s.name.charAt(0)}</div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-sm text-main truncate">{s.name}</p>
                                    <p className="text-xs text-muted font-medium">Att: {s.attendance}% · Score: {s.academicScore}%</p>
                                </div>
                                <RiskBadge level={s.riskLevel} />
                            </div>
                        ))}
                        {atRisk.length + medRisk.length === 0 && (
                            <p className="text-center py-8 text-muted font-medium text-sm">🎉 No at-risk students</p>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TeacherAnalytics;
