// src/components/RiskBadge.jsx
import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

const config = {
    low: {
        label: 'Low Risk',
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-500',
        dot: 'bg-green-500',
        Icon: CheckCircle,
    },
    medium: {
        label: 'Medium Risk',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        text: 'text-amber-500',
        dot: 'bg-amber-500',
        Icon: AlertCircle,
    },
    high: {
        label: 'High Risk',
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-500',
        dot: 'bg-red-500',
        Icon: AlertTriangle,
    },
};

const RiskBadge = ({ level = 'low', showLabel = true, size = 'sm' }) => {
    const c = config[level] || config.low;
    const Icon = c.Icon;

    if (size === 'dot') {
        return (
            <span className={`inline-flex items-center gap-1.5`}>
                <span className={`w-2.5 h-2.5 rounded-full ${c.dot} animate-pulse`} />
                {showLabel && <span className={`text-xs font-bold ${c.text} uppercase tracking-wider`}>{c.label}</span>}
            </span>
        );
    }

    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold uppercase tracking-wider ${c.bg} ${c.border} ${c.text}`}>
            <Icon className="w-3 h-3" />
            {showLabel && c.label}
        </span>
    );
};

export default RiskBadge;
