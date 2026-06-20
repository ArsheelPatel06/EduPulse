import React from 'react';
import { Flame, Info } from 'lucide-react';

const MomentumIndicator = ({ streak, hasStudiedToday }) => {
    return (
        <div className="h-full bg-surface border-2 border-border p-5 rounded-xl flex flex-col justify-between hover:border-teal-500 transition-colors group">
            <div className="flex justify-between items-start">
                <span className="text-xs text-muted font-bold uppercase tracking-wider">Streak</span>
                <Flame className="w-5 h-5 text-teal-500 group-hover:fill-teal-500 transition-colors" />
            </div>

            <div>
                <div className="flex items-baseline gap-1">
                    <p className="text-4xl font-black text-main">{streak}</p>
                    <span className="text-sm font-bold text-muted">days</span>
                </div>

                {!hasStudiedToday && (
                    <p className="text-[10px] font-bold text-amber-500 uppercase mt-1 tracking-wide">
                        Study today to maintain
                    </p>
                )}
            </div>
        </div>
    );
};

export default MomentumIndicator;
