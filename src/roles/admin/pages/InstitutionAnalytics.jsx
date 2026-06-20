// src/roles/admin/pages/InstitutionAnalytics.jsx
import React from 'react';
import { motion } from 'framer-motion';
import {
    LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import { TrendingUp, Users, BookOpen, Activity } from 'lucide-react';

const COLORS = ['#3b82f6', '#9333ea', '#22c55e', '#f59e0b', '#ef4444'];

const platformUsage = [
    { month: 'Jan', logins: 12000, assignments: 450, quizzes: 800 },
    { month: 'Feb', logins: 15000, assignments: 520, quizzes: 950 },
    { month: 'Mar', logins: 18500, assignments: 610, quizzes: 1100 },
    { month: 'Apr', logins: 22000, assignments: 780, quizzes: 1400 },
    { month: 'May', logins: 26500, assignments: 890, quizzes: 1850 },
    { month: 'Jun', logins: 31000, assignments: 1100, quizzes: 2200 },
];

const courseDistribution = [
    { name: 'Computer Science', value: 450 },
    { name: 'Information Tech', value: 380 },
    { name: 'Data Science', value: 210 },
    { name: 'Cybersecurity', value: 160 },
];

const performanceData = [
    { week: 'W1', avgScore: 65, passingRate: 82 },
    { week: 'W2', avgScore: 68, passingRate: 85 },
    { week: 'W3', avgScore: 66, passingRate: 83 },
    { week: 'W4', avgScore: 71, passingRate: 88 },
    { week: 'W5', avgScore: 73, passingRate: 89 },
    { week: 'W6', avgScore: 75, passingRate: 91 },
    { week: 'W7', avgScore: 74, passingRate: 90 },
    { week: 'W8', avgScore: 77, passingRate: 93 },
];

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-surface border-2 border-border rounded-xl p-3 shadow-xl text-xs">
            <p className="font-bold text-muted mb-1">{label}</p>
            {payload.map((p, i) => (
                <p key={i} className="font-bold" style={{ color: p.color }}>{p.name}: {p.value}</p>
            ))}
        </div>
    );
};

const InstitutionAnalytics = () => {
    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-black text-main">Institution Analytics</h1>
                <p className="text-muted font-medium mt-1">Platform-wide usage, academic performance, and department distribution.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Platform Usage Trend */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <h3 className="font-black text-base text-main">Platform Usage</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={platformUsage}>
                            <defs>
                                <linearGradient id="loginGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.2} />
                                    <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Area yAxisId="left" type="monotone" dataKey="logins" name="Monthly Logins" stroke={COLORS[0]} strokeWidth={2} fill="url(#loginGrad)" />
                            <Line yAxisId="right" type="monotone" dataKey="assignments" name="Assignments Completed" stroke={COLORS[1]} strokeWidth={2} dot={false} />
                            <Line yAxisId="right" type="monotone" dataKey="quizzes" name="Quizzes Taken" stroke={COLORS[2]} strokeWidth={2} dot={false} />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Academic Performance */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        <h3 className="font-black text-base text-main">Global Academic Performance</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="week" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis domain={[50, 100]} tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Line type="monotone" dataKey="avgScore" name="Average Score" stroke={COLORS[0]} strokeWidth={2.5} dot={false} />
                            <Line type="monotone" dataKey="passingRate" name="Passing Rate" stroke={COLORS[2]} strokeWidth={2.5} dot={false} strokeDasharray="5 5" />
                        </LineChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Department Distribution */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5 lg:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="w-5 h-5 text-purple-500" />
                        <h3 className="font-black text-base text-main">Student Distribution</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={courseDistribution} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                                {courseDistribution.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </motion.div>
                
                {/* Content Growth */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5 lg:col-span-2">
                    <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-amber-500" />
                        <h3 className="font-black text-base text-main">Content Creation Growth</h3>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={platformUsage}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--base)' }} />
                            <Legend wrapperStyle={{ fontSize: '10px' }} />
                            <Bar dataKey="assignments" name="Assignments Added" stackId="a" fill={COLORS[0]} radius={[0, 0, 0, 0]} maxBarSize={40} />
                            <Bar dataKey="quizzes" name="Quizzes Added" stackId="a" fill={COLORS[1]} radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>
        </div>
    );
};

export default InstitutionAnalytics;
