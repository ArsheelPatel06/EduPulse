// src/roles/admin/pages/AdminDashboard.jsx
import React, { useMemo } from 'react';
import { useAppState } from '../../../state/appState';
import { motion } from 'framer-motion';
import {
    LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, BarChart, Bar
} from 'recharts';
import StatCard from '../../../components/StatCard';
import { Users, BookOpen, Activity, Server, ShieldCheck, Cpu, HardDrive } from 'lucide-react';

const COLORS = { green: '#22c55e', primary: '#3b82f6', amber: '#f59e0b' };

const systemMetrics = [
    { time: '00:00', cpu: 22, ram: 45, requests: 1200 },
    { time: '04:00', cpu: 15, ram: 40, requests: 800 },
    { time: '08:00', cpu: 45, ram: 65, requests: 4500 },
    { time: '12:00', cpu: 75, ram: 82, requests: 8900 },
    { time: '16:00', cpu: 65, ram: 78, requests: 7200 },
    { time: '20:00', cpu: 40, ram: 60, requests: 3800 },
];

const userGrowth = [
    { month: 'Jan', students: 120, teachers: 5 },
    { month: 'Feb', students: 145, teachers: 5 },
    { month: 'Mar', students: 180, teachers: 6 },
    { month: 'Apr', students: 210, teachers: 6 },
    { month: 'May', students: 250, teachers: 7 },
    { month: 'Jun', students: 285, teachers: 8 },
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

const AdminDashboard = () => {
    const { state } = useAppState();

    const { allStudents = [], allTeachers = [], auditLogs = [], systemStatus } = state;

    const stats = [
        { title: 'Total Students', value: allStudents.length, icon: Users, color: 'blue', trend: 15, trendLabel: 'vs last month' },
        { title: 'Total Teachers', value: allTeachers.length, icon: Users, color: 'purple', trend: 12, trendLabel: 'vs last month' },
        { title: 'Active Courses', value: 24, icon: BookOpen, color: 'teal', trend: 5, trendLabel: 'new this week' },
        { title: 'Platform Uptime', value: systemStatus?.uptime || '99.9%', icon: Activity, color: 'green', subtitle: `${systemStatus?.uptimeDays || 12} days without incident` },
    ];

    const recentLogs = auditLogs.slice(0, 5);

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-black text-main">Platform Overview</h1>
                <p className="text-muted font-medium mt-1">High-level metrics, user growth, and system health.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((card, i) => (
                    <StatCard key={card.title} {...card} delay={i * 0.05} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* System Health Panel */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <Server className="w-5 h-5 text-green-500" />
                            <h3 className="font-black text-base text-main">System Health</h3>
                        </div>
                        <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-2 py-1 rounded-lg uppercase tracking-wider">Operational</span>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-muted flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> CPU Usage</span>
                                <span className="text-main">{systemStatus?.cpuUsage || 0}%</span>
                            </div>
                            <div className="h-2 bg-base rounded-full overflow-hidden border border-border">
                                <div className={`h-full rounded-full ${(systemStatus?.cpuUsage || 0) > 80 ? 'bg-red-500' : 'bg-blue-500'}`} style={{ width: `${systemStatus?.cpuUsage || 0}%` }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-muted flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Memory Usage</span>
                                <span className="text-main">{systemStatus?.ramUsage || 0}%</span>
                            </div>
                            <div className="h-2 bg-base rounded-full overflow-hidden border border-border">
                                <div className={`h-full rounded-full ${(systemStatus?.ramUsage || 0) > 80 ? 'bg-red-500' : 'bg-purple-500'}`} style={{ width: `${systemStatus?.ramUsage || 0}%` }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-muted flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5" /> Storage</span>
                                <span className="text-main">{systemStatus?.storageUsed || 0}GB / {systemStatus?.storageTotal || 0}GB</span>
                            </div>
                            <div className="h-2 bg-base rounded-full overflow-hidden border border-border">
                                <div className="h-full bg-teal-500 rounded-full" style={{ width: `${((systemStatus?.storageUsed || 0) / (systemStatus?.storageTotal || 1)) * 100}%` }} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t-2 border-border grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">API Latency</p>
                            <p className="text-lg font-black text-main">{systemStatus?.apiResponseMs || 0}ms</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-muted uppercase tracking-wider mb-1">Version</p>
                            <p className="text-sm font-bold text-main font-mono">{systemStatus?.deploymentVersion || 'v1.0.0'}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Resource Usage Chart */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5 lg:col-span-2">
                    <h3 className="font-black text-base text-main mb-4">Resource Utilization (24h)</h3>
                    <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={systemMetrics}>
                            <defs>
                                <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.2} />
                                    <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="ramGrad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={COLORS.green} stopOpacity={0.2} />
                                    <stop offset="95%" stopColor={COLORS.green} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                            <XAxis dataKey="time" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="cpu" stroke={COLORS.primary} strokeWidth={2} fill="url(#cpuGrad)" name="CPU %" />
                            <Area type="monotone" dataKey="ram" stroke={COLORS.green} strokeWidth={2} fill="url(#ramGrad)" name="RAM %" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Growth */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5">
                    <h3 className="font-black text-base text-main mb-4">User Growth</h3>
                    <ResponsiveContainer width="100%" height={220}>
                        <BarChart data={userGrowth}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                            <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: 10, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--base)' }} />
                            <Bar dataKey="students" name="Students" fill={COLORS.primary} radius={[4, 4, 0, 0]} maxBarSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Recent Activity */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                    className="bg-surface border-2 border-border rounded-2xl p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-500" />
                            <h3 className="font-black text-base text-main">Recent Security Logs</h3>
                        </div>
                    </div>
                    <div className="space-y-3 flex-1 overflow-y-auto">
                        {recentLogs.map((log) => (
                            <div key={log.id} className="flex gap-3 text-sm">
                                <div className="mt-1 flex flex-col items-center">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <div className="w-px h-full bg-border -mb-3" />
                                </div>
                                <div className="pb-3 border-b border-border/50 flex-1">
                                    <p className="font-bold text-main">{log.actor} <span className="text-muted font-medium ml-1 text-xs">({log.actorRole})</span></p>
                                    <p className="text-muted mt-0.5">
                                        <span className="font-medium text-main">{log.action.replace(/_/g, ' ')}</span> — {log.resource}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1.5 text-[10px] font-bold text-muted uppercase tracking-wider">
                                        <span>{new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span>•</span>
                                        <span className="font-mono text-blue-500/80">{log.ip}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
