import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, Lock, Mail, ArrowRight, GraduationCap, BookOpen, Shield } from 'lucide-react';
import { useAppState } from '../state/appState';

const demoUsers = {
    student: { id: 'S001', name: 'Arsheel Patel', email: 'student@edupulse.com', role: 'student', avatar: 'Arsheel' },
    teacher: { id: 'T001', name: 'Dr. Anjali Mehta', email: 'teacher@edupulse.com', role: 'teacher', avatar: 'Anjali', dept: 'Computer Science' },
    admin:   { id: 'A001', name: 'Platform Admin', email: 'admin@edupulse.com', role: 'admin', avatar: 'Admin' },
};

const Login = () => {
    const navigate = useNavigate();
    const { dispatch } = useAppState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeDemo, setActiveDemo] = useState(null);

    const handleLogin = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Default to student for form login
            handleDemoLogin('student');
        }, 1000);
    };

    const handleDemoLogin = (role) => {
        setActiveDemo(role);
        setLoading(true);
        const user = demoUsers[role];
        setTimeout(() => {
            dispatch({ type: 'LOGIN', payload: { user } });
            setLoading(false);
            setActiveDemo(null);
            if (role === 'teacher') navigate('/teacher');
            else if (role === 'admin') navigate('/admin');
            else navigate('/dashboard');
        }, 800);
    };

    const demoButtons = [
        {
            role: 'student',
            label: 'Login as Student',
            sublabel: 'Arsheel Patel — B.Sc CS, Year 3',
            icon: GraduationCap,
            color: 'purple',
        },
        {
            role: 'teacher',
            label: 'Login as Teacher',
            sublabel: 'Dr. Anjali Mehta — Computer Science',
            icon: BookOpen,
            color: 'blue',
        },
        {
            role: 'admin',
            label: 'Login as Admin',
            sublabel: 'Platform Administrator',
            icon: Shield,
            color: 'green',
        },
    ];

    return (
        <div className="min-h-screen bg-base text-main flex items-center justify-center p-4 transition-colors duration-300">
            <div className="absolute inset-0 bg-[radial-gradient(var(--border-color)_1px,transparent_1px)] [background-size:30px_30px] opacity-20 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 justify-center mb-4">
                        <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center border-2 border-purple-500/50">
                            <BrainCircuit className="text-white w-7 h-7" />
                        </div>
                        <span className="text-2xl font-black tracking-tight text-main">EduPulse</span>
                    </div>
                    <h1 className="text-2xl font-black tracking-tight text-main mb-1">Welcome Back</h1>
                    <p className="text-muted font-medium text-sm">Gamified Student Analytics & Learning Platform</p>
                </div>

                {/* Login Card */}
                <div className="bg-surface border-2 border-border rounded-2xl p-6">
                    <form onSubmit={handleLogin} className="space-y-4 mb-6">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-muted uppercase tracking-wider ml-1">Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-muted group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-base border-2 border-border rounded-xl py-3 pl-11 pr-4 text-main placeholder-muted focus:outline-none focus:border-purple-600 transition-colors text-sm font-medium"
                                    placeholder="you@university.edu"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-muted uppercase tracking-wider ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-3.5 w-4 h-4 text-muted group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-base border-2 border-border rounded-xl py-3 pl-11 pr-4 text-main placeholder-muted focus:outline-none focus:border-purple-600 transition-colors text-sm font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <button
                            type="submit" disabled={loading}
                            className="w-full bg-purple-600 text-white font-bold py-3 rounded-xl hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 text-sm"
                        >
                            {loading && !activeDemo ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
                        </button>
                    </form>

                    <div className="flex items-center gap-3 mb-5">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs font-bold text-muted uppercase tracking-wider">Demo Access</span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    {/* 3 Role Demo Buttons */}
                    <div className="space-y-2.5">
                        {demoButtons.map(({ role, label, sublabel, icon: Icon, color }) => {
                            const isLoading = loading && activeDemo === role;
                            const colorMap = {
                                purple: 'border-purple-500/40 hover:border-purple-500 text-purple-500 bg-purple-500/5 hover:bg-purple-500/10',
                                blue:   'border-blue-500/40 hover:border-blue-500 text-blue-500 bg-blue-500/5 hover:bg-blue-500/10',
                                green:  'border-green-500/40 hover:border-green-500 text-green-500 bg-green-500/5 hover:bg-green-500/10',
                            };
                            return (
                                <button
                                    key={role}
                                    onClick={() => handleDemoLogin(role)}
                                    disabled={loading}
                                    className={`w-full border-2 rounded-xl p-3 transition-all flex items-center gap-3 disabled:opacity-60 ${colorMap[color]}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-current/10 shrink-0`}>
                                        {isLoading
                                            ? <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
                                            : <Icon className="w-4 h-4" />
                                        }
                                    </div>
                                    <div className="text-left">
                                        <p className="font-bold text-sm text-main">{label}</p>
                                        <p className="text-xs text-muted font-medium">{sublabel}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 ml-auto opacity-60" />
                                </button>
                            );
                        })}
                    </div>
                </div>

                <p className="text-center mt-6 text-sm font-medium text-muted">
                    New to EduPulse? <Link to="/onboarding" className="text-purple-500 hover:text-purple-400">Get Started</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
