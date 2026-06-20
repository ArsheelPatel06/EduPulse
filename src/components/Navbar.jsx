import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppState } from '../state/appState';
import { useTheme } from '../context/ThemeContext';
import { BrainCircuit, Bot, Bell, Sun, Moon, Target, User, LogOut, Check, Trash2, Zap, Flame, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import XPBadge from './XPBadge';

const Navbar = () => {
    const { state, dispatch } = useAppState();
    const { theme, toggleTheme } = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);

    const isActive = (path) => location.pathname === path;

    const unreadCount = state.notifications.filter(n => !n.read).length;

    const topMastery = [...state.courses]
        .sort((a, b) => b.mastery - a.mastery)
        .slice(0, 3);

    const handleLogout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-surface border-b-2 border-border px-4 h-16 flex items-center justify-between transition-colors duration-300">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center border-2 border-white/10 group-hover:scale-105 transition-transform">
                    <BrainCircuit className="text-white w-6 h-6" />
                </div>
                <span className="font-bold text-xl tracking-tight text-main group-hover:text-purple-400 transition-colors">
                    ExamPrep
                </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-surface/50 p-1 rounded-lg border border-border">
                <NavLink to="/dashboard" active={isActive('/dashboard')}>Hub</NavLink>
                <NavLink to="/quests" active={isActive('/quests')}>Assignments</NavLink>
                <NavLink to="/results" active={isActive('/results')}>Analytics</NavLink>
                <NavLink to="/placement" active={isActive('/placement')}>Placement</NavLink>
                <NavLink to="/planner" active={isActive('/planner')}>Planner</NavLink>
                <NavLink to="/interventions" active={isActive('/interventions')}>Support</NavLink>
            </div>

            {/* User Stats / Right Side */}
            <div className="flex items-center gap-2 sm:gap-4">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 text-muted hover:text-main transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                <Link to="/chatbot" className={`p-2 rounded-lg transition-colors border-2 ${isActive('/chatbot') ? 'bg-surface border-purple-500 text-purple-400' : 'border-transparent hover:bg-surface text-muted'}`}>
                    <Bot className="w-5 h-5" />
                </Link>

                {/* Notifications Bell */}
                <div className="relative">
                    <button
                        onClick={() => { setShowNotifications(!showNotifications); setShowProfile(false); }}
                        className={`p-2 rounded-lg transition-colors relative ${showNotifications ? 'bg-surface text-purple-500' : 'text-gray-400 hover:text-main'}`}
                    >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-surface text-[10px] font-black text-white flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    <AnimatePresence>
                        {showNotifications && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-2 w-80 bg-surface border-2 border-border rounded-2xl shadow-2xl overflow-hidden z-[60]"
                            >
                                <div className="p-4 border-b-2 border-border flex items-center justify-between bg-base/30">
                                    <h4 className="font-black text-xs uppercase tracking-widest">Notifications</h4>
                                    <button
                                        onClick={() => dispatch({ type: 'CLEAR_NOTIFICATIONS' })}
                                        className="text-[10px] font-bold text-muted hover:text-red-500 transition-colors flex items-center gap-1"
                                    >
                                        <Trash2 className="w-3 h-3" /> Clear All
                                    </button>
                                </div>
                                <div className="max-h-[400px] overflow-y-auto">
                                    {state.notifications.length === 0 ? (
                                        <div className="p-8 text-center">
                                            <Check className="w-8 h-8 text-green-500 mx-auto mb-2 opacity-20" />
                                            <p className="text-xs font-bold text-muted uppercase">You're all caught up!</p>
                                        </div>
                                    ) : (
                                        state.notifications.map(n => (
                                            <div
                                                key={n.id}
                                                onClick={() => dispatch({ type: 'MARK_NOTIFICATION_READ', payload: n.id })}
                                                className={`p-4 border-b border-border hover:bg-base/50 transition-colors cursor-pointer relative ${!n.read ? 'bg-purple-500/5' : ''}`}
                                            >
                                                {!n.read && <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />}
                                                <p className={`text-sm font-bold ${!n.read ? 'text-main' : 'text-muted'}`}>{n.text}</p>
                                                <p className="text-[10px] text-muted/50 mt-1 uppercase font-black">
                                                    {new Date(n.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="h-8 w-[1px] bg-border mx-1" />

                <div className="hidden sm:block">
                    <XPBadge xp={state.user.xp} level={state.user.level} />
                </div>

                {/* Profile Toggle */}
                <div className="relative">
                    <button
                        onClick={() => { setShowProfile(!showProfile); setShowNotifications(false); }}
                        className="w-10 h-10 rounded-xl bg-base border-2 border-border overflow-hidden hover:border-purple-500 transition-colors shadow-sm"
                    >
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${state.user.name}`} alt="Avatar" className="w-full h-full" />
                    </button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-2 w-72 bg-surface border-2 border-border rounded-2xl shadow-2xl overflow-hidden z-[60]"
                            >
                                <div className="p-6 bg-base/30 border-b-2 border-border">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl border-2 border-purple-500 overflow-hidden">
                                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${state.user.name}`} alt="Avatar" />
                                        </div>
                                        <div>
                                            <h4 className="font-black text-main uppercase leading-none">{state.user.name}</h4>
                                            <span className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Level {state.user.level} Scholar</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="bg-surface p-2 rounded-lg border border-border">
                                            <p className="text-[8px] font-black text-muted uppercase">Total LS</p>
                                            <p className="text-sm font-black text-main">{state.user.xp.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-surface p-2 rounded-lg border border-border">
                                            <p className="text-[8px] font-black text-muted uppercase">Streak</p>
                                            <p className="text-sm font-black text-orange-500 flex items-center gap-1">
                                                <Flame className="w-3 h-3 fill-orange-500" /> {state.user.streak}d
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 flex flex-col gap-2">
                                    <h5 className="text-[10px] font-black text-muted uppercase mb-1">Top Mastery</h5>
                                    {topMastery.map(c => (
                                        <div key={c.id} className="flex items-center justify-between text-xs font-bold">
                                            <span className="text-main">{c.title}</span>
                                            <span className="text-purple-500 font-black">{c.mastery}%</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="p-4 pt-2 border-t border-border bg-base/30 flex flex-col gap-2">
                                    <Link
                                        to="/profile"
                                        onClick={() => setShowProfile(false)}
                                        className="w-full py-2 bg-surface border-2 border-border rounded-lg text-xs font-bold text-main hover:border-purple-500 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <User className="w-3 h-3" /> View Profile
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-2 bg-red-500/10 border-2 border-red-500/20 rounded-lg text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2"
                                    >
                                        <LogOut className="w-3 h-3" /> Logout
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
};

const NavLink = ({ to, children, active }) => (
    <Link
        to={to}
        className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all border-2
      ${active
                ? 'bg-purple-600 text-white border-purple-500 shadow-none'
                : 'text-muted border-transparent hover:bg-base hover:text-main'
            }`}
    >
        {children}
    </Link>
);

export default Navbar;
