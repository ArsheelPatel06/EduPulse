import { createContext, useContext, useReducer, useEffect } from 'react';
import { courses } from '../data/courses';
import { mockStudents } from '../data/mockStudents';
import { mockTeachers } from '../data/mockTeachers';
import { mockAuditLogs } from '../data/mockAuditLogs';
import { analyzeAllStudents } from '../services/analyticsEngine';

const AppStateContext = createContext();

// Keys to persist to localStorage
const PERSIST_KEYS = ['sharedCurriculum', 'sharedAssignments', 'events', 'interventions'];

// Load persisted slices from localStorage
const loadPersistedState = () => {
    try {
        const persisted = {};
        PERSIST_KEYS.forEach(key => {
            const saved = localStorage.getItem(`edupulse_${key}`);
            if (saved) persisted[key] = JSON.parse(saved);
        });
        return persisted;
    } catch {
        return {};
    }
};

const buildInitialState = () => {
    const analyzedStudents = analyzeAllStudents(mockStudents);
    const persisted = loadPersistedState();

    return {
        // === Auth / Role ===
        currentUser: null, // { id, name, email, role, avatar, dept? }
        isAuthenticated: !!localStorage.getItem('edupulse_role'),

        // === Student State (existing) ===
        user: {
            name: 'Arsheel',
            level: 12,
            xp: 12450,
            streak: 5,
            dailyGoal: 500,
            dailyProgress: 350,
        },
        courses: courses,
        activeCourseId: null,
        notifications: [
            { id: 1, text: '+120 Learning Score from Daily Challenge', type: 'xp', read: false, time: new Date().toISOString() },
            { id: 2, text: '5-day study streak maintained', type: 'streak', read: true, time: new Date().toISOString() },
        ],
        events: persisted.events || [
            { id: 1, title: 'DSA Midterm', type: 'exam', date: new Date(Date.now() + 2 * 86400000).toISOString(), time: '10:00 AM', subject: 'Data Structures' },
            { id: 2, title: 'DBMS Revision', type: 'study', date: new Date().toISOString(), time: '2:00 PM', subject: 'DBMS' },
            { id: 3, title: 'OS Project Submission', type: 'deadline', date: new Date(Date.now() + 5 * 86400000).toISOString(), time: '11:59 PM', subject: 'OS' },
        ],

        // === Shared Content (Teacher creates → Student sees) ===
        sharedCurriculum: persisted.sharedCurriculum || [],  // Teacher-published learning paths
        sharedAssignments: persisted.sharedAssignments || [], // Teacher-created assignments

        // === Teacher State ===
        teacherStudents: analyzedStudents,
        teacherCurriculum: persisted.sharedCurriculum || [], // Same as sharedCurriculum
        teacherAssignments: persisted.sharedAssignments || [],

        // === Admin State ===
        allStudents: analyzedStudents,
        allTeachers: mockTeachers,
        auditLogs: mockAuditLogs,
        systemStatus: {
            apiHealth: 'healthy',
            apiResponseMs: 142,
            cpuUsage: 23,
            ramUsage: 61,
            storageUsed: 156,
            storageTotal: 200,
            uptime: '99.97%',
            uptimeDays: 12,
            deploymentVersion: 'v2.3.1',
            deployedHoursAgo: 2,
        },
        // === Interventions ===
        interventions: persisted.interventions || [
            {
                id: 'INV_1',
                studentId: 'STU_105', // Assuming Priya from mock data
                studentName: 'Priya Sharma',
                teacherId: 'T001',
                teacherName: 'Dr. Anjali Mehta',
                reason: 'Critical Risk: Attendance < 75% and Placement Readiness < 60%',
                status: 'open',
                createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
                actions: [
                    { id: 'ACT_1', type: 'Mentorship Session', description: 'Weekly 1-on-1 focus.', status: 'Completed', assignedDate: new Date(Date.now() - 4 * 86400000).toISOString(), isAi: true },
                    { id: 'ACT_2', type: 'Extra Assignment', description: 'Data Structures practice set.', status: 'In Progress', assignedDate: new Date(Date.now() - 2 * 86400000).toISOString(), isAi: true }
                ],
                followups: [
                    { id: 'FOL_1', date: new Date(Date.now() + 2 * 86400000).toISOString(), notes: 'Check on Data Structures assignment.', status: 'pending' }
                ]
            }
        ],
    };
};

