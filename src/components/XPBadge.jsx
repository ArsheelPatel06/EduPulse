import React from 'react';
import { Trophy, Star } from 'lucide-react';

const XPBadge = ({ level, xp }) => {
    return (
        <div className="flex items-center gap-0 bg-surface border-2 border-border rounded-lg overflow-hidden shadow-sm hover:border-purple-500 transition-colors cursor-default">

            {/* Level Segment */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-base border-r-2 border-border text-purple-600">
                <Trophy className="w-4 h-4 fill-purple-600/20" />
                <span className="font-black text-sm uppercase tracking-wider">Lvl {level}</span>
            </div>

            {/* XP Segment */}
            <div className="flex items-center gap-2 px-3 py-1.5 text-main">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="font-bold text-sm tabular-nums">{xp.toLocaleString()} LS</span>
            </div>
        </div>
    );
};

export default XPBadge;
