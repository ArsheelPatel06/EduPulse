import React, { useEffect } from 'react';
import { useAppState } from '../state/appState';
import Navbar from '../components/Navbar';
import MissionItem from '../components/MissionItem';
import { motion } from 'framer-motion';
import { Map, Zap } from 'lucide-react';
import { Link, useLocation, useParams } from 'react-router-dom';

const Course = () => {
    const { state } = useAppState();
    const location = useLocation();
    const { id: urlId } = useParams();
    const [expandedId, setExpandedId] = React.useState(null);

    // Auto-expand card if returning from a quest or via URL param
    useEffect(() => {
        if (location.state?.expandId) {
            setExpandedId(location.state.expandId);
        } else if (urlId) {
            setExpandedId(urlId);
        }
    }, [location.state, urlId]);

    const toggleExpand = (id) => {
        setExpandedId(prev => prev === id ? null : id);
    };

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

    return (
        <div className="min-h-screen bg-base text-main selection:bg-purple-500/30 transition-colors duration-300">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Learning Paths Header */}
                <div className="text-center mb-16 relative">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border-2 border-border text-purple-600 font-bold uppercase tracking-wider text-xs mb-4 shadow-sm"
                    >
                        <Map className="w-4 h-4" />
                        Learning Paths
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-5xl font-black text-main mb-4 tracking-tight"
                    >
                        Curriculum Hub
                    </motion.h1>
                    <p className="text-muted max-w-2xl mx-auto text-lg font-medium">
                        Select a learning path to begin your study session and earn your Learning Score.
                    </p>
                </div>

                {/* Active Campaign / Quick Start (Micro-task) */}
                {state.activeCourseId && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 p-6 rounded-2xl bg-surface border-2 border-purple-500/50 shadow-[0_0_20px_rgba(147,51,234,0.1)] flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center animate-pulse">
                                <Zap className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-main uppercase">Current Objective</h3>
                                <p className="text-muted font-medium">Continue your streak in <strong>Web Development</strong>.</p>
                            </div>
                        </div>
                        <button className="px-6 py-3 bg-purple-600 text-white font-bold uppercase rounded-xl hover:bg-purple-700 transition-colors shadow-lg shadow-purple-900/20 flex items-center gap-2">
                            Resume <Zap className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}

                {/* Mission Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
                    {combinedCourses.map((course, index) => {
                        const isExpanded = expandedId === course.id;

                        return (
                            <motion.div
                                key={course.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative ${isExpanded ? 'lg:col-span-2 row-span-2' : ''}`}
                            >
                                {/* Enhanced Subject Card Container */}
                                <motion.div
                                    layout
                                    className={`bg-surface rounded-2xl border-2 transition-all duration-300 overflow-hidden flex flex-col relative
                                ${isExpanded ? 'border-purple-500 shadow-2xl shadow-purple-500/10 z-10' : 'border-border hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10'}
                                `}
                                >

                                    {/* Card Header / Visual */}
                                    <div className="h-32 bg-base relative overflow-hidden border-b-2 border-border">
                                        <div className={`absolute inset-0 opacity-20 ${index % 3 === 0 ? 'bg-purple-500' : index % 3 === 1 ? 'bg-blue-500' : 'bg-red-500'
                                            }`} />
                                        {/* Grid Pattern Overlay */}
                                        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '10px 100px', opacity: 0.1 }} />

                                        <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur px-2 py-1 rounded text-xs font-black uppercase border border-border">
                                            Lvl {course.isLocked ? 'Locked' : Math.floor((course.progress ?? course.xp) / 500) + 1}
                                        </div>
                                        <div className="absolute bottom-4 left-4">
                                            <h3 className="text-xl font-black text-main tracking-tight">{course.title}</h3>
                                        </div>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-5 flex-1 flex flex-col gap-4">
                                        {/* Progress */}
                                        <div className="space-y-1">
                                            <div className="flex justify-between text-xs font-bold text-muted uppercase">
                                                <span>Path Progress</span>
                                                <span>{course.progress ?? course.xp} / {course.totalXp} LS</span>
                                            </div>
                                            <div className="h-2 w-full bg-base rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-purple-600 rounded-full"
                                                    style={{ width: `${((course.progress ?? course.xp) / course.totalXp) * 100}%` }}
                                                />
                                            </div>
                                        </div>

                                        {/* Expanded: Mission List & Details */}
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="space-y-4 mt-2"
                                            >
                                                {/* Objective & Content */}
                                                <div className="bg-base/50 rounded-xl p-4 border border-border/50">
                                                    <p className="text-sm font-bold text-main mb-3">
                                                        <span className="text-purple-500 uppercase text-xs tracking-wider block mb-1">Objective</span>
                                                        {course.objective}
                                                    </p>

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Includes</span>
                                                            <ul className="list-disc list-inside text-xs font-medium text-muted space-y-1">
                                                                {course.contentIncludes?.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <span className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">XP Condition</span>
                                                            <ul className="list-disc list-inside text-xs font-medium text-muted space-y-1">
                                                                {course.progressLogic?.map((item, i) => (
                                                                    <li key={i}>{item}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="border-t-2 border-border border-dashed my-2" />

                                                <p className="text-[10px] font-bold text-muted uppercase mb-1">Select Topic</p>
                                                <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
                                                    {course.missions?.length > 0 ? (
                                                        course.missions.map((mission) => (
                                                            <MissionItem
                                                                key={mission.id}
                                                                mission={mission}
                                                                subjectId={course.id}
                                                                isLocked={course.isLocked}
                                                            />
                                                        ))
                                                    ) : (
                                                        <div className="text-center py-4 text-sm text-muted font-medium italic">
                                                            No topics available yet. Unlock previous modules first.
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Collapsed: Active Quests Preview */}
                                        {!isExpanded && (
                                            <div className="bg-base rounded-xl p-3 border border-border">
                                                <p className="text-[10px] font-bold text-muted uppercase mb-2">Available Topics</p>
                                                <div className="space-y-2">
                                                    {course.missions?.slice(0, 2).map((m) => (
                                                        <div key={m.id} className="flex items-center gap-2 text-xs font-bold text-main">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${m.completed ? 'bg-green-500' : 'bg-yellow-500'}`} />
                                                            <span>{m.title}</span>
                                                        </div>
                                                    ))}
                                                    {(!course.missions || course.missions.length === 0) && <span className="text-xs text-muted">No active topics</span>}
                                                </div>
                                            </div>
                                        )}

                                        {/* Action Buttons */}
                                        <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
                                            <button className="py-2 rounded-lg border-2 border-border font-bold text-xs uppercase hover:bg-base transition-colors">
                                                Details
                                            </button>
                                            <button
                                                onClick={() => toggleExpand(course.id)}
                                                disabled={course.isLocked}
                                                className={`py-2 rounded-lg font-bold text-xs uppercase transition-colors shadow-lg 
                                                ${course.isLocked
                                                        ? 'bg-base border-2 border-border text-muted cursor-not-allowed shadow-none'
                                                        : isExpanded
                                                            ? 'bg-surface border-2 border-purple-500 text-purple-500'
                                                            : 'bg-purple-600 text-white hover:bg-purple-700 shadow-purple-900/20'
                                                    }`}
                                            >
                                                {course.isLocked ? 'Locked' : isExpanded ? 'Close' : 'Deploy'}
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bonus Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 rounded-3xl bg-surface border-2 border-border text-center overflow-hidden relative"
                >
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl border-2 border-yellow-500 flex items-center justify-center mx-auto mb-6">
                            <Zap className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h2 className="text-3xl font-black text-main mb-4">Classified Operations</h2>
                        <p className="text-muted font-medium mb-8">
                            Unlock "System Design" and "Advanced Algorithms" by reaching Level 15.
                        </p>
                        <button className="px-8 py-3 bg-base border-2 border-border text-muted font-bold rounded-xl cursor-not-allowed">
                            Locked (Lvl 15 Req)
                        </button>
                    </div>
                </motion.div>

            </main>
        </div>
    );
};

export default Course;
