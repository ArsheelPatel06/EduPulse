import React from 'react';
import { Shield, Zap, Lock, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

const QuestCard = ({ title, subject, difficulty, xp, progress, status = 'active', subjectId }) => {
    const navigate = useNavigate();
    const isCompleted = status === 'completed';
    const isLocked = status === 'upcoming';
    const isActive = status === 'active';

    // Difficulty Color Map
    const difficultyColors = {
        Easy: 'border-green-500 text-green-500',
        Medium: 'border-yellow-500 text-yellow-500',
        Hard: 'border-red-500 text-red-500'
    };

    return (
        <motion.div
            whileHover={!isLocked ? { scale: 1.02 } : {}}
            className={`
                relative p-6 rounded-2xl border-2 transition-all group select-none
                ${isActive ? 'bg-surface border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.15)]' : ''}
                ${isCompleted ? 'bg-surface/50 border-green-500/50 opacity-80' : ''}
                ${isLocked ? 'bg-base border-border opacity-60 grayscale' : ''}
            `}
        >
            {/* Status Badge */}
            <div className="flex justify-between items-start mb-4">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded bg-base border ${difficultyColors[difficulty] || 'border-border'}`}>
                    {difficulty}
                </span>
                {isCompleted && <CheckCircle className="w-6 h-6 text-green-500" />}
                {isLocked && <Lock className="w-5 h-5 text-muted" />}
                {isActive && <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>}
            </div>

            {/* Content */}
            <h3 className="text-xl font-black text-main leading-tight mb-1">{title}</h3>
            <p className="text-muted text-sm font-bold mb-4 uppercase">{subject}</p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2 mb-6 text-xs font-bold">
                <div className="bg-base/50 p-2 rounded border border-border flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    <span className="text-main">{xp} XP</span>
                </div>
                <div className="bg-base/50 p-2 rounded border border-border flex items-center gap-2">
                    <Shield className="w-3 h-3 text-blue-500" />
                    <span className="text-main">{progress}% Done</span>
                </div>
            </div>

            {/* Progress Bar (if active) */}
            {isActive && (
                <div className="h-2 w-full bg-base rounded-full overflow-hidden mb-6 border border-border">
                    <div
                        className="h-full bg-purple-600 box-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {/* Action Button */}
            <button
                disabled={isLocked}
                onClick={() => {
                    if (isActive || isCompleted) {
                        navigate('/study/quiz', {
                            state: {
                                subjectId: subjectId || 'js',
                                title: title,
                                xp: xp
                            }
                        });
                    }
                }}
                className={`
                    w-full py-3 rounded-xl font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors
                    ${isActive ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-base border-2 border-border text-muted cursor-not-allowed'}
                `}
            >
                {isCompleted ? 'Mission Complete' : isLocked ? 'Locked' : 'Continue Quest'}
                {(isActive || isCompleted) && <ArrowRight className="w-4 h-4" />}
            </button>
        </motion.div>
    );
};

export default QuestCard;
