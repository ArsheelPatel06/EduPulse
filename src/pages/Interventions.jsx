import React from 'react';
import { useAppState } from '../state/appState';
import { motion } from 'framer-motion';
import { ShieldAlert, UserPlus, CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const Interventions = () => {
    const { state } = useAppState();

    // Get active intervention for the current student
    // Since we mock the login as "Arsheel" but the mock intervention is for "Priya",
    // we'll just show the first intervention for demo purposes if the student doesn't have one.
    let studentInterventions = state.interventions.filter(i => i.studentName === state.user.name);
    if (studentInterventions.length === 0 && state.interventions.length > 0) {
        studentInterventions = [state.interventions[0]]; // Fallback for demo
    }

    const activeIntervention = studentInterventions.find(i => i.status === 'open');

    return (
        <div className="min-h-screen bg-base text-main pb-20">
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
                
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center border border-red-500/20">
                        <ShieldAlert className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-main">Intervention Center</h1>
                        <p className="text-muted font-bold text-sm">Your Personalized Success Plan</p>
                    </div>
                </div>

                {!activeIntervention ? (
                    <div className="bg-surface border-2 border-border rounded-2xl p-12 text-center">
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-black text-main mb-2">You are on track!</h2>
                        <p className="text-muted">No active interventions or support plans at this time.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        
                        {/* Left Col: Plan & Actions */}
                        <div className="md:col-span-2 space-y-8">
                            
                            {/* Support Plan Header */}
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                className="bg-surface border-2 border-red-500/30 rounded-2xl p-6 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <ShieldAlert className="w-32 h-32 text-red-500" />
                                </div>
                                <h3 className="text-xl font-black text-main mb-4 flex items-center gap-2">
                                    <UserPlus className="w-5 h-5 text-purple-500" /> Active Support Plan
                                </h3>
                                
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-base border-2 border-border p-4 rounded-xl">
                                        <p className="text-xs font-bold text-muted uppercase">Assigned Mentor</p>
                                        <p className="text-lg font-black text-main">{activeIntervention.teacherName}</p>
                                    </div>
                                    <div className="bg-red-500/10 border-2 border-red-500/20 p-4 rounded-xl">
                                        <p className="text-xs font-bold text-red-500 uppercase">Focus Area</p>
                                        <p className="text-sm font-bold text-main mt-1">{activeIntervention.reason}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Required Actions */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-black text-muted uppercase tracking-wider">Required Actions</h3>
                                <div className="space-y-3">
                                    {activeIntervention.actions.map((action, i) => (
                                        <motion.div 
                                            key={action.id}
                                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                            className="bg-surface border-2 border-border p-5 rounded-2xl flex items-center justify-between group hover:border-purple-500 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                {action.status === 'Completed' ? (
                                                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                                                ) : action.status === 'In Progress' ? (
                                                    <Clock className="w-6 h-6 text-amber-500" />
                                                ) : (
                                                    <Circle className="w-6 h-6 text-muted" />
                                                )}
                                                <div>
                                                    <h4 className="font-bold text-main">{action.type}</h4>
                                                    <p className="text-sm text-muted">{action.description}</p>
                                                </div>
                                            </div>
                                            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
                                                action.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                action.status === 'In Progress' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                'bg-base text-muted border-border'
                                            }`}>
                                                {action.status}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right Col: Timeline */}
                        <div className="md:col-span-1">
                            <div className="bg-surface border-2 border-border rounded-2xl p-6 sticky top-24">
                                <h3 className="text-xl font-black text-main mb-6">Timeline</h3>
                                
                                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
                                    
                                    <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-surface bg-red-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                                        <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-border bg-base shadow-sm">
                                            <div className="flex items-center justify-between mb-1">
                                                <div className="font-bold text-main text-sm">Risk Detected</div>
                                                <time className="font-mono text-xs text-muted">{new Date(activeIntervention.createdAt).toLocaleDateString()}</time>
                                            </div>
                                        </div>
                                    </div>

                                    {activeIntervention.actions.map(action => (
                                        <div key={action.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-surface bg-purple-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                                            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-border bg-base shadow-sm">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="font-bold text-main text-sm">{action.type} Assigned</div>
                                                    <time className="font-mono text-xs text-muted">{new Date(action.assignedDate).toLocaleDateString()}</time>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {activeIntervention.followups.map(followup => (
                                        <div key={followup.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                                            <div className="flex items-center justify-center w-6 h-6 rounded-full border-4 border-surface bg-amber-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10" />
                                            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border border-amber-500/30 bg-amber-500/5 shadow-sm">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="font-bold text-amber-500 text-sm">Follow-up Review</div>
                                                    <time className="font-mono text-xs text-amber-500">{new Date(followup.date).toLocaleDateString()}</time>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
};

export default Interventions;
