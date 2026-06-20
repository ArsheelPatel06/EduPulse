// src/services/analyticsEngine.js
// Computes Academic Score, Engagement Score, Risk Score for each student

/**
 * Academic Score (0–100)
 * Weighted formula:
 *   Attendance   30%
 *   Quiz Average 40%
 *   Assignments  20%
 *   Participation 10% (derived from quizScores count)
 */
export const computeAcademicScore = (student) => {
    const quizAvg = student.quizScores.length > 0
        ? student.quizScores.reduce((a, b) => a + b, 0) / student.quizScores.length
        : 0;
    const assignmentRate = student.totalAssignments > 0
        ? (student.assignmentsCompleted / student.totalAssignments) * 100
        : 0;
    const participation = Math.min(100, (student.quizScores.length / 5) * 100);

    const score =
        student.attendance * 0.30 +
        quizAvg * 0.40 +
        assignmentRate * 0.20 +
        participation * 0.10;

    return Math.round(score);
};

/**
 * Engagement Score (0–100)
 * Based on: XP (normalized), streak, recent activity
 */
export const computeEngagementScore = (student) => {
    const xpNorm = Math.min(100, (student.xp / 20000) * 100);
    const streakNorm = Math.min(100, (student.streak / 21) * 100);

    const lastActiveDate = new Date(student.lastActive);
    const daysSinceActive = Math.max(0, Math.floor((Date.now() - lastActiveDate) / 86400000));
    const activityScore = Math.max(0, 100 - daysSinceActive * 10);

    const assignmentEngage = student.totalAssignments > 0
        ? (student.assignmentsCompleted / student.totalAssignments) * 100
        : 0;

    const score =
        xpNorm * 0.30 +
        streakNorm * 0.25 +
        activityScore * 0.25 +
        assignmentEngage * 0.20;

    return Math.round(score);
};

/**
 * Risk Score — accumulates risk points, returns level
 * Each condition contributes to a risk point total
 */
export const computeRiskLevel = (student, academicScore, engagementScore) => {
    let riskPoints = 0;

    if (student.attendance < 60) riskPoints += 4;
    else if (student.attendance < 75) riskPoints += 2;

    if (academicScore < 40) riskPoints += 4;
    else if (academicScore < 55) riskPoints += 2;

    if (engagementScore < 30) riskPoints += 3;
    else if (engagementScore < 50) riskPoints += 1;

    if (student.streak === 0) riskPoints += 2;

    const lastActive = new Date(student.lastActive);
    const daysSince = (Date.now() - lastActive) / 86400000;
    if (daysSince > 14) riskPoints += 3;
    else if (daysSince > 7) riskPoints += 1;

    if (riskPoints >= 7) return 'high';
    if (riskPoints >= 3) return 'medium';
    return 'low';
};

/**
 * Grade from academic score
 */
export const getGrade = (score) => {
    if (score >= 85) return { grade: 'A', label: 'Excellent' };
    if (score >= 70) return { grade: 'B', label: 'Good' };
    if (score >= 55) return { grade: 'C', label: 'Average' };
    if (score >= 40) return { grade: 'D', label: 'Below Average' };
    return { grade: 'F', label: 'At Risk' };
};

/**
 * Run full analytics for a single student
 */
export const analyzeStudent = (student) => {
    const academicScore = computeAcademicScore(student);
    const engagementScore = computeEngagementScore(student);
    const riskLevel = computeRiskLevel(student, academicScore, engagementScore);
    const { grade, label } = getGrade(academicScore);
    const quizAvg = student.quizScores.length > 0
        ? Math.round(student.quizScores.reduce((a, b) => a + b, 0) / student.quizScores.length)
        : 0;

    return {
        ...student,
        academicScore,
        engagementScore,
        riskLevel,
        grade,
        gradeLabel: label,
        quizAvg,
    };
};

/**
 * Run analytics for all students
 */
export const analyzeAllStudents = (students) => students.map(analyzeStudent);

/**
 * Aggregate stats for teacher dashboard
 */
export const computeClassStats = (analyzedStudents) => {
    const total = analyzedStudents.length;
    if (total === 0) return {};

    const avgAttendance = Math.round(
        analyzedStudents.reduce((a, s) => a + s.attendance, 0) / total
    );
    const avgPerformance = Math.round(
        analyzedStudents.reduce((a, s) => a + s.academicScore, 0) / total
    );
    const avgEngagement = Math.round(
        analyzedStudents.reduce((a, s) => a + s.engagementScore, 0) / total
    );
    const atRisk = analyzedStudents.filter(s => s.riskLevel === 'high').length;
    const mediumRisk = analyzedStudents.filter(s => s.riskLevel === 'medium').length;

    return { total, avgAttendance, avgPerformance, avgEngagement, atRisk, mediumRisk };
};

/**
 * Generate AI recommendation text for at-risk students
 * Returns a static recommendation based on risk factors
 * (Will be replaced with Jimi AI call in Phase 6)
 */
export const getStaticRecommendation = (student, academicScore, engagementScore) => {
    const recommendations = [];
    if (student.attendance < 75) recommendations.push('Attendance dropped significantly. Enable daily reminders and attendance alerts.');
    if (academicScore < 55) recommendations.push('Quiz performance below threshold. Assign additional practice quizzes on weak topics.');
    if (engagementScore < 40) recommendations.push('Low engagement detected. Consider one-on-one teacher intervention session.');
    if (student.streak === 0) recommendations.push('No active learning streak. Encourage student to log in daily for 5 minutes.');
    const lastActive = new Date(student.lastActive);
    const daysSince = Math.floor((Date.now() - lastActive) / 86400000);
    if (daysSince > 7) recommendations.push(`Inactive for ${daysSince} days. Send re-engagement notification with personalized study plan.`);
    if (recommendations.length === 0) recommendations.push('Student is performing well. Continue current learning path.');
    return recommendations;
};
