import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAppState } from './state/appState';

// === Public Pages ===
import Landing from './pages/Landing';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Architecture from './pages/Architecture';

// === Student Pages ===
import Dashboard from './pages/Dashboard';
import Course from './pages/Course';
import Challenge from './pages/Challenge';
import Chatbot from './pages/Chatbot';
import FlashcardGame from './pages/FlashcardGame';
import QuizGame from './pages/QuizGame';
import Quests from './pages/Quests';
import Results from './pages/Results';
import StudyPlanner from './pages/StudyPlanner';
import Profile from './pages/Profile';
import Interventions from './pages/Interventions';

// === Teacher Pages ===
import TeacherLayout from './roles/teacher/TeacherLayout';
import TeacherDashboard from './roles/teacher/pages/TeacherDashboard';
import StudentManagement from './roles/teacher/pages/StudentManagement';
import CurriculumManager from './roles/teacher/pages/CurriculumManager';
import AssignmentManager from './roles/teacher/pages/AssignmentManager';
import TeacherAnalytics from './roles/teacher/pages/TeacherAnalytics';
import TeacherInterventions from './roles/teacher/pages/TeacherInterventions';

// === Admin Pages ===
import AdminLayout from './roles/admin/AdminLayout';
import AdminDashboard from './roles/admin/pages/AdminDashboard';
import UserManagement from './roles/admin/pages/UserManagement';
import AuditLogs from './roles/admin/pages/AuditLogs';
import InstitutionAnalytics from './roles/admin/pages/InstitutionAnalytics';
import AdminInterventions from './roles/admin/pages/AdminInterventions';

// Placement Dashboards
import StudentPlacement from './pages/placement/StudentPlacement';
import TeacherPlacement from './pages/placement/TeacherPlacement';
import AdminPlacement from './pages/placement/AdminPlacement';

// ===== Role Guard =====
function RoleGuard({ allowedRoles, children }) {
    const { state } = useAppState();
    const role = state.currentUser?.role;
    if (!role) return <Navigate to="/login" replace />;
    if (!allowedRoles.includes(role)) {
        // Redirect to correct home for their role
        if (role === 'teacher') return <Navigate to="/teacher" replace />;
        if (role === 'admin') return <Navigate to="/admin" replace />;
        return <Navigate to="/dashboard" replace />;
    }
    return children;
}

function App() {
    return (
        <Router>
            <Routes>
                {/* ======= Public ======= */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/architecture" element={<Architecture />} />

                {/* ======= Student Routes ======= */}
                <Route path="/dashboard" element={<RoleGuard allowedRoles={['student']}><Dashboard /></RoleGuard>} />
                <Route path="/placement" element={<RoleGuard allowedRoles={['student']}><StudentPlacement /></RoleGuard>} />
                <Route path="/course/:courseId" element={<RoleGuard allowedRoles={['student']}><Course /></RoleGuard>} />
                <Route path="/courses/:id" element={<RoleGuard allowedRoles={['student']}><Course /></RoleGuard>} />
                <Route path="/challenges" element={<RoleGuard allowedRoles={['student']}><Challenge /></RoleGuard>} />
                <Route path="/quests" element={<RoleGuard allowedRoles={['student']}><Quests /></RoleGuard>} />
                <Route path="/results" element={<RoleGuard allowedRoles={['student']}><Results /></RoleGuard>} />
                <Route path="/planner" element={<RoleGuard allowedRoles={['student']}><StudyPlanner /></RoleGuard>} />
                <Route path="/interventions" element={<RoleGuard allowedRoles={['student']}><Interventions /></RoleGuard>} />
                <Route path="/profile" element={<RoleGuard allowedRoles={['student']}><Profile /></RoleGuard>} />
                <Route path="/chatbot" element={<RoleGuard allowedRoles={['student', 'teacher', 'admin']}><Chatbot /></RoleGuard>} />
                <Route path="/study/flashcards" element={<RoleGuard allowedRoles={['student']}><FlashcardGame /></RoleGuard>} />
                <Route path="/study/quiz" element={<RoleGuard allowedRoles={['student']}><QuizGame /></RoleGuard>} />

                {/* ======= Teacher Routes ======= */}
                <Route path="/teacher" element={<RoleGuard allowedRoles={['teacher']}><TeacherLayout /></RoleGuard>}>
                    <Route index element={<TeacherDashboard />} />
                    <Route path="students" element={<StudentManagement />} />
                    <Route path="curriculum" element={<CurriculumManager />} />
                    <Route path="assignments" element={<AssignmentManager />} />
                    <Route path="placement" element={<TeacherPlacement />} />
                    <Route path="analytics" element={<TeacherAnalytics />} />
                    <Route path="interventions" element={<TeacherInterventions />} />
                </Route>

                {/* ======= Admin Routes ======= */}
                <Route path="/admin" element={<RoleGuard allowedRoles={['admin']}><AdminLayout /></RoleGuard>}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="placement" element={<AdminPlacement />} />
                    <Route path="analytics" element={<InstitutionAnalytics />} />
                    <Route path="audit" element={<AuditLogs />} />
                    <Route path="interventions" element={<AdminInterventions />} />
                </Route>

                {/* ======= Fallback ======= */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
