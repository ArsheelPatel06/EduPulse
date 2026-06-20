import React from 'react';
import { Trophy, Flame, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const OverallProgressCard = ({ level, xp, streak, mastery }) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-surface p-6 rounded-2xl border-2 border-border space-y-6 relative overflow-hidden group"
        >
            {/* Background Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-[50px] rounded-full pointer-events-none group-hover:bg-purple-600/20 transition-colors" />

            <h2 className="text-xl font-black uppercase flex items-center gap-2 relative z-10">
                <Trophy className="w-5 h-5 text-yellow-500" />
                Player Stats
            </h2>

            <div className="space-y-6 relative z-10">
                {/* Level Badge */}
                <div className="flex items-center justify-between bg-base/50 p-4 rounded-xl border border-border">
                    <div>
                        <p className="text-xs font-bold text-muted uppercase tracking-wider">Current Rank</p>
                        <p className="text-2xl font-black text-main">{level > 10 ? 'Scholar' : 'Novice'} <span className="text-sm font-bold text-muted ml-1">(Lvl {level})</span></p>
                    </div>
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center border-2 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                        <span className="text-xl font-black text-white">{level}</span>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    {/* XP Stat */}
                    <div className="bg-base p-4 rounded-xl border border-border flex flex-col items-center justify-center text-center group/xp hover:border-purple-500 transition-colors">
                        <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center mb-2 group-hover/xp:scale-110 transition-transform">
                            <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        </div>
                        <p className="text-2xl font-black text-white drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]">
                            {xp.toLocaleString()}
                        </p>
                        <p className="text-[10px] font-bold text-muted uppercase mt-1">Total XP</p>
                    </div>

                    {/* Streak Stat */}
                    <div className="bg-base p-4 rounded-xl border border-border flex flex-col items-center justify-center text-center group/streak hover:border-orange-500 transition-colors">
                        <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center mb-2 group-hover/streak:scale-110 transition-transform">
                            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
                        </div>
                        <p className="text-2xl font-black text-main">
                            {streak} <span className="text-sm">days</span>
                        </p>
                        <p className="text-[10px] font-bold text-muted uppercase mt-1">Momentum</p>
                    </div>
                </div>

                {/* Mastery Circle */}
                <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-base" />
                                <circle cx="24" cy="24" r="20" stroke={mastery >= 80 ? '#22c55e' : '#9333ea'} strokeWidth="4" fill="transparent" strokeDasharray={125.6} strokeDashoffset={125.6 - (125.6 * mastery) / 100} strokeLinecap="round" />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-black">{mastery}%</span>
                        </div>
                        <div>
                            <p className="font-bold text-sm">Overall Mastery</p>
                            <p className="text-xs text-muted">Across all subjects</p>
                        </div>
                    </div>
                    <Target className="w-8 h-8 text-muted/20" />
                </div>
            </div>
        </motion.section>
    );
};

export default OverallProgressCard;