function appReducer(state, action) {
    switch (action.type) {

        // ===================== AUTH =====================
        case 'LOGIN': {
            const { user } = action.payload;
            localStorage.setItem('edupulse_role', user.role);
            localStorage.setItem('edupulse_user', JSON.stringify(user));
            return {
                ...state,
                currentUser: user,
                isAuthenticated: true,
                // Set student name if logging in as student
                user: user.role === 'student'
                    ? { ...state.user, name: user.name }
                    : state.user,
            };
        }

        case 'LOGOUT': {
            localStorage.removeItem('edupulse_role');
            localStorage.removeItem('edupulse_user');
            localStorage.removeItem('isLoggedIn');
            // Reset auth but keep shared content
            return {
                ...buildInitialState(),
                currentUser: null,
                isAuthenticated: false,
            };
        }

        case 'RESTORE_SESSION': {
            return {
                ...state,
                currentUser: action.payload,
                isAuthenticated: true,
            };
        }

        // ===================== STUDENT =====================
        case 'SET_ACTIVE_COURSE':
            return { ...state, activeCourseId: action.payload };

        case 'ADD_XP': {
            const newXp = state.user.xp + action.payload;
            const newLevel = Math.floor(newXp / 5000) + 1;
            const leveledUp = newLevel > state.user.level;
            const newNotifications = [
                { id: Date.now(), text: `+${action.payload} Learning Score earned!`, type: 'xp', read: false, time: new Date().toISOString() },
                ...(leveledUp ? [{ id: Date.now() + 1, text: `Rank Up! You reached Level ${newLevel}`, type: 'level', read: false, time: new Date().toISOString() }] : []),
                ...state.notifications,
            ];
            return {
                ...state,
                user: { ...state.user, xp: newXp, level: newLevel, dailyProgress: Math.min(state.user.dailyGoal, state.user.dailyProgress + action.payload) },
                notifications: newNotifications,
            };
        }

        case 'COMPLETE_MISSION': {
            const xpEarned = action.payload.xp;
            const newXp = state.user.xp + xpEarned;
            const newLevel = Math.floor(newXp / 5000) + 1;
            const newNotifications = [
                { id: Date.now(), text: `Assignment Complete: +${xpEarned} Learning Score`, type: 'quest', read: false, time: new Date().toISOString() },
                ...state.notifications,
            ];
            return {
                ...state,
                user: { ...state.user, xp: newXp, level: newLevel, dailyProgress: Math.min(state.user.dailyGoal, state.user.dailyProgress + xpEarned) },
                notifications: newNotifications,
                courses: state.courses.map(course => {
                    if (course.id !== action.payload.courseId) return course;
                    const updatedMissions = course.missions.map(m =>
                        m.id === action.payload.missionId ? { ...m, completed: true } : m
                    );
                    const completedCount = updatedMissions.filter(m => m.completed).length;
                    const mastery = updatedMissions.length > 0 ? Math.round((completedCount / updatedMissions.length) * 100) : 0;
                    const courseXp = updatedMissions.reduce((acc, m) => m.completed ? acc + m.xp : acc, 0);
                    return { ...course, missions: updatedMissions, mastery, progress: courseXp };
                }),
            };
        }

        case 'ADD_NOTIFICATION':
            return { ...state, notifications: [{ id: Date.now(), ...action.payload, read: false, time: new Date().toISOString() }, ...state.notifications] };

        case 'MARK_NOTIFICATION_READ':
            return { ...state, notifications: state.notifications.map(n => n.id === action.payload ? { ...n, read: true } : n) };

        case 'CLEAR_NOTIFICATIONS':
            return { ...state, notifications: [] };

        case 'ADD_EVENT': {
            const updated = [...state.events, action.payload];
            return { ...state, events: updated };
        }

        case 'DELETE_EVENT':
            return { ...state, events: state.events.filter(e => e.id !== action.payload) };

        // ===================== TEACHER — CURRICULUM =====================
        case 'TEACHER_ADD_CURRICULUM': {
            const newItem = { ...action.payload, id: `C_${Date.now()}`, createdAt: new Date().toISOString(), status: 'draft' };
            const updated = [...state.teacherCurriculum, newItem];
            return { ...state, teacherCurriculum: updated, sharedCurriculum: updated };
        }

        case 'TEACHER_PUBLISH_CURRICULUM': {
            const updated = state.teacherCurriculum.map(c =>
                c.id === action.payload ? { ...c, status: 'published' } : c
            );
            return { ...state, teacherCurriculum: updated, sharedCurriculum: updated };
        }

        case 'TEACHER_DELETE_CURRICULUM': {
            const updated = state.teacherCurriculum.filter(c => c.id !== action.payload);
            return { ...state, teacherCurriculum: updated, sharedCurriculum: updated };
        }

        // ===================== TEACHER — ASSIGNMENTS =====================
        case 'TEACHER_ADD_ASSIGNMENT': {
            const newAssignment = { ...action.payload, id: `A_${Date.now()}`, createdAt: new Date().toISOString() };
            const updated = [...state.teacherAssignments, newAssignment];
            return { ...state, teacherAssignments: updated, sharedAssignments: updated };
        }

        case 'TEACHER_DELETE_ASSIGNMENT': {
            const updated = state.teacherAssignments.filter(a => a.id !== action.payload);
            return { ...state, teacherAssignments: updated, sharedAssignments: updated };
        }

        // ===================== ADMIN =====================
        case 'ADMIN_SUSPEND_USER': {
            const updated = state.allStudents.map(s =>
                s.id === action.payload ? { ...s, suspended: true } : s
            );
            const log = { id: `AL_${Date.now()}`, actor: 'Admin', actorRole: 'admin', actorId: 'A001', action: 'suspended_student', resource: action.payload, timestamp: new Date().toISOString(), ip: '10.0.0.5' };
            return { ...state, allStudents: updated, auditLogs: [log, ...state.auditLogs] };
        }

        case 'ADMIN_ACTIVATE_USER': {
            const updated = state.allStudents.map(s =>
                s.id === action.payload ? { ...s, suspended: false } : s
            );
            return { ...state, allStudents: updated };
        }

        case 'ADMIN_ADD_TEACHER': {
            const newTeacher = { ...action.payload, id: `T_${Date.now()}`, status: 'active', joinedDate: new Date().toISOString() };
            const log = { id: `AL_${Date.now()}`, actor: 'Admin', actorRole: 'admin', actorId: 'A001', action: 'created_teacher', resource: newTeacher.name, timestamp: new Date().toISOString(), ip: '10.0.0.5' };
            return { ...state, allTeachers: [...state.allTeachers, newTeacher], auditLogs: [log, ...state.auditLogs] };
        }

        case 'ADD_AUDIT_LOG': {
            const log = { id: `AL_${Date.now()}`, ...action.payload, timestamp: new Date().toISOString() };
            return { ...state, auditLogs: [log, ...state.auditLogs] };
        }

        // ===================== INTERVENTIONS =====================
        case 'CREATE_INTERVENTION': {
            const updated = [action.payload, ...state.interventions];
            return { ...state, interventions: updated };
        }

        case 'ASSIGN_INTERVENTION_ACTION': {
            const { interventionId, actionData } = action.payload;
            const updated = state.interventions.map(inv =>
                inv.id === interventionId
                    ? { ...inv, actions: [...inv.actions, actionData] }
                    : inv
            );
            return { ...state, interventions: updated };
        }

        case 'UPDATE_FOLLOWUP_STATUS': {
            const { interventionId, actionId, status } = action.payload;
            const updated = state.interventions.map(inv =>
                inv.id === interventionId
                    ? {
                        ...inv,
                        actions: inv.actions.map(act => act.id === actionId ? { ...act, status } : act)
                    }
                    : inv
            );
            return { ...state, interventions: updated };
        }

        case 'CLOSE_INTERVENTION': {
            const updated = state.interventions.map(inv =>
                inv.id === action.payload ? { ...inv, status: 'closed' } : inv
            );
            return { ...state, interventions: updated };
        }

        default:
            return state;
    }
}

export function AppStateProvider({ children }) {
    const [state, dispatch] = useReducer(appReducer, buildInitialState());

    // Restore session on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('edupulse_user');
        if (savedUser && !state.currentUser) {
            try {
                const user = JSON.parse(savedUser);
                dispatch({ type: 'RESTORE_SESSION', payload: user });
            } catch {
                localStorage.removeItem('edupulse_user');
                localStorage.removeItem('edupulse_role');
            }
        }
    }, []);

    // Persist key slices to localStorage whenever they change
    useEffect(() => {
        try {
            localStorage.setItem('edupulse_sharedCurriculum', JSON.stringify(state.sharedCurriculum));
            localStorage.setItem('edupulse_sharedAssignments', JSON.stringify(state.sharedAssignments));
            localStorage.setItem('edupulse_events', JSON.stringify(state.events));
            localStorage.setItem('edupulse_interventions', JSON.stringify(state.interventions));
        } catch { /* storage full */ }
    }, [state.sharedCurriculum, state.sharedAssignments, state.events, state.interventions]);

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
}

export function useAppState() {
    const context = useContext(AppStateContext);
    if (!context) throw new Error('useAppState must be used within an AppStateProvider');
    return context;
}
