import React from 'react';
import Navbar from '../components/Navbar';
import { useAppState } from '../state/appState';
import { motion } from 'framer-motion';
import { Trophy, Shield, Star, Zap, Flame, Award, Calendar, BookOpen } from 'lucide-react';

const Profile = () => {
    const { state } = useAppState();
    const { user, courses } = state;

    // Derived data
    const sortedCourses = [...courses].sort((a, b) => b.mastery - a.mastery);
    const xpHistory = [
        { id: 1, action: "Completed CSS Basics Path", xp: 150, date: "Today" },
        { id: 2, action: "Daily Challenge Bonus", xp: 100, date: "Yesterday" },
        { id: 3, action: "Mastered HTML Semantic Tags", xp: 300, date: "2 days ago" },
        { id: 4, action: "Login Streak Bonus", xp: 50, date: "3 days ago" },
    ];

    const badges = [
        { id: 1, name: "Fast Learner", icon: Zap, color: "text-yellow-500", desc: "Completed 5 assignments in 1 day" },
        { id: 2, name: "Master Strategist", icon: Shield, color: "text-blue-500", desc: "Reached 80% mastery in any subject" },
        { id: 3, name: "Consistent Scholar", icon: Flame, color: "text-orange-500", desc: "Maintained a 5-day streak" },
        { id: 4, name: "Top Perfomer", icon: Trophy, color: "text-purple-500", desc: "Reached Level 10" },
    ];

    return (
        <div className="min-h-screen bg-base text-main transition-colors duration-300">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Profile Header */}
                <section className="bg-surface border-2 border-border rounded-3xl p-8 mb-8 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <UserIcon className="w-40 h-40" />
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                        <div className="w-32 h-32 rounded-3xl border-4 border-purple-500 overflow-hidden shadow-2xl">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="Avatar" className="w-full h-full" />
                        </div>

                        <div className="text-center md:text-left">
                            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                                <h1 className="text-4xl font-black uppercase tracking-tight">{user.name}</h1>
                                <span className="px-3 py-1 bg-purple-600 text-white text-[10px] font-black uppercase tracking-widest rounded-full self-center md:self-auto">
                                    Scholar Rank
                                </span>
                            </div>
                            <p className="text-muted font-bold text-lg mb-4 italic">"Striving for mastery, one assignment at a time."</p>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                                <StatBadge icon={Trophy} label="Level" value={user.level} color="text-purple-500" />
                                <StatBadge icon={Zap} label="Total LS" value={user.xp.toLocaleString()} color="text-yellow-500" />
                                <StatBadge icon={Flame} label="Streak" value={`${user.streak}d`} color="text-orange-500" />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column: Mastery & Stats */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Subject Mastery */}
                        <section className="bg-surface border-2 border-border rounded-3xl p-6">
                            <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                                <Award className="w-5 h-5 text-purple-500" /> Subject Mastery
                            </h3>
                            <div className="space-y-6">
                                {sortedCourses.map(course => (
                                    <div key={course.id}>
                                        <div className="flex justify-between items-end mb-2">
                                            <div>
                                                <p className="font-black uppercase text-sm">{course.title}</p>
                                                <p className="text-[10px] text-muted font-bold uppercase tracking-widest">{course.missions.length} Missions</p>
                                            </div>
                                            <span className="text-sm font-black text-purple-500">{course.mastery}%</span>
                                        </div>
                                        <div className="h-3 w-full bg-base rounded-full border border-border overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${course.mastery}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                className="h-full bg-purple-600"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* LS History */}
                        <section className="bg-surface border-2 border-border rounded-3xl p-6">
                            <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-purple-500" /> LS History
                            </h3>
                            <div className="space-y-4">
                                {xpHistory.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 bg-base/50 rounded-xl border border-border hover:border-purple-500 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center text-yellow-500">
                                                <Zap className="w-5 h-5 fill-yellow-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-main">{item.action}</p>
                                                <p className="text-[10px] text-muted uppercase font-black">{item.date}</p>
                                            </div>
                                        </div>
                                        <span className="font-black text-purple-500">+{item.xp} LS</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column: Badges & Rewards */}
                    <div className="space-y-8">
                        <section className="bg-surface border-2 border-border rounded-3xl p-6">
                            <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                                <Star className="w-5 h-5 text-yellow-500" /> Badges Earned
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {badges.map(badge => (
                                    <div key={badge.id} className="p-4 bg-base/30 rounded-2xl border border-border flex items-center gap-4 group hover:bg-surface transition-colors">
                                        <div className={`w-12 h-12 rounded-xl bg-surface border-2 border-border flex items-center justify-center transition-transform group-hover:scale-110 ${badge.color}`}>
                                            <badge.icon className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-black text-xs uppercase tracking-tight text-main">{badge.name}</p>
                                            <p className="text-[10px] font-bold text-muted leading-tight">{badge.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="bg-purple-600/10 border-2 border-purple-500/20 rounded-3xl p-6 text-center">
                            <BookOpen className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                            <h4 className="text-lg font-black uppercase mb-2">Keep Grinding!</h4>
                            <p className="text-sm font-bold text-muted mb-6">You're in the top 5% of active students this week.</p>
                            <button className="w-full py-3 bg-purple-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-purple-700 btn-tactile">
                                View Leaderboard
                            </button>
                        </section>
                    </div>

                </div>
            </main>
        </div>
    );
};

const StatBadge = ({ icon: Icon, label, value, color }) => (
    <div className="flex items-center gap-2 px-4 py-2 bg-base rounded-2xl border-2 border-border">
        <Icon className={`w-4 h-4 ${color}`} />
        <div>
            <p className="text-[10px] font-black text-muted uppercase leading-none">{label}</p>
            <p className="text-sm font-black text-main leading-none mt-1">{value}</p>
        </div>
    </div>
);

const UserIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export default Profile;
