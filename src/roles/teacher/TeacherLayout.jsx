// src/roles/teacher/TeacherLayout.jsx
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/appState';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BrainCircuit, LayoutDashboard, Users, BookOpen, ClipboardList,
    BarChart2, Bot, LogOut, Menu, X, ChevronRight, Bell, PenTool, Briefcase, ShieldAlert
} from 'lucide-react';

const navItems = [
    { to: '/teacher', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/teacher/students', label: 'Students', icon: Users },
    { to: '/teacher/curriculum', label: 'Curriculum Manager', icon: BookOpen },
    { to: '/teacher/assignments', label: 'Assignments', icon: PenTool },
    { to: '/teacher/placement', label: 'Placement Readiness', icon: Briefcase },
    { to: '/teacher/interventions', label: 'Interventions', icon: ShieldAlert },
    { to: '/teacher/analytics', label: 'Teacher Analytics', icon: BarChart2 },
];

const TeacherLayout = () => {
    const { state, dispatch } = useAppState();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const teacher = state.currentUser;

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    const unread = state.notifications.filter(n => !n.read).length;

    return (
        <div className="min-h-screen bg-base text-main flex transition-colors duration-300">
            {/* Mobile overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-surface border-r-2 border-border flex flex-col z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
                {/* Brand */}
                <div className="p-5 border-b-2 border-border flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
                        <BrainCircuit className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="font-black text-base tracking-tight text-main">EduPulse</span>
                        <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Teacher Portal</p>
                    </div>
                    <button className="ml-auto lg:hidden text-muted" onClick={() => setSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Teacher Info */}
                <div className="p-4 border-b-2 border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500/30 flex items-center justify-center font-black text-blue-500 text-sm">
                            {teacher?.name?.charAt(0) || 'T'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-main truncate">{teacher?.name || 'Teacher'}</p>
                            <p className="text-xs text-muted font-medium truncate">{teacher?.dept || 'Computer Science'}</p>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map(({ to, label, icon: Icon, end }) => (
                        <NavLink
                            key={to} to={to} end={end}
                            onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all group ${
                                    isActive
                                        ? 'bg-blue-500/15 text-blue-500 border-2 border-blue-500/30'
                                        : 'text-muted hover:text-main hover:bg-base border-2 border-transparent'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-500' : 'text-muted group-hover:text-main'}`} />
                                    <span>{label}</span>
                                    {isActive && <ChevronRight className="w-3 h-3 ml-auto text-blue-500" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                {/* AI Assistant */}
                <div className="p-4 border-t-2 border-border space-y-2">
                    <NavLink
                        to="/chatbot"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm text-muted hover:text-blue-500 hover:bg-blue-500/10 transition-all border-2 border-dashed border-border hover:border-blue-500/30"
                    >
                        <Bot className="w-4 h-4 shrink-0" />
                        <span>AI Assistant</span>
                    </NavLink>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm text-muted hover:text-red-500 hover:bg-red-500/10 transition-all border-2 border-transparent"
                    >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Bar */}
                <header className="h-16 bg-surface border-b-2 border-border flex items-center px-4 gap-4 sticky top-0 z-20">
                    <button className="lg:hidden p-2 rounded-lg hover:bg-base transition-colors text-muted" onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex-1" />
                    <button className="relative p-2 rounded-lg hover:bg-base transition-colors text-muted">
                        <Bell className="w-5 h-5" />
                        {unread > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-500 text-white text-[9px] font-black rounded-full flex items-center justify-center">
                                {unread}
                            </span>
                        )}
                    </button>
                    <div className="text-xs font-bold text-muted uppercase tracking-wider hidden sm:block">
                        Teacher View
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default TeacherLayout;
