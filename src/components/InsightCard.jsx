import React from 'react';
import { Lightbulb, TrendingUp, AlertCircle, Brain } from 'lucide-react';

const InsightCard = ({ type = 'info', title, description }) => {
    // defined styles based on type
    const styles = {
        success: {
            border: 'border-green-500',
            bg: 'bg-green-500/10',
            iconColor: 'text-green-500',
            Icon: TrendingUp
        },
        warning: {
            border: 'border-yellow-500',
            bg: 'bg-yellow-500/10',
            iconColor: 'text-yellow-500',
            Icon: AlertCircle
        },
        info: {
            border: 'border-blue-500',
            bg: 'bg-blue-500/10',
            iconColor: 'text-blue-500',
            Icon: Lightbulb
        },
        brain: {
            border: 'border-purple-500',
            bg: 'bg-purple-500/10',
            iconColor: 'text-purple-500',
            Icon: Brain
        }
    };

    const style = styles[type] || styles.info;
    const IconComponent = style.Icon;

    return (
        <div className={`p-4 rounded-xl border-l-4 ${style.border} ${style.bg} bg-opacity-20 flex gap-4 transition-transform hover:scale-[1.01]`}>
            <div className={`mt-1 p-2 rounded-lg bg-surface border border-border shrink-0 h-fit`}>
                <IconComponent className={`w-5 h-5 ${style.iconColor}`} />
            </div>
            <div>
                <h4 className="font-bold text-main text-sm uppercase tracking-wide mb-1">{title}</h4>
                <p className="text-sm text-muted font-medium leading-relaxed">
                    {description}
                </p>
            </div>
        </div>
    );
};

export default InsightCard;
