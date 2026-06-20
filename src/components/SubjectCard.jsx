import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock, Play, Star, Shield, BrainCircuit, Database, Cpu, BookOpen, Calculator, Globe } from 'lucide-react';

// Helper to map subject titles to icons
const getSubjectIcon = (title) => {
    const t = title.toLowerCase();
    if (t.includes('struct') || t.includes('algo')) return BrainCircuit;
    if (t.includes('database') || t.includes('sql')) return Database;
    if (t.includes('system') || t.includes('os')) return Cpu;
    if (t.includes('math') || t.includes('calculus')) return Calculator;
    if (t.includes('web') || t.includes('network')) return Globe;
    return BookOpen;
};

// Helper to generate mock game stats based on course ID/title
const getGameStats = (course) => {
    // Deterministic pseudo-random based on title length
    const levelReq = Math.max(1, course.title.length % 5);
    const xpReward = 500 + (levelReq * 250);
    return { levelReq, xpReward };
};

const SubjectCard = ({ course }) => {
    const isLocked = course.isLocked;
    const Icon = getSubjectIcon(course.title);
    const { levelReq, xpReward } = getGameStats(course);

    return (
        <motion.div
            whileHover={!isLocked ? { y: -5 } : {}}
            className={`relative flex flex-col h-full rounded-2xl border-2 transition-all overflow-hidden group
        ${isLocked
                    ? 'bg-base border-border opacity-70 grayscale'
                    : 'bg-surface border-border hover:border-purple-500'
                }
      `}
        >
            {/* Card Header / Banner */}
            <div className={`h-32 w-full p-6 flex flex-col justify-between relative overflow-hidden
         ${isLocked ? 'bg-black/5 dark:bg-white/5' : 'bg-purple-900/10'}
      `}>
                {/* Decorative Icon Background */}
                <Icon className="absolute -right-4 -bottom-4 w-24 h-24 text-main opacity-5 rotate-12" />

                <div className="flex justify-between items-start z-10">
                    <div className={`p-3 rounded-xl border-2 ${isLocked ? 'bg-base border-border' : 'bg-surface border-purple-500/30'}`}>
                        {isLocked ? <Lock className="w-6 h-6 text-muted" /> : <Icon className="w-6 h-6 text-purple-600" />}
                    </div>

                    {/* Level Badge */}
                    <div className="flex items-center gap-1 bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg border border-white/10 text-xs font-bold uppercase tracking-wider">
                        <Shield className="w-3 h-3 fill-white" />
                        <span>Lvl {levelReq}+</span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-black text-xl mb-2 leading-tight text-main line-clamp-2 min-h-[3.5rem]">{course.title}</h3>

                {/* Stats Grid */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-bold text-muted">{xpReward} XP</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-bold text-muted">{course.missions?.length ?? 0} Missions</span>
                    </div>
                </div>

                {/* Mastery Progress */}
                <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                        <span className="text-muted">Mastery</span>
                        <span className="text-purple-600">{course.mastery}%</span>
                    </div>
                    <div className="h-2 w-full bg-base rounded-full border border-border overflow-hidden">
                        <div
                            className="h-full bg-purple-600 transition-all duration-500"
                            style={{ width: `${course.mastery}%` }}
                        />
                    </div>
                </div>

                {/* Action Button */}
                <div className="mt-auto">
                    {isLocked ? (
                        <button disabled className="w-full py-3 rounded-xl bg-base border-2 border-border text-muted font-bold cursor-not-allowed flex items-center justify-center gap-2">
                            <Lock className="w-4 h-4" /> Locked
                        </button>
                    ) : (
                        <Link
                            to={`/courses/${course.id}`}
                            state={{ expandId: course.id }}
                            className="w-full py-3 rounded-xl bg-purple-600 border-2 border-purple-500 text-white font-bold hover:bg-purple-700 transition-colors btn-tactile flex items-center justify-center gap-2 shadow-lg shadow-purple-900/20"
                        >
                            <Play className="w-4 h-4 fill-white" /> Start Mission
                        </Link>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default SubjectCard;
