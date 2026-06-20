// src/components/StatCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

/**
 * Reusable KPI card for dashboards
 * Props:
 *   title, value, subtitle, icon (Lucide component), color (Tailwind color name),
 *   trend (number, optional), trendLabel (string, optional), onClick
 */
const StatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    color = 'purple',
    trend,
    trendLabel,
    onClick,
    delay = 0,
}) => {
    const colorMap = {
        purple: { bg: 'bg-purple-500/10', border: 'hover:border-purple-500', text: 'text-purple-500', icon: 'bg-purple-500/20' },
        blue:   { bg: 'bg-blue-500/10',   border: 'hover:border-blue-500',   text: 'text-blue-500',   icon: 'bg-blue-500/20' },
        green:  { bg: 'bg-green-500/10',  border: 'hover:border-green-500',  text: 'text-green-500',  icon: 'bg-green-500/20' },
        amber:  { bg: 'bg-amber-500/10',  border: 'hover:border-amber-500',  text: 'text-amber-500',  icon: 'bg-amber-500/20' },
        red:    { bg: 'bg-red-500/10',    border: 'hover:border-red-500',    text: 'text-red-500',    icon: 'bg-red-500/20' },
        teal:   { bg: 'bg-teal-500/10',   border: 'hover:border-teal-500',   text: 'text-teal-500',   icon: 'bg-teal-500/20' },
    };
    const c = colorMap[color] || colorMap.purple;

    const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
    const trendColor = trend > 0 ? 'text-green-500' : trend < 0 ? 'text-red-500' : 'text-muted';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            onClick={onClick}
            className={`bg-surface border-2 border-border rounded-2xl p-5 flex flex-col gap-4 transition-all duration-200 ${c.border} ${onClick ? 'cursor-pointer' : ''} relative overflow-hidden group`}
        >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-5 group-hover:opacity-10 transition-opacity ${c.bg}`} />

            <div className="flex items-start justify-between">
                <p className="text-xs font-bold text-muted uppercase tracking-widest">{title}</p>
                {Icon && (
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${c.icon}`}>
                        <Icon className={`w-5 h-5 ${c.text}`} />
                    </div>
                )}
            </div>

            <div>
                <p className={`text-3xl font-black text-main leading-none`}>{value}</p>
                {subtitle && <p className="text-xs font-medium text-muted mt-1">{subtitle}</p>}
            </div>

            {trend !== undefined && (
                <div className={`flex items-center gap-1 text-xs font-bold ${trendColor}`}>
                    <TrendIcon className="w-3 h-3" />
                    <span>{Math.abs(trend)}%</span>
                    {trendLabel && <span className="text-muted font-medium">{trendLabel}</span>}
                </div>
            )}
        </motion.div>
    );
};

export default StatCard;
