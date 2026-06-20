import React from 'react';
import { useAppState } from '../../../state/appState';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import { ShieldAlert, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

const AdminInterventions = () => {
    const { state } = useAppState();

    // Mock aggregate data for Intervention Effectiveness
    const effectivenessData = [
        { month: 'Jan', created: 12, closed: 8, successful: 6, failed: 2 },
        { month: 'Feb', created: 18, closed: 14, successful: 10, failed: 4 },
        { month: 'Mar', created: 15, closed: 18, successful: 15, failed: 3 },
        { month: 'Apr', created: 25, closed: 20, successful: 16, failed: 4 },
        { month: 'May', created: 20, closed: 22, successful: 19, failed: 3 },
        { month: 'Jun', created: parseInt(state.interventions.length) + 10, closed: 12, successful: 9, failed: 3 }, // using active state + mock
    ];

    // Mock data for Department Breakdown
    const departmentRiskData = [
        { name: 'Engineering', highRisk: 45, medRisk: 120 },
        { name: 'Business', highRisk: 25, medRisk: 80 },
        { name: 'Science', highRisk: 15, medRisk: 45 },
        { name: 'Arts', highRisk: 5, medRisk: 20 }
    ];

    const currentStats = {
        totalActive: state.interventions.filter(i => i.status === 'open').length + 24, // + mock
        successRate: '78%',
        avgResolutionTime: '14 Days'
    };

    return (
        <div className="space-y-6 pb-20">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-main">Intervention Analytics</h1>
                    <p className="text-muted font-bold text-sm">Monitor Institutional Intervention Effectiveness</p>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <AlertTriangle className="w-24 h-24 text-amber-500" />
                    </div>
                    <p className="text-muted font-bold text-sm uppercase tracking-wider mb-2">Active Interventions</p>
                    <div className="text-4xl font-black text-main mb-2">{currentStats.totalActive}</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
                        <TrendingUp className="w-4 h-4" /> +12% from last month
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-24 h-24 text-green-500" />
                    </div>
                    <p className="text-muted font-bold text-sm uppercase tracking-wider mb-2">Success Rate</p>
                    <div className="text-4xl font-black text-main mb-2">{currentStats.successRate}</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-green-500">
                        <TrendingUp className="w-4 h-4" /> +3% from last month
                    </div>
                </div>

                <div className="bg-surface border border-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                        <ShieldAlert className="w-24 h-24 text-purple-500" />
                    </div>
                    <p className="text-muted font-bold text-sm uppercase tracking-wider mb-2">Avg. Resolution Time</p>
                    <div className="text-4xl font-black text-main mb-2">{currentStats.avgResolutionTime}</div>
                    <div className="flex items-center gap-1 text-sm font-bold text-green-500">
                        <TrendingUp className="w-4 h-4" /> -2 days from last month
                    </div>
                </div>
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Effectiveness Over Time */}
                <div className="bg-surface border border-border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-main mb-6">Intervention Lifecycle</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={effectivenessData}>
                                <defs>
                                    <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorClosed" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--muted)" tick={{ fill: 'var(--muted)' }} />
                                <YAxis stroke="var(--muted)" tick={{ fill: 'var(--muted)' }} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--main)' }}
                                    itemStyle={{ fontWeight: 'bold' }}
                                />
                                <Legend />
                                <Area type="monotone" dataKey="created" name="Cases Opened" stroke="#f59e0b" fillOpacity={1} fill="url(#colorCreated)" />
                                <Area type="monotone" dataKey="closed" name="Cases Closed" stroke="#10b981" fillOpacity={1} fill="url(#colorClosed)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Success vs Failure */}
                <div className="bg-surface border border-border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-main mb-6">Intervention Outcomes</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={effectivenessData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis dataKey="month" stroke="var(--muted)" tick={{ fill: 'var(--muted)' }} />
                                <YAxis stroke="var(--muted)" tick={{ fill: 'var(--muted)' }} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--main)' }}
                                    cursor={{ fill: 'var(--base)' }}
                                />
                                <Legend />
                                <Bar dataKey="successful" name="Improved" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="failed" name="Failed/No Improvement" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

            </div>

            {/* Charts Row 2 */}
            <div className="grid lg:grid-cols-2 gap-6">
                
                {/* Department Breakdown */}
                <div className="bg-surface border border-border rounded-xl p-6">
                    <h2 className="text-xl font-bold text-main mb-6">Risk Population by Department</h2>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={departmentRiskData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                                <XAxis type="number" stroke="var(--muted)" tick={{ fill: 'var(--muted)' }} />
                                <YAxis dataKey="name" type="category" width={100} stroke="var(--muted)" tick={{ fill: 'var(--muted)' }} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', color: 'var(--main)' }}
                                    cursor={{ fill: 'var(--base)' }}
                                />
                                <Legend />
                                <Bar dataKey="highRisk" name="Critical Risk" stackId="a" fill="#ef4444" radius={[0, 0, 0, 0]} />
                                <Bar dataKey="medRisk" name="Medium Risk" stackId="a" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default AdminInterventions;
