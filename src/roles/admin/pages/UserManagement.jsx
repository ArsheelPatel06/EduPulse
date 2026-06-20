// src/roles/admin/pages/UserManagement.jsx
import React, { useState } from 'react';
import { useAppState } from '../../../state/appState';
import { motion } from 'framer-motion';
import { Users, Search, Shield, X, AlertTriangle, CheckCircle } from 'lucide-react';

const UserManagement = () => {
    const { state, dispatch } = useAppState();
    const { allStudents = [], allTeachers = [] } = state;
    
    const [activeTab, setActiveTab] = useState('students');
    const [search, setSearch] = useState('');

    const filteredStudents = allStudents.filter(s => 
        s.name.toLowerCase().includes(search.toLowerCase()) || 
        s.id.toLowerCase().includes(search.toLowerCase())
    );

    const filteredTeachers = allTeachers.filter(t => 
        t.name.toLowerCase().includes(search.toLowerCase()) || 
        t.id.toLowerCase().includes(search.toLowerCase())
    );

    const handleSuspend = (id, type) => {
        if (type === 'student') dispatch({ type: 'ADMIN_SUSPEND_USER', payload: id });
    };

    const handleActivate = (id, type) => {
        if (type === 'student') dispatch({ type: 'ADMIN_ACTIVATE_USER', payload: id });
    };

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-black text-main">User Management</h1>
                <p className="text-muted font-medium mt-1">Manage platform access, roles, and status for students and teachers.</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-2 p-1 bg-surface border-2 border-border rounded-xl">
                    <button onClick={() => setActiveTab('students')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'students' ? 'bg-blue-500/20 text-blue-500' : 'text-muted hover:text-main'}`}>
                        Students ({allStudents.length})
                    </button>
                    <button onClick={() => setActiveTab('teachers')}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'teachers' ? 'bg-purple-500/20 text-purple-500' : 'text-muted hover:text-main'}`}>
                        Teachers ({allTeachers.length})
                    </button>
                </div>

                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-muted" />
                    <input 
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder={`Search ${activeTab}...`}
                        className="w-full bg-surface border-2 border-border rounded-xl py-2 pl-10 pr-4 text-sm text-main placeholder-muted focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    {search && <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-muted hover:text-main"><X className="w-4 h-4" /></button>}
                </div>
            </div>

            {/* List */}
            <div className="bg-surface border-2 border-border rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b-2 border-border bg-base text-left">
                            <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">User</th>
                            <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">Department/Course</th>
                            <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">Role</th>
                            <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">Status</th>
                            <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(activeTab === 'students' ? filteredStudents : filteredTeachers).map((user, i) => (
                            <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
                                className="border-b border-border last:border-0 hover:bg-base transition-colors">
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${activeTab === 'students' ? 'bg-blue-500/15 text-blue-500 border border-blue-500/30' : 'bg-purple-500/15 text-purple-500 border border-purple-500/30'}`}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-main leading-tight">{user.name}</p>
                                            <p className="text-xs text-muted font-medium">{user.id} · {user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-muted font-medium">
                                    {activeTab === 'students' ? user.course : user.dept}
                                </td>
                                <td className="px-4 py-3">
                                    <span className="flex items-center gap-1.5 text-xs font-bold text-muted uppercase tracking-wider">
                                        {activeTab === 'students' ? <Users className="w-3.5 h-3.5 text-blue-500"/> : <Shield className="w-3.5 h-3.5 text-purple-500"/>}
                                        {activeTab}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    {user.suspended ? (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-[10px] font-black uppercase tracking-wider">
                                            <AlertTriangle className="w-3 h-3" /> Suspended
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-wider">
                                            <CheckCircle className="w-3 h-3" /> Active
                                        </span>
                                    )}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    {activeTab === 'students' && (
                                        user.suspended ? (
                                            <button onClick={() => handleActivate(user.id, 'student')} className="text-xs font-bold text-green-500 hover:bg-green-500/10 px-3 py-1.5 rounded-lg transition-colors border border-green-500/30">Activate</button>
                                        ) : (
                                            <button onClick={() => handleSuspend(user.id, 'student')} className="text-xs font-bold text-red-500 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition-colors border border-red-500/30">Suspend</button>
                                        )
                                    )}
                                    {activeTab === 'teachers' && (
                                        <button className="text-xs font-bold text-muted hover:text-main px-3 py-1.5 transition-colors">Edit Roles</button>
                                    )}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement;
