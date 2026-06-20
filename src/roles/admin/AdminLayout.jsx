// src/roles/admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAppState } from '../../state/appState';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BrainCircuit, LayoutDashboard, Users, BarChart2, ScrollText,
    Bot, LogOut, Menu, X, ChevronRight, Bell, Shield, Briefcase, ShieldAlert
} from 'lucide-react';

const navItems = [
    { to: '/admin', label: 'Overview', icon: LayoutDashboard, end: true },
    { to: '/admin/users', label: 'User Management', icon: Users },
    { to: '/admin/placement', label: 'Placement Readiness', icon: Briefcase },
    { to: '/admin/interventions', label: 'Interventions', icon: ShieldAlert },
    { to: '/admin/analytics', label: 'Institution Analytics', icon: BarChart2 },
    { to: '/admin/audit', label: 'Audit Logs', icon: ScrollText },
];

const AdminLayout = () => {
    const { state, dispatch } = useAppState();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const admin = state.currentUser;

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-base text-main flex transition-colors duration-300">
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
                )}
            </AnimatePresence>

            <aside className={`fixed top-0 left-0 h-full w-64 bg-surface border-r-2 border-border flex flex-col z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:z-auto`}>
                {/* Brand */}
                <div className="p-5 border-b-2 border-border flex items-center gap-3">
                    <div className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <span className="font-black text-base tracking-tight text-main">EduPulse</span>
                        <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Admin Portal</p>
                    </div>
                    <button className="ml-auto lg:hidden text-muted" onClick={() => setSidebarOpen(false)}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Admin Info */}
                <div className="p-4 border-b-2 border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500/30 flex items-center justify-center font-black text-green-500 text-sm">
                            {admin?.name?.charAt(0) || 'A'}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-main truncate">{admin?.name || 'Admin'}</p>
                            <div className="flex items-center gap-1">
                                <Shield className="w-2.5 h-2.5 text-green-500" />
                                <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">Super Admin</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map(({ to, label, icon: Icon, end }) => (
                        <NavLink key={to} to={to} end={end} onClick={() => setSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm transition-all group ${
                                    isActive
                                        ? 'bg-green-500/15 text-green-500 border-2 border-green-500/30'
                                        : 'text-muted hover:text-main hover:bg-base border-2 border-transparent'
                                }`
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-green-500' : 'text-muted group-hover:text-main'}`} />
                                    <span>{label}</span>
                                    {isActive && <ChevronRight className="w-3 h-3 ml-auto text-green-500" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t-2 border-border space-y-2">
                    <NavLink to="/chatbot"
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm text-muted hover:text-green-500 hover:bg-green-500/10 transition-all border-2 border-dashed border-border hover:border-green-500/30">
                        <Bot className="w-4 h-4 shrink-0" /><span>AI Assistant</span>
                    </NavLink>
                    <button onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-sm text-muted hover:text-red-500 hover:bg-red-500/10 transition-all border-2 border-transparent">
                        <LogOut className="w-4 h-4 shrink-0" /><span>Logout</span>
                    </button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col min-w-0">
                <header className="h-16 bg-surface border-b-2 border-border flex items-center px-4 gap-4 sticky top-0 z-20">
                    <button className="lg:hidden p-2 rounded-lg hover:bg-base transition-colors text-muted" onClick={() => setSidebarOpen(true)}>
                        <Menu className="w-5 h-5" />
                    </button>
                    <div className="flex-1" />
                    {/* System status dot */}
                    <div className="flex items-center gap-1.5 hidden sm:flex">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs font-bold text-green-500 uppercase tracking-wider">All Systems Operational</span>
                    </div>
                    <div className="h-4 w-px bg-border hidden sm:block" />
                    <div className="text-xs font-bold text-muted uppercase tracking-wider hidden sm:block">Admin View</div>
                </header>

                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
