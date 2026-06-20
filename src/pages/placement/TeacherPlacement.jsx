import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, AlertCircle, TrendingUp, CheckCircle } from 'lucide-react';

export default function TeacherPlacement() {
  const avgReadiness = 78;
  const deptReadiness = [
    { name: 'Computer Science', score: 82 },
    { name: 'Electrical Eng', score: 75 },
    { name: 'Mechanical Eng', score: 71 },
    { name: 'Civil Eng', score: 68 },
  ];

  const topStudents = [
    { name: 'Arsheel Patel', score: 92, status: 'Placement Ready' },
    { name: 'Priya Sharma', score: 89, status: 'Almost Ready' },
    { name: 'Amit Singh', score: 87, status: 'Almost Ready' },
  ];

  const interventionStudents = [
    { name: 'John Doe', score: 54, status: 'High Risk' },
    { name: 'Jane Smith', score: 58, status: 'High Risk' },
  ];

  const getStatusColor = (score) => {
    if (score >= 90) return "text-green-400 bg-green-400/10 border-green-400/20";
    if (score >= 75) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (score >= 60) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-red-400 bg-red-400/10 border-red-400/20";
  };

  const getBarColor = (score) => {
    if (score >= 80) return "#8b5cf6"; // violet
    if (score >= 70) return "#d946ef"; // fuchsia
    return "#f43f5e"; // rose
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto text-main">
      <div>
        <h1 className="text-3xl font-black text-main">
          Teacher Placement Dashboard
        </h1>
        <p className="text-muted mt-1 font-bold text-sm uppercase tracking-wider">Monitor placement readiness across your classes and identify at-risk cohorts.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface border-2 border-border p-6 rounded-2xl flex items-center gap-4 hover:border-blue-500/50 transition-colors">
          <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-500">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted text-xs font-black uppercase tracking-wider">Average Readiness</div>
            <div className="text-2xl font-black">{avgReadiness}%</div>
          </div>
        </div>
        <div className="bg-surface border-2 border-border p-6 rounded-2xl flex items-center gap-4 hover:border-green-500/50 transition-colors">
          <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20 text-green-500">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted text-xs font-black uppercase tracking-wider">Placement Ready</div>
            <div className="text-2xl font-black">42 Students</div>
          </div>
        </div>
        <div className="bg-surface border-2 border-border p-6 rounded-2xl flex items-center gap-4 hover:border-yellow-500/50 transition-colors">
          <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 text-yellow-500">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted text-xs font-black uppercase tracking-wider">Almost Ready</div>
            <div className="text-2xl font-black">89 Students</div>
          </div>
        </div>
        <div className="bg-surface border-2 border-border border-l-4 border-l-red-500 p-6 rounded-2xl flex items-center gap-4 shadow-sm shadow-red-500/5">
          <div className="p-3 bg-red-500/10 rounded-xl border border-red-500/20 text-red-500">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-muted text-xs font-black uppercase tracking-wider">Requires Intervention</div>
            <div className="text-2xl font-black">14 Students</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Comparison Chart */}
        <div className="bg-surface border-2 border-border p-6 rounded-3xl flex flex-col shadow-sm">
          <h2 className="text-lg font-black uppercase tracking-wider text-main mb-6">Department Readiness</h2>
          <div className="h-80 w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptReadiness} margin={{ top: 5, right: 0, bottom: 5, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" vertical={false} />
                <XAxis dataKey="name" stroke="currentColor" className="text-muted text-xs font-bold" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} stroke="currentColor" className="text-muted text-xs font-bold" tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  cursor={{fill: 'currentColor', opacity: 0.05}}
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '0.75rem', color: 'var(--color-main)' }}
                  itemStyle={{ fontWeight: 700 }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
                  {deptReadiness.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Lists */}
        <div className="space-y-8">
          {/* Top Students */}
          <div className="bg-surface border-2 border-border p-6 rounded-3xl shadow-sm">
            <h2 className="text-lg font-black uppercase tracking-wider text-main mb-4 flex items-center justify-between">
              Top Placement Ready
              <button className="text-xs text-blue-500 font-bold uppercase tracking-wider hover:underline">View All</button>
            </h2>
            <div className="space-y-3">
              {topStudents.map((student, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-base/50 rounded-xl border-2 border-border hover:border-green-500/30 transition-colors">
                  <div className="font-bold text-main">{student.name}</div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-main">{student.score}%</span>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full border-2 ${getStatusColor(student.score)}`}>
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Intervention Needed */}
          <div className="bg-surface border-2 border-border p-6 rounded-3xl shadow-sm">
            <h2 className="text-lg font-black uppercase tracking-wider text-main mb-4 flex items-center justify-between">
              Requiring Intervention
              <button className="text-xs text-blue-500 font-bold uppercase tracking-wider hover:underline">View All</button>
            </h2>
            <div className="space-y-3">
              {interventionStudents.map((student, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 bg-base/50 rounded-xl border-2 border-border hover:border-red-500/30 transition-colors">
                  <div className="font-bold text-main">{student.name}</div>
                  <div className="flex items-center gap-3">
                    <span className="font-black text-red-500">{student.score}%</span>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full border-2 ${getStatusColor(student.score)}`}>
                      {student.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
