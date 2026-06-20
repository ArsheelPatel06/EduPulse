// src/data/mockAuditLogs.js

const now = new Date();
const daysAgo = (d) => new Date(now.getTime() - d * 86400000).toISOString();
const hoursAgo = (h) => new Date(now.getTime() - h * 3600000).toISOString();
const minsAgo = (m) => new Date(now.getTime() - m * 60000).toISOString();

export const mockAuditLogs = [
    { id: 'AL001', actor: 'Dr. Anjali Mehta', actorRole: 'teacher', actorId: 'T001', action: 'created_curriculum', resource: 'Data Structures - Chapter 3', timestamp: minsAgo(8), ip: '10.0.1.42' },
    { id: 'AL002', actor: 'Arsheel Patel', actorRole: 'student', actorId: 'S001', action: 'completed_quiz', resource: 'JavaScript Arrays Quiz', timestamp: minsAgo(22), ip: '10.0.2.15' },
    { id: 'AL003', actor: 'Admin', actorRole: 'admin', actorId: 'A001', action: 'modified_course', resource: 'Web Development', timestamp: minsAgo(45), ip: '10.0.0.5' },
    { id: 'AL004', actor: 'Sneha Kulkarni', actorRole: 'student', actorId: 'S004', action: 'completed_assignment', resource: 'CSS Flexbox Assignment', timestamp: hoursAgo(1), ip: '10.0.2.88' },
    { id: 'AL005', actor: 'Prof. Sunil Rao', actorRole: 'teacher', actorId: 'T002', action: 'uploaded_curriculum', resource: 'Web Development - Chapter 5', timestamp: hoursAgo(2), ip: '10.0.1.55' },
    { id: 'AL006', actor: 'Divya Nair', actorRole: 'student', actorId: 'S009', action: 'earned_badge', resource: 'Top Performer Badge', timestamp: hoursAgo(3), ip: '10.0.2.31' },
    { id: 'AL007', actor: 'Admin', actorRole: 'admin', actorId: 'A001', action: 'created_teacher', resource: 'Dr. Preethi Nair account', timestamp: hoursAgo(5), ip: '10.0.0.5' },
    { id: 'AL008', actor: 'Dr. Kavita Singh', actorRole: 'teacher', actorId: 'T003', action: 'created_assignment', resource: 'OS Process Scheduling Quiz', timestamp: hoursAgo(6), ip: '10.0.1.22' },
    { id: 'AL009', actor: 'Priya Sharma', actorRole: 'student', actorId: 'S002', action: 'login', resource: 'Student Portal', timestamp: hoursAgo(8), ip: '10.0.2.67' },
    { id: 'AL010', actor: 'Rajan Mehta', actorRole: 'student', actorId: 'S003', action: 'completed_flashcard_session', resource: 'React Concepts Flashcards', timestamp: hoursAgo(9), ip: '10.0.2.44' },
    { id: 'AL011', actor: 'Prof. Sunil Rao', actorRole: 'teacher', actorId: 'T002', action: 'published_course', resource: 'Advanced JavaScript', timestamp: daysAgo(1), ip: '10.0.1.55' },
    { id: 'AL012', actor: 'Admin', actorRole: 'admin', actorId: 'A001', action: 'suspended_student', resource: 'Suresh Patil (S010) - Policy violation', timestamp: daysAgo(1), ip: '10.0.0.5' },
    { id: 'AL013', actor: 'Neha Verma', actorRole: 'student', actorId: 'S007', action: 'completed_quiz', resource: 'HTML5 Semantic Tags Quiz', timestamp: daysAgo(1), ip: '10.0.2.99' },
    { id: 'AL014', actor: 'Dr. Anjali Mehta', actorRole: 'teacher', actorId: 'T001', action: 'uploaded_csv', resource: 'Semester 1 Attendance Data - 48 students', timestamp: daysAgo(2), ip: '10.0.1.42' },
    { id: 'AL015', actor: 'Admin', actorRole: 'admin', actorId: 'A001', action: 'reset_password', resource: 'Priya Sharma (S002)', timestamp: daysAgo(2), ip: '10.0.0.5' },
    { id: 'AL016', actor: 'Arjun Reddy', actorRole: 'student', actorId: 'S012', action: 'level_up', resource: 'Reached Rank 8', timestamp: daysAgo(2), ip: '10.0.2.11' },
    { id: 'AL017', actor: 'Prof. Ramesh Iyer', actorRole: 'teacher', actorId: 'T004', action: 'created_quiz', resource: 'Discrete Math Final Quiz - 20 questions', timestamp: daysAgo(3), ip: '10.0.1.77' },
    { id: 'AL018', actor: 'Anita Rao', actorRole: 'student', actorId: 'S015', action: 'completed_learning_path', resource: 'CSS3 Styling — 100% Mastery', timestamp: daysAgo(3), ip: '10.0.2.55' },
    { id: 'AL019', actor: 'Admin', actorRole: 'admin', actorId: 'A001', action: 'assigned_role', resource: 'Teaching Assistant role to Arjun Reddy (S012)', timestamp: daysAgo(4), ip: '10.0.0.5' },
    { id: 'AL020', actor: 'Dr. Kavita Singh', actorRole: 'teacher', actorId: 'T003', action: 'flagged_student', resource: 'Kiran Desai (S005) — At-Risk Notification sent', timestamp: daysAgo(4), ip: '10.0.1.22' },
    { id: 'AL021', actor: 'Vikram Gupta', actorRole: 'student', actorId: 'S014', action: 'completed_assignment', resource: 'Database Design Assignment', timestamp: daysAgo(5), ip: '10.0.2.33' },
    { id: 'AL022', actor: 'Prof. Sunil Rao', actorRole: 'teacher', actorId: 'T002', action: 'created_flashcard_set', resource: 'React Hooks — 15 cards', timestamp: daysAgo(5), ip: '10.0.1.55' },
    { id: 'AL023', actor: 'Admin', actorRole: 'admin', actorId: 'A001', action: 'platform_backup', resource: 'Full database snapshot — v2.3.1', timestamp: daysAgo(6), ip: '10.0.0.5' },
    { id: 'AL024', actor: 'Sneha Kulkarni', actorRole: 'student', actorId: 'S004', action: 'earned_streak', resource: '14-Day Streak Milestone', timestamp: daysAgo(6), ip: '10.0.2.88' },
    { id: 'AL025', actor: 'Dr. Anjali Mehta', actorRole: 'teacher', actorId: 'T001', action: 'published_learning_path', resource: 'Data Structures Complete Path', timestamp: daysAgo(7), ip: '10.0.1.42' },
];
