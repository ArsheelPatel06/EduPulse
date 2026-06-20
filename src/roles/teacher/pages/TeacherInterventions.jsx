import React, { useState } from 'react';
import { useAppState } from '../../../state/appState';
import { motion } from 'framer-motion';
import { ShieldAlert, Plus, Check, Clock, X, AlertTriangle, MessageSquare, Bot } from 'lucide-react';
import { generateInterventionPlan } from '../../../services/aiInterventionEngine';

const TeacherInterventions = () => {
    const { state, dispatch } = useAppState();
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [actionType, setActionType] = useState('Mentorship Session');
    const [actionDesc, setActionDesc] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    // Active interventions assigned to this teacher
    const teacherInterventions = state.interventions.filter(i => i.teacherId === state.currentUser.id || i.status === 'open');

    const handleAssignAction = (e, interventionId) => {
        e.preventDefault();
        dispatch({
            type: 'ASSIGN_INTERVENTION_ACTION',
            payload: {
                interventionId,
                actionData: {
                    id: `ACT_${Date.now()}`,
                    type: actionType,
                    description: actionDesc,
                    status: 'In Progress',
                    assignedDate: new Date().toISOString(),
                    isAi: false
                }
            }
        });
        setActionDesc('');
    };

    const handleAIAssist = async (studentId, interventionId) => {
        setIsGenerating(true);
        // Mock analytics fetch
        const mockMetrics = {
            attendance: 62,
            academic_score: 48,
            engagement: 30,
            placement_readiness: 45
        };

        const aiRecommendations = await generateInterventionPlan(mockMetrics);
        
        // Assign the first AI recommendation for demo purposes
        if (aiRecommendations.length > 0) {
            dispatch({
                type: 'ASSIGN_INTERVENTION_ACTION',
                payload: {
                    interventionId,
                    actionData: {
                        id: `ACT_AI_${Date.now()}`,
                        type: aiRecommendations[0].type,
                        description: aiRecommendations[0].description,
                        status: 'In Progress',
                        assignedDate: new Date().toISOString(),
                        isAi: true
                    }
                }
            });
        }
        setIsGenerating(false);
    };

    const handleUpdateStatus = (interventionId, actionId, newStatus) => {
        dispatch({
            type: 'UPDATE_FOLLOWUP_STATUS',
            payload: { interventionId, actionId, status: newStatus }
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-main">Intervention Center</h1>
                    <p className="text-muted font-bold text-sm">Manage At-Risk Students and Assign Action Plans</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Col: Open Cases */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-surface border border-border rounded-xl p-6">
                        <h2 className="text-xl font-bold text-main flex items-center gap-2 mb-4">
                            <AlertTriangle className="w-5 h-5 text-amber-500" /> Open Cases
                        </h2>
                        
                        <div className="space-y-4">
                            {teacherInterventions.length === 0 ? (
                                <p className="text-muted text-sm text-center py-4">No open cases assigned to you.</p>
                            ) : (
                                teacherInterventions.map(inv => (
                                    <div key={inv.id} className="border border-border rounded-xl p-4 bg-base/50">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-black text-main text-lg">{inv.studentName}</h3>
                                                <p className="text-sm font-bold text-red-500">{inv.reason}</p>
                                            </div>
                                            <span className="bg-amber-500/10 text-amber-500 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                {inv.status}
                                            </span>
                                        </div>

                                        <div className="mt-4">
                                            <h4 className="text-sm font-bold text-muted uppercase tracking-wider mb-3">Action Queue</h4>
                                            <div className="space-y-2">
                                                {inv.actions.map(act => (
                                                    <div key={act.id} className="flex justify-between items-center bg-surface border border-border p-3 rounded-lg">
                                                        <div className="flex items-center gap-3">
                                                            {act.isAi && <Bot className="w-4 h-4 text-purple-500" title="AI Recommended" />}
                                                            <div>
                                                                <p className="text-sm font-bold text-main">{act.type}</p>
                                                                <p className="text-xs text-muted">{act.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <select 
                                                                className="text-xs bg-base border border-border rounded-md px-2 py-1 text-main font-bold outline-none"
                                                                value={act.status}
                                                                onChange={(e) => handleUpdateStatus(inv.id, act.id, e.target.value)}
                                                            >
                                                                <option value="In Progress">In Progress</option>
                                                                <option value="Completed">Completed</option>
                                                                <option value="No Improvement">No Improvement</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-6 flex justify-end gap-2">
                                            <button 
                                                onClick={() => setSelectedStudent(inv)}
                                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2"
                                            >
                                                <Plus className="w-4 h-4" /> Add Action
                                            </button>
                                            <button 
                                                onClick={() => handleAIAssist(inv.studentId, inv.id)}
                                                disabled={isGenerating}
                                                className="px-4 py-2 bg-base hover:bg-surface border border-purple-500/30 text-purple-500 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                                            >
                                                <Bot className="w-4 h-4" /> {isGenerating ? 'Analyzing...' : 'AI Assist'}
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Col: Add Action Form */}
                <div className="lg:col-span-1">
                    <div className="bg-surface border border-border rounded-xl p-6 sticky top-6">
                        <h2 className="text-xl font-bold text-main mb-6">Assign Action</h2>
                        {selectedStudent ? (
                            <form onSubmit={(e) => handleAssignAction(e, selectedStudent.id)} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Student</label>
                                    <div className="w-full bg-base border border-border rounded-lg px-4 py-2 text-main font-bold">
                                        {selectedStudent.studentName}
                                    </div>
                                </div>
                                
                                <div>
                                    <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Action Type</label>
                                    <select 
                                        className="w-full bg-base border border-border rounded-lg px-4 py-2 text-main outline-none focus:border-purple-500"
                                        value={actionType}
                                        onChange={(e) => setActionType(e.target.value)}
                                    >
                                        <option>Mentorship Session</option>
                                        <option>Extra Assignment</option>
                                        <option>Parent Meeting</option>
                                        <option>Remedial Class</option>
                                        <option>Communication Workshop</option>
                                        <option>Placement Coaching</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-2">Description</label>
                                    <textarea 
                                        required
                                        className="w-full bg-base border border-border rounded-lg px-4 py-2 text-main outline-none focus:border-purple-500 min-h-[100px]"
                                        placeholder="Specific goals or requirements..."
                                        value={actionDesc}
                                        onChange={(e) => setActionDesc(e.target.value)}
                                    />
                                </div>

                                <button type="submit" className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-colors">
                                    Assign Action
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-12 border-2 border-dashed border-border rounded-xl">
                                <MessageSquare className="w-8 h-8 text-muted mx-auto mb-2" />
                                <p className="text-sm font-bold text-muted">Select a case to assign actions</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherInterventions;
