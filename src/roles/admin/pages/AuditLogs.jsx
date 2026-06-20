// src/roles/admin/pages/AuditLogs.jsx
import React, { useState, useMemo } from 'react';
import { useAppState } from '../../../state/appState';
import { motion } from 'framer-motion';
import { Search, Filter, X, ScrollText, Calendar as CalendarIcon, ArrowUpDown } from 'lucide-react';

const AuditLogs = () => {
    const { state } = useAppState();
    const { auditLogs = [] } = state;

    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [sortBy, setSortBy] = useState('timestamp');
    const [sortDir, setSortDir] = useState('desc');

    const toggleSort = (col) => {
        if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
        else { setSortBy(col); setSortDir('desc'); }
    };

    const filteredLogs = useMemo(() => {
        return auditLogs
            .filter(log => {
                const matchSearch = log.actor.toLowerCase().includes(search.toLowerCase()) || 
                                    log.action.toLowerCase().includes(search.toLowerCase()) || 
                                    log.resource.toLowerCase().includes(search.toLowerCase());
                const matchRole = roleFilter === 'all' || log.actorRole === roleFilter;
                return matchSearch && matchRole;
            })
            .sort((a, b) => {
                const dir = sortDir === 'asc' ? 1 : -1;
                if (sortBy === 'timestamp') return dir * (new Date(a.timestamp) - new Date(b.timestamp));
                if (sortBy === 'actor') return dir * a.actor.localeCompare(b.actor);
                if (sortBy === 'action') return dir * a.action.localeCompare(b.action);
                return 0;
            });
    }, [auditLogs, search, roleFilter, sortBy, sortDir]);

    const roleColors = {
        admin: 'bg-green-500/10 text-green-500 border-green-500/30',
        teacher: 'bg-purple-500/10 text-purple-500 border-purple-500/30',
        student: 'bg-blue-500/10 text-blue-500 border-blue-500/30',
    };

    const formatAction = (action) => action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    const SortBtn = ({ col, label }) => (
        <button onClick={() => toggleSort(col)} className="flex items-center gap-1 hover:text-blue-500 transition-colors">
            {label}
            <ArrowUpDown className={`w-3 h-3 ${sortBy === col ? 'text-blue-500' : 'text-muted'}`} />
        </button>
    );

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">
            <div>
                <h1 className="text-3xl font-black text-main">Audit Logs</h1>
                <p className="text-muted font-medium mt-1">Track all system events, content creation, and user modifications.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-muted" />
                    <input 
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search logs by actor, action, or resource..."
                        className="w-full bg-surface border-2 border-border rounded-xl py-2 pl-10 pr-4 text-sm text-main placeholder-muted focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    {search && <button onClick={() => setSearch('')} className="absolute right-3 top-2.5 text-muted hover:text-main"><X className="w-4 h-4" /></button>}
                </div>
                <div className="flex gap-2">
                    {['all', 'admin', 'teacher', 'student'].map(role => (
                        <button key={role} onClick={() => setRoleFilter(role)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold capitalize border-2 transition-all ${roleFilter === role ? 'border-blue-500 bg-blue-500/10 text-blue-500' : 'border-border text-muted hover:border-gray-400'}`}>
                            {role}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-surface border-2 border-border rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b-2 border-border bg-base text-left">
                                <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider w-40">
                                    <SortBtn col="timestamp" label="Timestamp" />
                                </th>
                                <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">
                                    <SortBtn col="actor" label="Actor" />
                                </th>
                                <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">Role</th>
                                <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">
                                    <SortBtn col="action" label="Action" />
                                </th>
                                <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider">Resource / Detail</th>
                                <th className="px-4 py-3 text-xs font-black text-muted uppercase tracking-wider text-right">IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((log, i) => (
                                <motion.tr key={log.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.01 }}
                                    className="border-b border-border last:border-0 hover:bg-base transition-colors">
                                    <td className="px-4 py-3 text-muted font-medium whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <CalendarIcon className="w-3.5 h-3.5" />
                                            {new Date(log.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-bold text-main">{log.actor}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-2 py-0.5 rounded border text-[10px] font-black uppercase tracking-wider ${roleColors[log.actorRole]}`}>
                                            {log.actorRole}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-main">{formatAction(log.action)}</td>
                                    <td className="px-4 py-3 text-muted">{log.resource}</td>
                                    <td className="px-4 py-3 text-right font-mono text-xs text-muted/80">{log.ip}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredLogs.length === 0 && (
                        <div className="text-center py-12 text-muted">
                            <ScrollText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                            <p className="font-bold">No logs found matching your filters</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuditLogs;
