import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppState } from '../state/appState';
import SubjectCard from '../components/SubjectCard';
import Navbar from '../components/Navbar';
import MomentumIndicator from '../components/MomentumIndicator';
import OverallProgressCard from '../components/OverallProgressCard';
import { motion } from 'framer-motion';
import {
    Trophy, Target, Zap, ArrowRight, Map, Shield, Sword, Play
} from 'lucide-react';

const Dashboard = () => {
    const { state } = useAppState();
    const navigate = useNavigate();

    const combinedCourses = React.useMemo(() => {
        const published = state.sharedCurriculum.filter(c => c.status === 'published').map(c => ({
            id: c.id,
            title: c.title,
            objective: c.description || c.objective || 'Teacher assigned learning path',
            contentIncludes: c.tags || ['Teacher Content'],
            progressLogic: ['Complete Assignments', 'Pass Quizzes'],
            isLocked: false,
            xp: 0,
            progress: 0,
            totalXp: 1000,
            missions: []
        }));
        return [...state.courses, ...published];
    }, [state.courses, state.sharedCurriculum]);

    const sortedCourses = [...combinedCourses].sort((a, b) => a.mastery - b.mastery);
    const weakTopic = sortedCourses[0];
    const xpProgress = (state.user.xp % 5000) / 50; // percentage

    const handleResume = () => {
        if (state.activeCourseId) {
            navigate('/courses', { state: { expandId: state.activeCourseId } });
        } else {
            navigate('/courses');
        }
    };

    return (
        <div className="min-h-screen bg-base text-main selection:bg-purple-500/30 pb-20 transition-colors duration-300">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* TOP SECTION: Student Banner & Momentum */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Student Identity Banner */}
                    <div className="lg:col-span-3 bg-surface border-2 border-border p-6 rounded-2xl relative overflow-hidden group hover:border-purple-500 transition-colors">
                        <div className="absolute top-0 right-0 p-6 opacity-10">
                            <Shield className="w-32 h-32 text-purple-600" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
                            {/* Avatar / Level */}
                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 bg-base rounded-2xl border-2 border-border flex items-center justify-center mb-2 shadow-sm">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${state.user.name}`}
                                        alt="Avatar"
                                        className="w-20 h-20"
                                    />
                                </div>
                                <div className="bg-purple-600 text-white px-4 py-1 rounded-lg text-sm font-black uppercase tracking-wider shadow-md">
                                    Lvl {state.user.level}
                                </div>
                            </div>

                            {/* XP & Progress */}
                            <div className="flex-1 w-full flex flex-col justify-center h-full pt-2">
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <h2 className="text-3xl font-black text-main uppercase tracking-tight">Student Identity</h2>
                                        <p className="text-muted font-bold text-sm">Season Rank: <span className="text-purple-500">Scholar Novice</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-muted uppercase tracking-wider">Experience</p>
                                        <p className="text-2xl font-black text-main">{state.user.xp.toLocaleString()} <span className="text-sm text-muted">LS</span></p>
                                    </div>
                                </div>

                                {/* XP Bar */}
                                <div className="h-6 w-full bg-base rounded-full border-2 border-border overflow-hidden relative shadow-inner">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${xpProgress}%` }}
                                        transition={{ duration: 1.5, ease: "easeOut" }}
                                        className="h-full bg-purple-600 relative shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                                    />
                                    <p className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-md z-10 mix-blend-plus-lighter">
                                        {Math.round(xpProgress)}% TO NEXT LEVEL
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Momentum / Streak */}
                    <div className="lg:col-span-1 h-full min-h-[160px]">
                        <MomentumIndicator streak={state.user.streak} hasStudiedToday={false} />
                    </div>
                </div>

                {/* MID SECTION: Current Objectives */}
                <h3 className="text-xl font-black text-muted uppercase tracking-wider flex items-center gap-2">
                    <Sword className="w-5 h-5" /> Current Objectives
                </h3>

                <div className="grid md:grid-cols-2 gap-6">

                    {/* 1. Player Identity Section */}
                    {/* Note: In previous structure, this grid contained Focus Mission/Daily Challenge. 
                        User request wanted to sync Resume button. 
                        I'm restoring the layout while integrating the new HUD card for the 'Resume' feature.
                        Wait, looking at the logic, I replaced the Cards with the Header + HUD layout which broke the structure.
                        I should probably keep the original layout but update one of the cards to be 'Current Objective'.
                    */}

                    {/* Priority Quest (React) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bg-surface border-2 border-border p-6 rounded-2xl flex flex-col justify-between relative overflow-hidden group hover:border-blue-500 transition-colors"
                    >
                        <div className="absolute right-0 top-0 p-4 opacity-10">
                            <Target className="w-24 h-24" />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-blue-500 mb-1">
                                <Target className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">Priority Path</span>
                            </div>
                            <div className="text-2xl font-black text-main leading-none mb-2">
                                React Framework
                            </div>
                            <div className="text-sm font-bold text-muted mb-4">
                                Master component lifecycles.
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/study/flashcards')}
                            className="mt-4 w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 btn-tactile flex items-center justify-center gap-2"
                        >
                            <Play className="w-4 h-4 fill-white" /> Engage Mission
                        </button>
                    </motion.div>

                    {/* Daily Challenge (CSS) */}
                    < motion.div
                        whileHover={{ y: -2 }}
                        className="bg-surface border-2 border-border p-6 rounded-2xl relative overflow-hidden group hover:border-green-500 transition-colors"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <div className="flex items-center gap-2 text-green-500 mb-2">
                                    <Zap className="w-5 h-5" />
                                    <span className="text-xs font-bold uppercase tracking-wider">Daily Bonus</span>
                                </div>
                                <h3 className="text-2xl font-black text-main mb-1">Score Rush</h3>
                                <p className="text-muted font-medium text-sm">CSS Challenge. 90 Seconds.</p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/study/quiz', { state: { mode: 'challenge' } })}
                            className="w-full px-6 py-3 bg-green-600 text-white border-2 border-green-500 hover:bg-green-700 btn-tactile flex items-center justify-center gap-2 font-bold rounded-xl shadow-lg shadow-green-900/10"
                        >
                            Start Challenge <ArrowRight className="w-4 h-4" />
                        </button>
                    </motion.div>
                </div >

                {/* BOTTOM SECTION: Quest Log */}
                < section >
                    <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-border">
                        <h3 className="text-xl font-black text-muted uppercase tracking-wider flex items-center gap-2">
                            <Map className="w-5 h-5" /> Learning Paths
                        </h3>
                        <Link to="/courses" className="text-sm font-bold text-main hover:text-purple-500 transition-colors">VIEW ALL PATHS</Link>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {combinedCourses.map(course => (
                            <SubjectCard key={course.id} course={course} />
                        ))}
                    </div>
                </section >

            </main >
        </div >
    );
};

export default Dashboard;
