import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, X, RotateCw, Layers, Brain } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Flashcard from '../components/Flashcard';
import { flashcards as standardFlashcards, generateMockFlashcards } from '../data/questions';
import { useAppState } from '../state/appState';

const FlashcardGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { dispatch } = useAppState();

    const subjectId = location.state?.subjectId;
    let flashcards = standardFlashcards;

    if (subjectId && !standardFlashcards.some(f => f.courseId === subjectId)) {
        flashcards = generateMockFlashcards(location.state?.title || subjectId);
    }

    // Game State
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [direction, setDirection] = useState(0);
    const [knownCount, setKnownCount] = useState(0);
    const [sessionComplete, setSessionComplete] = useState(false);

    const currentCard = flashcards[currentIndex];
    const progress = ((currentIndex) / flashcards.length) * 100;

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    const handleRate = (known) => {
        // If not flipped yet, just flip it first? Or force flip?
        // Requirement says "After selection: Flip card... Award XP".
        // Let's assume user flips first to check, OR if they click rate, we show answer then move on.
        // Better flow: User sees front -> Flips -> Rates.

        if (!isFlipped) {
            setIsFlipped(true);
            return; // Wait for user to confirm after seeing answer? 
            // Actually, if they rate, they are done with this card.
        }

        if (known) setKnownCount(prev => prev + 1);

        // Animation direction
        setDirection(known ? 1 : -1);

        // Delay for animation then move next
        setTimeout(() => {
            if (currentIndex < flashcards.length - 1) {
                setCurrentIndex(curr => curr + 1);
                setIsFlipped(false);
                setDirection(0);
            } else {
                finishSession(known ? knownCount + 1 : knownCount);
            }
        }, 200);
    };

    const finishSession = (finalKnown) => {
        setSessionComplete(true);
        // Award XP based on performance
        const xpEarned = finalKnown * 5;
        if (xpEarned > 0) {
            dispatch({ type: 'ADD_XP', payload: xpEarned });
        }
    };

    if (sessionComplete) {
        return (
            <div className="min-h-screen bg-base text-main flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-surface border-2 border-border p-8 rounded-3xl max-w-md w-full text-center shadow-2xl"
                >
                    <Brain className="w-16 h-16 text-purple-500 mx-auto mb-6" />
                    <h2 className="text-3xl font-black uppercase mb-2">Session Complete</h2>
                    <p className="text-muted font-bold text-lg mb-8">Knowledge Retained</p>

                    <div className="text-5xl font-black text-main mb-2">
                        {Math.round((knownCount / flashcards.length) * 100)}%
                    </div>
                    <p className="text-sm text-muted uppercase font-bold tracking-widest mb-8">Mastery Level</p>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 btn-tactile shadow-lg shadow-purple-900/20"
                    >
                        Return to Dashboard
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="w-full mt-4 py-3 bg-base border-2 border-border text-muted font-bold rounded-xl hover:text-main transition-colors"
                    >
                        Practice Again
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base text-main flex flex-col items-center relative overflow-hidden transition-colors duration-300">

            {/* Minimal Header */}
            <div className="w-full max-w-3xl mx-auto px-6 py-8 flex items-center justify-between z-10">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-surface text-muted hover:text-main transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-muted uppercase tracking-wider mb-1">{location.state?.title || 'Knowledge'} Mastery</span>
                    <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-purple-500" />
                        <span className="font-mono font-bold">{currentIndex + 1} <span className="text-muted">/ {flashcards.length}</span></span>
                    </div>
                </div>

                <div className="w-10" />
            </div>

            {/* Main Prep Area */}
            <main className="flex-1 w-full max-w-md mx-auto flex flex-col justify-center items-center px-6 pb-20 relative">

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: direction * 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: direction * -50, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="w-full perspective-1000"
                    >
                        {/* 
                            Re-using Flashcard Component structure but implemented directly here for control 
                            since the previous one might be just UI.
                            Let's use the UI one if it handles flipping, but we need manual flip control.
                            For now, implement direct flip structure.
                        */}
                        <div
                            onClick={handleFlip}
                            className="relative w-full aspect-[4/5] cursor-pointer group perspective-1000"
                        >
                            <motion.div
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full relative"
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                {/* Front */}
                                <div
                                    className="absolute inset-0 bg-surface border-2 border-border rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-xl"
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <span className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-4">Question</span>
                                    <h3 className="text-2xl font-bold text-main leading-relaxed">
                                        {currentCard.front}
                                    </h3>
                                    <p className="mt-8 text-xs font-bold text-muted uppercase flex items-center gap-2">
                                        <RotateCw className="w-4 h-4" /> Tap to Reveal
                                    </p>
                                </div>

                                {/* Back */}
                                <div
                                    className="absolute inset-0 bg-surface border-2 border-purple-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(147,51,234,0.15)]"
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)"
                                    }}
                                >
                                    <span className="text-xs font-bold text-purple-500 uppercase tracking-wider mb-4">Explanation</span>
                                    <h3 className="text-xl font-medium text-main leading-relaxed">
                                        {currentCard.back}
                                    </h3>
                                </div>
                            </motion.div>
                        </div>

                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <div className="flex items-center gap-6 mt-12 w-full justify-center">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRate(false)}
                        className="w-16 h-16 rounded-full bg-surface border-2 border-red-500 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-lg shadow-red-500/10"
                        title="Didn't Know"
                    >
                        <X className="w-8 h-8" />
                    </motion.button>

                    <div className="text-center px-4">
                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest block mb-1">Rate Knowledge</span>
                        <div className="h-1 w-12 bg-border mx-auto rounded-full" />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRate(true)}
                        className="w-16 h-16 rounded-full bg-surface border-2 border-green-500 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors shadow-lg shadow-green-500/10"
                        title="Knew It"
                    >
                        <Check className="w-8 h-8" />
                    </motion.button>
                </div>

            </main>

            {/* Progress Bar (Bottom) */}
            <div className="fixed bottom-0 left-0 w-full h-1 bg-surface">
                <motion.div
                    className="h-full bg-purple-600"
                    animate={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

export default FlashcardGame;
