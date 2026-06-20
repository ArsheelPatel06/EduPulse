import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import QuestCard from '../components/QuestCard';
import { useAppState } from '../state/appState';
import { Target, Clock, Trophy, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Quests = () => {
    const { state } = useAppState();
    const { events } = state;

    // Generate dynamic quests from events
    const examQuests = events
        .filter(e => e.type === 'exam' && new Date(e.date) > new Date()) // Future exams
        .map(e => ({
            id: `exam-${e.id}`,
            title: `Prep for ${e.title}`,
            subject: e.subject || "General",
            subjectId: e.subject === "Data Structures" ? "js" : (e.subject === "DBMS" ? "html" : "js"), // Mapping
            difficulty: "Hard",
            xp: 1000,
            progress: 10,
            status: "active"
        }));

    // Mock Data for Quests (Static + Dynamic)
    const staticQuests = [
        { id: 1, title: "Master Linked Lists", subject: "Data Structures", subjectId: "js", difficulty: "Medium", xp: 500, progress: 45, status: "active" },
        { id: 2, title: "SQL Joins Normalization", subject: "DBMS", subjectId: "html", difficulty: "Hard", xp: 1200, progress: 10, status: "active" },
        { id: 3, title: "Process Scheduling", subject: "Operating Systems", subjectId: "js", difficulty: "Medium", xp: 600, progress: 0, status: "upcoming" },
        { id: 4, title: "Binary Trees Basics", subject: "Data Structures", subjectId: "js", difficulty: "Easy", xp: 300, progress: 0, status: "upcoming" },
        { id: 5, title: "Intro to Algorithms", subject: "Data Structures", subjectId: "js", difficulty: "Easy", xp: 250, progress: 100, status: "completed" },
    ];

    const allQuests = React.useMemo(() => {
        const teacherAssignments = (state.sharedAssignments || []).map(a => ({
            id: a.id,
            title: a.title,
            subject: a.courseId || "General",
            subjectId: "general", // Can map based on courseId if needed
            difficulty: "Medium",
            xp: a.xp || 500,
            progress: 0,
            status: new Date(a.dueDate) < new Date() ? "completed" : "active"
        }));

        return [...examQuests, ...staticQuests, ...teacherAssignments];
    }, [events, state.sharedAssignments]);

    const activeQuests = allQuests.filter(q => q.status === 'active');
    const upcomingQuests = allQuests.filter(q => q.status === 'upcoming');
    const completedQuests = allQuests.filter(q => q.status === 'completed');

    const [showCompleted, setShowCompleted] = useState(false);

    return (
        <div className="min-h-screen bg-base text-main transition-colors duration-300">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">

                {/* Header */}
                <div className="space-y-2">
                    <h1 className="text-4xl font-black uppercase tracking-tight flex items-center gap-3">
                        <Target className="w-10 h-10 text-purple-600" />
                        Assignments & Challenges
                    </h1>
                    <p className="text-muted font-bold text-lg max-w-2xl">
                        Complete assignments to gain XP and master subjects
                    </p>
                </div>

                {/* 1. Active Quests */}
                <section>
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-2 h-8 bg-purple-600 rounded-full" />
                        <h2 className="text-2xl font-black uppercase">Active Assignments</h2>
                        <span className="bg-purple-900/30 text-purple-400 text-xs font-bold px-2 py-1 rounded ml-2">
                            {activeQuests.length} ACTIVE
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {activeQuests.map(quest => (
                            <QuestCard key={quest.id} {...quest} />
                        ))}
                    </div>
                </section>

                {/* 2. Upcoming Quests */}
                <section>
                    <div className="flex items-center gap-2 mb-6 opacity-70">
                        <div className="w-2 h-8 bg-gray-600 rounded-full" />
                        <h2 className="text-2xl font-black uppercase">Upcoming Assignments</h2>
                        <Clock className="w-5 h-5 text-muted ml-2" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-80 hover:opacity-100 transition-opacity">
                        {upcomingQuests.map(quest => (
                            <QuestCard key={quest.id} {...quest} />
                        ))}
                    </div>
                </section>

                {/* 3. Completed Quests (Collapsible) */}
                <section className="border-t-2 border-border pt-8">
                    <button
                        onClick={() => setShowCompleted(!showCompleted)}
                        className="flex items-center gap-3 w-full group text-left"
                    >
                        <div className="w-10 h-10 rounded-lg bg-surface border-2 border-border flex items-center justify-center group-hover:border-green-500 transition-colors">
                            <Trophy className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold uppercase text-muted group-hover:text-green-500 transition-colors">Completed Assignments</h2>
                            <p className="text-xs font-bold text-muted/60">{completedQuests.length} COMPLETED</p>
                        </div>
                        <div className="ml-auto">
                            {showCompleted ? <ChevronUp className="text-muted" /> : <ChevronDown className="text-muted" />}
                        </div>
                    </button>

                    <AnimatePresence>
                        {showCompleted && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-6">
                                    {completedQuests.map(quest => (
                                        <QuestCard key={quest.id} {...quest} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

            </main>
        </div>
    );
};

export default Quests;
