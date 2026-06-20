import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { Target, Award, Code, MessageSquare, BookOpen, Brain, Briefcase } from 'lucide-react';

export default function StudentPlacement() {
  const [readinessData, setReadinessData] = useState({
    overall: 81,
    technical: 86,
    case_study: 79,
    academic: 84,
    communication: 68,
    engagement: 83
  });

  const [recommendations, setRecommendations] = useState([
    "Improve mock interview performance.",
    "Complete communication workshop.",
    "Attend presentation lab."
  ]);

  const radarData = [
    { subject: 'Technical', A: readinessData.technical, fullMark: 100 },
    { subject: 'Case Study', A: readinessData.case_study, fullMark: 100 },
    { subject: 'Academic', A: readinessData.academic, fullMark: 100 },
    { subject: 'Communication', A: readinessData.communication, fullMark: 100 },
    { subject: 'Engagement', A: readinessData.engagement, fullMark: 100 },
  ];

  const trendData = [
    { name: 'Week 1', score: 65 },
    { name: 'Week 2', score: 68 },
    { name: 'Week 3', score: 74 },
    { name: 'Week 4', score: 81 },
  ];

  const getStatusColor = (score) => {
    if (score >= 90) return "text-green-400 bg-green-400/10 border-green-400/20";
    if (score >= 75) return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
    if (score >= 60) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    return "text-red-400 bg-red-400/10 border-red-400/20";
  };

  const getStatusText = (score) => {
    if (score >= 90) return "Placement Ready";
    if (score >= 75) return "Almost Ready";
    if (score >= 60) return "Needs Improvement";
    return "High Risk";
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto text-main">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-main">
            Placement Readiness Center
          </h1>
          <p className="text-muted mt-1 font-bold text-sm uppercase tracking-wider">Track your progress toward industry readiness.</p>
        </div>
        <div className={`px-4 py-2 rounded-xl border-2 flex items-center gap-2 font-bold uppercase tracking-wider text-xs shadow-sm ${getStatusColor(readinessData.overall)}`}>
          <Target className="w-5 h-5" />
          {getStatusText(readinessData.overall)}: {readinessData.overall}%
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-surface border-2 border-border p-4 rounded-2xl hover:border-violet-500/50 transition-colors">
          <div className="flex items-center gap-2 text-violet-500 mb-2">
            <Code className="w-5 h-5" />
            <h3 className="font-black uppercase text-xs tracking-wider">Technical</h3>
          </div>
          <div className="text-2xl font-black">{readinessData.technical}%</div>
        </div>
        <div className="bg-surface border-2 border-border p-4 rounded-2xl hover:border-amber-500/50 transition-colors">
          <div className="flex items-center gap-2 text-amber-500 mb-2">
            <Briefcase className="w-5 h-5" />
            <h3 className="font-black uppercase text-xs tracking-wider">Case Study</h3>
          </div>
          <div className="text-2xl font-black">{readinessData.case_study}%</div>
        </div>
        <div className="bg-surface border-2 border-border p-4 rounded-2xl hover:border-blue-500/50 transition-colors">
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <BookOpen className="w-5 h-5" />
            <h3 className="font-black uppercase text-xs tracking-wider">Academic</h3>
          </div>
          <div className="text-2xl font-black">{readinessData.academic}%</div>
        </div>
        <div className="bg-surface border-2 border-border p-4 rounded-2xl hover:border-emerald-500/50 transition-colors">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <MessageSquare className="w-5 h-5" />
            <h3 className="font-black uppercase text-xs tracking-wider">Communication</h3>
          </div>
          <div className="text-2xl font-black">{readinessData.communication}%</div>
        </div>
        <div className="bg-surface border-2 border-border p-4 rounded-2xl hover:border-pink-500/50 transition-colors">
          <div className="flex items-center gap-2 text-pink-500 mb-2">
            <Brain className="w-5 h-5" />
            <h3 className="font-black uppercase text-xs tracking-wider">Engagement</h3>
          </div>
          <div className="text-2xl font-black">{readinessData.engagement}%</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="bg-surface border-2 border-border p-6 rounded-3xl shadow-sm">
          <h2 className="text-lg font-black uppercase tracking-wider text-main mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-violet-500" />
            Skill Radar
          </h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="currentColor" className="opacity-10" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'currentColor', fontSize: 12, fontWeight: 'bold' }} className="text-muted" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: 'currentColor' }} className="text-muted opacity-50" />
                <Radar name="Score" dataKey="A" stroke="#8b5cf6" strokeWidth={3} fill="#8b5cf6" fillOpacity={0.3} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '0.75rem', color: 'var(--color-main)' }}
                  itemStyle={{ fontWeight: 700 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-surface border-2 border-border p-6 rounded-3xl flex flex-col shadow-sm">
          <h2 className="text-lg font-black uppercase tracking-wider text-main mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-fuchsia-500" />
            Readiness Trend
          </h2>
          <div className="h-80 w-full flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="opacity-10" vertical={false} />
                <XAxis dataKey="name" stroke="currentColor" className="text-muted text-xs font-bold" tickLine={false} axisLine={false} />
                <YAxis domain={[0, 100]} stroke="currentColor" className="text-muted text-xs font-bold" tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)', borderRadius: '0.75rem', color: 'var(--color-main)' }}
                  itemStyle={{ fontWeight: 700 }}
                />
                <Line type="monotone" dataKey="score" stroke="#d946ef" strokeWidth={4} dot={{ fill: '#d946ef', r: 6, strokeWidth: 2, stroke: 'var(--color-surface)' }} activeDot={{ r: 8, fill: '#fdf4ff', stroke: '#d946ef' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-surface border-2 border-border p-6 rounded-3xl shadow-sm">
        <h2 className="text-lg font-black uppercase tracking-wider text-main mb-6">Actionable Recommendations</h2>
        <div className="space-y-4">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-4 p-4 bg-base/50 rounded-xl border-2 border-border hover:border-violet-500/30 transition-colors">
              <div className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-500 flex items-center justify-center font-black shrink-0">
                {idx + 1}
              </div>
              <p className="text-main font-bold mt-1 text-sm">{rec}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
