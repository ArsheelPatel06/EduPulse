import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { BrainCircuit, Trophy, Target, Zap, ArrowRight, Gamepad2, MousePointer2, Layout, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Landing = () => {
    const navigate = useNavigate();
    const [subtitleIndex, setSubtitleIndex] = useState(0);
    const subtitles = [
        "Turn exams into missions.",
        "Master subjects with XP.",
        "Your exam prep awaits."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const handleStartJourney = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="min-h-screen bg-base text-main transition-colors duration-300 flex flex-col relative overflow-hidden">
            {/* Background Grid - Minimalist */}
            <div className="absolute inset-0 bg-[radial-gradient(var(--border-color)_1px,transparent_1px)] [background-size:40px_40px] opacity-20 pointer-events-none" />

            <Navbar />

            <main className="flex-1 flex flex-col relative z-10 overflow-y-auto">

                {/* Hero Section */}
                <section className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 py-20">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border-2 border-border text-purple-600 font-bold uppercase tracking-wider text-[10px] mb-8"
                    >
                        <Gamepad2 className="w-3 h-3" />
                        Next-Gen Learning
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-8xl font-black tracking-tight mb-4 leading-tight text-main"
                    >
                        Level Up Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                            Learning Flow
                        </span>
                    </motion.h1>

                    <div className="h-8 mb-10 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key={subtitleIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-xl md:text-2xl text-muted font-bold italic"
                            >
                                {subtitles[subtitleIndex]}
                            </motion.p>
                        </AnimatePresence>
                    </div>

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={handleStartJourney}
                        className="px-10 py-4 bg-purple-600 text-white text-lg font-black uppercase tracking-widest rounded-xl hover:bg-purple-700 btn-tactile flex items-center gap-3 shadow-lg shadow-purple-900/20"
                    >
                        Start Your Journey <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </section>

                {/* Feature Cards Section */}
                <section className="max-w-6xl mx-auto px-6 py-20 w-full">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Target}
                            title="Adaptive Missions"
                            example="Ex: JS Arrays -> Filter Mastery"
                            desc="Quests that adapt to your skill level. Never too hard, never too boring."
                        />
                        <FeatureCard
                            icon={Trophy}
                            title="Skill Mastery"
                            example="Ex: +50 XP for Flexbox"
                            desc="Track your progress with XP bars and level up as you conquer topics."
                        />
                        <FeatureCard
                            icon={BrainCircuit}
                            title="AI Companion"
                            example="Ex: 'How do I use map()?'"
                            desc="Get instant hints and study plans from your personal AI strategist."
                        />
                    </div>
                </section>

                {/* How It Works Section */}
                <section className="bg-surface/50 border-y-2 border-border py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-black uppercase text-center mb-16 tracking-widest">How It Works</h2>
                        <div className="grid md:grid-cols-3 gap-12 text-center relative">
                            {/* Connector Lines (Desktop Only) */}
                            <div className="hidden md:block absolute top-[2.5rem] left-[20%] right-[20%] h-0.5 bg-border border-dashed border-b-2" />

                            <Step icon={Layout} number="01" text="Choose a Subject" />
                            <Step icon={Target} number="02" text="Complete Quests" />
                            <Step icon={Zap} number="03" text="Track Mastery & XP" />
                        </div>
                    </div>
                </section>

                {/* Simple Footer */}
                <footer className="py-12 px-6 border-t-2 border-border bg-base flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
                            <BrainCircuit className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-black text-lg tracking-tight">ExamPrep</span>
                    </div>

                    <div className="flex items-center gap-8 text-xs font-black uppercase tracking-widest text-muted">
                        <Link to="/courses" className="hover:text-purple-500 transition-colors">Missions</Link>
                        <Link to="/quests" className="hover:text-purple-500 transition-colors">Quests</Link>
                        <Link to="/chatbot" className="hover:text-purple-500 transition-colors">AI Help</Link>
                    </div>

                    <div className="text-[10px] font-bold text-muted/50 uppercase">
                        © 2026 Exam Prep
                    </div>
                </footer>

            </main>
        </div>
    );
};

const FeatureCard = ({ icon: Icon, title, desc, example }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-surface border-2 border-border p-8 rounded-3xl relative group hover:border-purple-500 transition-all flex flex-col h-full overflow-hidden"
    >
        <div className="w-12 h-12 rounded-xl bg-base border-2 border-border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-purple-600">
            <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-black uppercase mb-3 text-main">{title}</h3>
        <p className="text-muted font-bold text-sm mb-6 leading-relaxed flex-1">
            {desc}
        </p>

        {/* Hover Example */}
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute bottom-6 right-8 text-[10px] font-black text-purple-500 uppercase italic opacity-0 group-hover:opacity-100 transition-opacity"
        >
            {example}
        </motion.div>
    </motion.div>
);

const Step = ({ icon: Icon, number, text }) => (
    <div className="flex flex-col items-center relative z-10">
        <div className="w-20 h-20 rounded-2xl bg-surface border-2 border-border flex items-center justify-center mb-4 shadow-xl">
            <Icon className="w-10 h-10 text-purple-500" />
        </div>
        <span className="text-[10px] font-black text-muted mb-1">{number}</span>
        <p className="font-black uppercase text-sm tracking-widest text-main">{text}</p>
    </div>
);

export default Landing;

