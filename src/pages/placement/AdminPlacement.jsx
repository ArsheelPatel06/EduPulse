import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Building2, TrendingUp, Users, AlertTriangle } from 'lucide-react';

export default function AdminPlacement() {
  const institutionReadiness = 73;
  
  const trendData = [
    { month: 'Jan', ready: 120, almost: 200, risk: 50 },
    { month: 'Feb', ready: 140, almost: 190, risk: 40 },
    { month: 'Mar', ready: 180, almost: 160, risk: 30 },
    { month: 'Apr', ready: 250, almost: 100, risk: 20 },
  ];

  const deptComparison = [
    { name: 'Computer Science', score: 82 },
    { name: 'Electrical Eng', score: 75 },
    { name: 'Mechanical Eng', score: 71 },
    { name: 'Civil Eng', score: 68 },
    { name: 'Information Tech', score: 79 },
    { name: 'Chemical Eng', score: 65 },
  ];

  const getBarColor = (score) => {
    if (score >= 80) return "#8b5cf6"; // violet
    if (score >= 70) return "#3b82f6"; // blue
    return "#f43f5e"; // rose
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto text-main">
      <div>
        <h1 className="text-3xl font-black text-main">
          Institution Placement Overview
        </h1>
        <p className="text-muted mt-1 font-bold text-sm uppercase tracking-wider">High-level view of placement readiness and trends across all departments.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border-2 border-border p-6 rounded-2xl flex items-center gap-4 hover:border-teal-500/50 transition-colors">
          <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-500">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted text-xs font-black uppercase tracking-wider">Institution Avg</div>
            <div className="text-2xl font-black">{institutionReadiness}%</div>
          </div>
        </div>
        <div className="bg-surface border-2 border-border p-6 rounded-2xl flex items-center gap-4 hover:border-green-500/50 transition-colors">
          <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-green-500">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted text-xs font-black uppercase tracking-wider">Total Ready</div>
            <div className="text-2xl font-black">250</div>
          </div>
        </div>
        <div className="bg-surface border-2 border-border p-6 rounded-2xl flex items-center gap-4 hover:border-blue-500/50 transition-colors">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-500">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted text-xs font-black uppercase tracking-wider">Active Cohorts</div>
            <div className="text-2xl font-black">12</div>
          </div>
        </div>
        <div className="bg-surface border-2 border-border border-l-4 border-l-red-500 p-6 rounded-2xl flex items-center gap-4 shadow-sm shadow-red-500/5">
          <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-red-500">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted text-xs font-black uppercase tracking-wider">High Risk Cohorts</div>
            <div className="text-2xl font-black">2</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Placement Trends Area Chart */}
        <div className="bg-surface border-2 border-border p-6 rounded-3xl flex flex-col shadow-sm">
          <h2 className="text-lg font-black uppercase tracking-wider text-main mb-6">Institution Placement Trends</h2>
          <div className="h-80 w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <defs>
                  <linearGradient id="colorReady" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorAlmost" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRisk" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" vertical={false} />
                <XAxis dataKey="month" stroke="currentColor" className="text-muted text-xs font-bold" tickLine={false} axisLine={false} />
                <YAxis stroke="currentColor" className="text-muted text-xs font-bold" tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '0.75rem', color: 'var(--color-main)' }}
                  itemStyle={{ fontWeight: 700 }}
                />
                <Area type="monotone" dataKey="ready" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorReady)" name="Placement Ready" />
                <Area type="monotone" dataKey="almost" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorAlmost)" name="Almost Ready" />
                <Area type="monotone" dataKey="risk" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorRisk)" name="High Risk" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Comparison */}
        <div className="bg-surface border-2 border-border p-6 rounded-3xl flex flex-col shadow-sm">
          <h2 className="text-lg font-black uppercase tracking-wider text-main mb-6">Department Comparison</h2>
          <div className="h-80 w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptComparison} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" horizontal={false} />
                <XAxis type="number" domain={[0, 100]} stroke="currentColor" className="text-muted text-xs font-bold" tickLine={false} axisLine={false} />
                <YAxis dataKey="name" type="category" stroke="currentColor" className="text-muted text-xs font-bold" tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  cursor={{fill: 'currentColor', opacity: 0.05}}
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '0.75rem', color: 'var(--color-main)' }}
                  itemStyle={{ fontWeight: 700 }}
                />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={24}>
                  {deptComparison.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
