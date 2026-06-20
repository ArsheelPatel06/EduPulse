import React from 'react';
import Navbar from '../components/Navbar';
import { useAppState } from '../state/appState';
import { Trophy, TrendingUp, Zap, Target, Award, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import OverallProgressCard from '../components/OverallProgressCard';
import SubjectResultCard from '../components/SubjectResultCard';
import InsightCard from '../components/InsightCard';

const Results = () => {
    const { state } = useAppState();
    const { user, courses } = state;

    const overallProgress = Math.round(courses.reduce((acc, c) => acc + (c.progress ?? c.xp ?? 0), 0) / courses.length);

    return (
        <div className="min-h-screen bg-base text-main transition-colors duration-300">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-3">
                        <TrendingUp className="w-10 h-10 text-purple-600" />
                        Learning Analytics
                    </h1>
                    <p className="text-muted font-bold text-lg">
                        Track your evolution from Novice to Scholar.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* 1. Overall Progress Summary */}
                    <OverallProgressCard
                        level={user.level}
                        xp={user.xp}
                        streak={user.streak}
                        mastery={overallProgress}
                    />

                    {/* 2. Subject-wise Mastery */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-2 bg-surface p-6 rounded-2xl border-2 border-border space-y-6"
                    >
                        <h2 className="text-xl font-black uppercase flex items-center gap-2">
                            <Target className="w-5 h-5 text-purple-600" />
                            Subject Mastery
                        </h2>

                        <div className="space-y-4">
                            {courses.map((course) => (
                                <SubjectResultCard
                                    key={course.id}
                                    title={course.title}
                                    mastery={course.mastery}
                                    accuracy={Math.round(course.mastery * 0.9)} // Mock derived accuracy
                                    attempts={Math.floor(Math.random() * 20) + 5} // Mock attempts
                                    weakArea={course.mastery < 50 ? "Core Concepts" : null}
                                />
                            ))}
                        </div>
                    </motion.section>

                    {/* 3. Recent Performance Insights */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        <InsightCard
                            type="brain"
                            title="Pattern Detected"
                            description="Conceptual mistakes are most common in Data Structures & Algorithms. Review 'Tree Traversal' basics."
                        />
                        <InsightCard
                            type="warning"
                            title="Difficulty Analysis"
                            description="You have mastered Easy questions. Medium difficulty questions need more practice to level up."
                        />
                        <InsightCard
                            type="success"
                            title="Strength Identified"
                            description="Consistent performance in DBMS Normalization. You are ready for Advanced SQL queries."
                        />
                        <InsightCard
                            type="info"
                            title="Speed Optimization"
                            description="Your average answer time is improving. Keep aiming for under 45 seconds per question."
                        />
                    </motion.section>

                </div>
            </main>
        </div>
    );
};

export default Results;
