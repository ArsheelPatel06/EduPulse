import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Briefcase, GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAppState } from '../state/appState';

const Onboarding = () => {
    const navigate = useNavigate();
    const { dispatch } = useAppState();
    const [step, setStep] = useState(1);

    // Form State
    const [userType, setUserType] = useState(null);
    const [domain, setDomain] = useState(null);
    const [course, setCourse] = useState(null);
    const handleNext = () => {
        if (step < 3) setStep(prev => prev + 1);
        else {
            // Determine role and navigation based on userType selection
            const role = userType === 'teacher' ? 'teacher' : (userType === 'admin' ? 'admin' : 'student');
            
            // Register and login user via state mock
            dispatch({
                type: 'LOGIN',
                payload: {
                    user: {
                        id: role === 'student' ? 'S002' : (role === 'teacher' ? 'T002' : 'A002'),
                        name: role === 'student' ? 'New Student' : (role === 'teacher' ? 'New Teacher' : 'New Admin'),
                        email: `new@${role}.com`,
                        role: role,
                        avatar: 'New',
                        xp: 0,
                        level: 1,
                        streak: 0
                    }
                }
            });

            if (role === 'teacher') navigate('/teacher');
            else if (role === 'admin') navigate('/admin');
            else navigate('/dashboard');
        }
    };

    return (
        <div className="min-h-screen bg-base text-main flex flex-col items-center justify-center p-6 bg-[radial-gradient(var(--border-color)_1px,transparent_1px)] [background-size:20px_20px] transition-colors duration-300">

            <div className="w-full max-w-4xl">
                {/* Progress Bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-end mb-4">
                        <h1 className="text-3xl font-black text-main">Setup Profile</h1>
                        <span className="font-mono text-muted font-bold">Step {step} / 3</span>
                    </div>
                    <div className="h-4 bg-surface rounded-full border-2 border-border overflow-hidden">
                        <motion.div
                            animate={{ width: `${(step / 3) * 100}%` }}
                            className="h-full bg-purple-600"
                        />
                    </div>
                </div>

                {/* Steps */}
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <StepContainer key="step1" title="Select your Role">
                            <div className="grid md:grid-cols-3 gap-6">
                                <SelectionCard
                                    icon={GraduationCap}
                                    label="Student"
                                    selected={userType === 'student'}
                                    onClick={() => setUserType('student')}
                                />
                                <SelectionCard
                                    icon={BookOpen}
                                    label="Teacher"
                                    selected={userType === 'teacher'}
                                    onClick={() => setUserType('teacher')}
                                />
                                <SelectionCard
                                    icon={CheckCircle2}
                                    label="Administrator"
                                    selected={userType === 'admin'}
                                    onClick={() => setUserType('admin')}
                                />
                            </div>
                        </StepContainer>
                    )}

                    {step === 2 && (
                        <StepContainer key="step2" title="Select your Domain">
                            <div className="grid md:grid-cols-2 gap-6">
                                <SelectionCard
                                    label="Computer Science"
                                    selected={domain === 'cs'}
                                    onClick={() => setDomain('cs')}
                                />
                                <SelectionCard
                                    label="Commerce"
                                    selected={domain === 'commerce'}
                                    onClick={() => setDomain('commerce')}
                                />
                                <SelectionCard
                                    label="Arts & Humanities"
                                    selected={domain === 'arts'}
                                    onClick={() => setDomain('arts')}
                                />
                                <SelectionCard
                                    label="Medical"
                                    selected={domain === 'med'}
                                    onClick={() => setDomain('med')}
                                />
                            </div>
                        </StepContainer>
                    )}

                    {step === 3 && (
                        <StepContainer key="step3" title="Select your Course">
                            <div className="grid md:grid-cols-2 gap-6">
                                <SelectionCard
                                    label="B.Sc Computer Science"
                                    selected={course === 'bsc_cs'}
                                    onClick={() => setCourse('bsc_cs')}
                                />
                                <SelectionCard
                                    label="B.Sc IT"
                                    selected={course === 'bsc_it'}
                                    onClick={() => setCourse('bsc_it')}
                                />
                                <SelectionCard
                                    label="B.Tech"
                                    selected={course === 'btech'}
                                    onClick={() => setCourse('btech')}
                                />
                                <SelectionCard
                                    label="BCA"
                                    selected={course === 'bca'}
                                    onClick={() => setCourse('bca')}
                                />
                            </div>
                        </StepContainer>
                    )}
                </AnimatePresence>

                {/* Footer Controls */}
                <div className="mt-12 flex justify-between items-center">
                    <button
                        onClick={() => setStep(p => Math.max(1, p - 1))}
                        disabled={step === 1}
                        className="px-6 py-3 font-bold text-gray-500 hover:text-white disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
                    >
                        Back
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={
                            (step === 1 && !userType) ||
                            (step === 2 && !domain) ||
                            (step === 3 && !course)
                        }
                        className="px-8 py-4 bg-white text-black font-black rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 border-b-4 border-gray-300 hover:border-gray-400 active:border-b-0 active:translate-y-1"
                    >
                        {step === 3 ? 'Start Learning' : 'Next Step'}
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

            </div>
        </div>
    );
};

const StepContainer = ({ children, title }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.2 }}
    >
        <h2 className="text-2xl font-bold mb-8 text-muted">{title}</h2>
        {children}
    </motion.div>
);

const SelectionCard = ({ icon: Icon, label, selected, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`relative p-6 rounded-xl border-2 text-left transition-all w-full group
            ${disabled ? 'opacity-40 cursor-not-allowed border-border bg-surface' :
                selected
                    ? 'bg-purple-600/10 border-purple-500'
                    : 'bg-surface border-border hover:border-gray-400 dark:hover:border-gray-600'
            }
        `}
    >
        {Icon && (
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors border-2
               ${selected ? 'bg-purple-600 text-white border-purple-500' : 'bg-base text-muted border-border group-hover:border-gray-400 dark:group-hover:border-gray-600'}`}>
                <Icon className="w-6 h-6" />
            </div>
        )}
        <h3 className={`font-bold text-lg ${selected ? 'text-main' : 'text-muted group-hover:text-main'}`}>
            {label}
        </h3>
        {disabled && <span className="text-xs font-bold text-muted uppercase mt-2 block">Coming Soon</span>}

        {selected && (
            <div className="absolute top-4 right-4 text-purple-500">
                <CheckCircle2 className="w-6 h-6 fill-purple-500/20" />
            </div>
        )}
    </button>
);

export default Onboarding;
