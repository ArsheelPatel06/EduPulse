import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppState } from '../state/appState';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Shield, Zap, Clock } from 'lucide-react';
import { questions as standardQuestions, cssChallengeQuestions, generateMockQuestions } from '../data/questions';

const QuizGame = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { dispatch } = useAppState();

    // Determine Mode
    const mode = location.state?.mode || 'standard'; // 'standard' | 'challenge'
    const isChallenge = mode === 'challenge';
    const subjectId = location.state?.subjectId;

    // Select Data Source
    let activeQuestions = isChallenge ? cssChallengeQuestions : standardQuestions;

    // Filter by subject if applicable (only for standard mode)
    if (!isChallenge && subjectId) {
        const filtered = standardQuestions.filter(q => q.courseId === subjectId);
        if (filtered.length > 0) {
            activeQuestions = filtered;
        } else {
            // Generate mock questions for any unmapped teacher subject
            activeQuestions = generateMockQuestions(location.state?.title || subjectId);
        }
    }

    const [currentQIndex, setCurrentQIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    // Timer State (Challenge Only)
    const [timeLeft, setTimeLeft] = useState(90); // 90 seconds
    const [completedInTime, setCompletedInTime] = useState(false);

    // Mock Difficulty State
    const difficulty = isChallenge ? 'Time Attack' : 'Hard';
    const xpPotential = isChallenge ? 500 : 250;

    const currentQuestion = activeQuestions[currentQIndex];

    // Timer Logic
    useEffect(() => {
        if (!isChallenge || showResult) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleQuizFinish(false); // Time's up
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isChallenge, showResult]);

    const handleOptionClick = (index) => {
        if (isAnswered) return;

        setSelectedOption(index);
        setIsAnswered(true);

        const isCorrect = index === currentQuestion.correctAnswer;
        if (isCorrect) {
            setScore(prev => prev + 1);
        }

        // In Time Attack, auto-advance after short delay if we want speed, 
        // OR keep "Continue" button but without explanation for speed?
        // Requirement: "No explanation mid-session".
        // Let's auto-advance for flow in Time Attack.

        if (isChallenge) {
            setTimeout(() => {
                handleNext();
            }, 500);
        }
    };

    const handleQuizFinish = (finishedInTime = true) => {
        setShowResult(true);
        setCompletedInTime(finishedInTime);

        const missionId = location.state?.missionId;
        const subjectId = location.state?.subjectId;
        const missionXp = location.state?.xp || 0;

        let xpEarned = score * 10;

        // If it was a mission, we give at least the mission XP if they passed (score > 50%)
        if (missionId && score > activeQuestions.length / 2) {
            xpEarned = Math.max(xpEarned, missionXp);
        }

        if (isChallenge && finishedInTime && score > activeQuestions.length / 2) {
            xpEarned += 100; // Bonus
        }

        if (missionId && subjectId) {
            dispatch({
                type: 'COMPLETE_MISSION',
                payload: {
                    courseId: subjectId,
                    missionId: missionId,
                    xp: xpEarned
                }
            });
        } else {
            dispatch({ type: 'ADD_XP', payload: xpEarned });
        }
    };

    const handleNext = () => {
        if (currentQIndex < activeQuestions.length - 1) {
            setCurrentQIndex(prev => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            handleQuizFinish(true);
        }
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    if (showResult) {
        return (
            <div className="min-h-screen bg-base text-main flex items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-surface border-2 border-border p-8 rounded-3xl max-w-md w-full text-center shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-purple-500/5" />
                    <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-6 drop-shadow-lg" />

                    <h2 className="text-3xl font-black uppercase mb-2">
                        {isChallenge ? (completedInTime ? "Challenge Survived!" : "Time's Up!") : "Mission Complete!"}
                    </h2>
                    <p className="text-muted font-bold text-lg mb-8">
                        {isChallenge ? `Speed Run Analysis` : (location.state?.title || "Quiz Completed")}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-base border-2 border-border p-4 rounded-2xl">
                            <p className="text-xs font-bold text-muted uppercase">Score</p>
                            <p className="text-2xl font-black text-purple-500">{score}/{activeQuestions.length}</p>
                        </div>
                        <div className="bg-base border-2 border-border p-4 rounded-2xl">
                            <p className="text-xs font-bold text-muted uppercase">XP Earned</p>
                            <p className="text-2xl font-black text-yellow-500">
                                +{score * 10}{isChallenge && completedInTime && score > activeQuestions.length / 2 ? " + Bonus" : ""}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            navigate('/dashboard', { replace: true });
                        }}
                        className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 btn-tactile shadow-lg shadow-purple-900/20"
                    >
                        Return to Base
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base text-main flex flex-col transition-colors duration-300">
            {/* Game HUD */}
            <div className="px-6 py-6 flex items-center justify-between bg-surface border-b-2 border-border z-10 relative shadow-sm">
                <button onClick={() => navigate('/dashboard')} className="p-2 hover:bg-base rounded-lg transition-colors -ml-2">
                    <ArrowLeft className="w-6 h-6 text-muted" />
                </button>

                <div className="flex items-center gap-4">
                    {/* Timer (Challenge) or Difficulty (Standard) */}
                    {isChallenge ? (
                        <div className={`flex items-center gap-2 bg-base border-2 px-3 py-1.5 rounded-lg ${timeLeft < 10 ? 'border-red-500 text-red-500 animate-pulse' : 'border-border text-main'}`}>
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-black uppercase tracking-wider tabular-nums">{formatTime(timeLeft)}</span>
                        </div>
                    ) : (
                        <div className="hidden sm:flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg">
                            <Shield className="w-4 h-4 text-red-500" />
                            <span className="text-xs font-black text-red-500 uppercase tracking-wider">{difficulty}</span>
                        </div>
                    )}

                    {/* XP Bounty */}
                    <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-lg">
                        <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-black text-yellow-500 uppercase tracking-wider">+{xpPotential} XP</span>
                    </div>
                </div>

                <div className="text-right">
                    <span className="text-xs font-bold text-muted uppercase block">Question</span>
                    <span className="text-xl font-black text-main">{currentQIndex + 1} <span className="text-sm text-muted">/ {activeQuestions.length}</span></span>
                </div>
            </div>

            {/* Main Battle Area */}
            <main className="flex-1 max-w-3xl mx-auto w-full p-6 flex flex-col justify-center">

                {/* Question Area */}
                <div className="bg-surface border-2 border-dashed border-border p-6 md:p-10 rounded-3xl mb-8 relative">
                    <h2 className="text-2xl md:text-3xl font-bold leading-snug text-main">
                        {currentQuestion.question}
                    </h2>
                </div>

                {/* Options Grid */}
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => {
                        const isSelected = selectedOption === index;
                        const isCorrect = index === currentQuestion.correctAnswer;

                        // Battle Logic Styles
                        let containerStyle = "border-border hover:border-purple-500 hover:bg-surface";
                        let icon = <div className="w-5 h-5 rounded-full border-2 border-muted" />;

                        // Only show Green/Red feedback IMMEDIATE if standard mode, OR if we want visuals in challenge before auto-next.
                        // Since we auto-next in challenge, showing brief color is good.

                        if (isAnswered) {
                            if (isCorrect) {
                                containerStyle = "border-green-500 bg-green-500/10 ring-1 ring-green-500";
                                icon = <CheckCircle2 className="w-6 h-6 text-green-500 fill-current" />;
                            } else if (isSelected && !isCorrect) {
                                containerStyle = "border-red-500 bg-red-500/10 ring-1 ring-red-500";
                                icon = <XCircle className="w-6 h-6 text-red-500 fill-current" />;
                            } else {
                                containerStyle = "border-border opacity-40";
                            }
                        } else if (isSelected) {
                            containerStyle = "border-purple-500 bg-purple-500/10";
                        }

                        return (
                            <motion.button
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                disabled={isAnswered}
                                whileTap={{ scale: 0.99 }}
                                className={`w-full p-5 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${containerStyle} btn-tactile`}
                            >
                                <span className={`font-bold text-lg ${isAnswered && !isCorrect && isSelected ? 'text-red-500' : 'text-main'}`}>
                                    {option}
                                </span>
                                {icon}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Result Feedback Overlay (Standard Only or End of Challenge) */}
                <AnimatePresence>
                    {isAnswered && !isChallenge && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="fixed bottom-0 left-0 w-full p-6 bg-surface border-t-2 border-border shadow-2xl z-50 flex flex-col md:flex-row items-center justify-center gap-6"
                        >
                            <div className="flex items-center gap-4 max-w-2xl">
                                {selectedOption === currentQuestion.correctAnswer ? (
                                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                                        <CheckCircle2 className="w-8 h-8 text-white" />
                                    </div>
                                ) : (
                                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                                        <XCircle className="w-8 h-8 text-white" />
                                    </div>
                                )}
                                <div>
                                    <h4 className="font-black text-lg text-main">
                                        {selectedOption === currentQuestion.correctAnswer ? "Excellent!" : "Missed it!"}
                                    </h4>
                                    <p className="text-sm text-muted">{currentQuestion.explanation}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleNext}
                                className="px-8 py-3 bg-main text-base rounded-xl font-bold hover:scale-105 transition-transform bg-purple-600 text-white shadow-lg"
                            >
                                Continue
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
};

export default QuizGame;
