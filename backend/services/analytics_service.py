import math
from typing import Dict, List
from sqlalchemy.orm import Session
from uuid import UUID

from models import (
    Student, AssignmentSubmission, QuizAttempt, CaseSubmission, Attendance,
    Activity, Topic, Module, Course, ProgramOutcome, CourseOutcome, ActivityOutcome,
    Analytics, PlacementScore, PlacementProfile, Intervention
)
from datetime import datetime, timedelta

class AcademicAnalytics:
    @staticmethod
    def calculate_academic_score(db: Session, student_id: UUID) -> Dict:
        """
        Quiz Performance       30%
        Assignments            25%
        Case Studies           20%
        Attendance             15%
        Lab Activities         10%
        """
        # Fetching scores for each category
        quizzes = db.query(QuizAttempt).filter(QuizAttempt.student_id == student_id).all()
        assignments = db.query(AssignmentSubmission).filter(AssignmentSubmission.student_id == student_id).all()
        cases = db.query(CaseSubmission).filter(CaseSubmission.student_id == student_id).all()
        attendance = db.query(Attendance).filter(Attendance.student_id == student_id).all()
        
        # This is a simplified aggregated average calculation for demonstration
        quiz_avg = sum(q.score for q in quizzes) / max(len(quizzes), 1)
        assignment_avg = sum(a.score for a in assignments) / max(len(assignments), 1)
        case_avg = sum(c.score for c in cases) / max(len(cases), 1)
        
        present_days = len([a for a in attendance if a.status == 'present'])
        attendance_avg = (present_days / max(len(attendance), 1)) * 100
        
        lab_avg = 80 # Placeholder logic for Lab activities
        
        final_score = (
            (quiz_avg * 0.30) +
            (assignment_avg * 0.25) +
            (case_avg * 0.20) +
            (attendance_avg * 0.15) +
            (lab_avg * 0.10)
        )
        
        if final_score >= 90:
            grade = "A+"
        elif final_score >= 80:
            grade = "A"
        elif final_score >= 70:
            grade = "B"
        elif final_score >= 60:
            grade = "C"
        elif final_score >= 50:
            grade = "D"
        else:
            grade = "F"
            
        return {
            "academic_score": round(final_score, 2),
            "academic_grade": grade
        }

class EngagementAnalytics:
    @staticmethod
    def calculate_engagement_score(db: Session, student_id: UUID) -> Dict:
        """
        Learning Score (XP based)    25%
        Streak                       20%
        Assignments Submitted        20%
        Planner Usage                15%
        Daily Active Days            20%
        """
        student = db.query(Student).filter(Student.id == student_id).first()
        if not student:
            return {"engagement_score": 0, "category": "Disengaged"}
            
        xp_normalized = min((student.xp / 1000) * 100, 100)
        streak_normalized = min((student.streak / 30) * 100, 100)
        
        # Submissions
        subs = db.query(AssignmentSubmission).filter(AssignmentSubmission.student_id == student_id).count()
        subs_normalized = min((subs / 10) * 100, 100)
        
        planner_usage = 75 # Placeholder
        active_days = 85 # Placeholder
        
        score = (
            (xp_normalized * 0.25) +
            (streak_normalized * 0.20) +
            (subs_normalized * 0.20) +
            (planner_usage * 0.15) +
            (active_days * 0.20)
        )
        
        if score >= 75:
            category = "Highly Engaged"
        elif score >= 40:
            category = "Moderately Engaged"
        else:
            category = "Disengaged"
            
        return {"engagement_score": round(score, 2), "category": category}

class RiskAnalytics:
    @staticmethod
    def calculate_risk(academic_data: Dict, engagement_data: Dict) -> Dict:
        """
        Low Attendance, Poor Academics, Low Engagement, Missing Assignments, No Activity > 7 days
        """
        risk_score = 0
        
        if academic_data["academic_score"] < 50:
            risk_score += 40
        elif academic_data["academic_score"] < 65:
            risk_score += 20
            
        if engagement_data["engagement_score"] < 40:
            risk_score += 30
            
        if risk_score >= 70:
            category = "Critical"
        elif risk_score >= 40:
            category = "High"
        elif risk_score >= 20:
            category = "Medium"
        else:
            category = "Low"
            
        return {
            "risk_score": risk_score,
            "risk_category": category
        }

class OutcomeAnalytics:
    @staticmethod
    def calculate_obe(db: Session, student_id: UUID) -> Dict:
        """
        Activity Achievement -> Course Outcome -> Program Outcome
        """
        # In a fully populated DB, this traverses:
        # Student Submissions -> Activities -> ActivityOutcomes -> CourseOutcomes -> ProgramOutcomes
        
        # Returning a structured mockup showing the math design for the API
        return {
            "program_outcomes": {
                "PO1": 84,
                "PO2": 77,
                "PO3": 89
            },
            "course_outcomes": {
                "CO1": 82,
                "CO2": 74,
                "CO3": 91
            }
        }

class PlacementAnalytics:
    @staticmethod
    def calculate_readiness(academic: Dict, engagement: Dict) -> Dict:
        """
        Academic         30%
        Technical        25%
        Case Studies     20%
        Communication    10%
        Attendance        5%
        Engagement       10%
        """
        academic_score = academic["academic_score"]
        eng_score = engagement["engagement_score"]
        
        tech_score = 75 # Placeholder until aptitude table queried
        case_score = 80 # Placeholder
        comm_score = 70 # Placeholder
        att_score = 85 # Placeholder
        
        readiness = (
            (academic_score * 0.30) +
            (tech_score * 0.25) +
            (case_score * 0.20) +
            (comm_score * 0.10) +
            (att_score * 0.05) +
            (eng_score * 0.10)
        )
        
        if readiness >= 85:
            status = "Placement Ready"
        elif readiness >= 65:
            status = "Nearly Ready"
        elif readiness >= 50:
            status = "Needs Improvement"
        else:
            status = "High Concern"
            
        return {
            "readiness_percentage": round(readiness, 2),
            "status": status
        }

class AnalyticsService:
    @staticmethod
    def compute_student_analytics(db: Session, student_id: UUID):
        # 1. Academic
        academic = AcademicAnalytics.calculate_academic_score(db, student_id)
        
        # 2. Engagement
        engagement = EngagementAnalytics.calculate_engagement_score(db, student_id)
        
        # 3. Risk
        risk = RiskAnalytics.calculate_risk(academic, engagement)
        
        # 4. OBE
        obe = OutcomeAnalytics.calculate_obe(db, student_id)
        
        # 5. Placement
        placement = PlacementAnalytics.calculate_readiness(academic, engagement)
        
        # Persist to DB
        db_analytics = db.query(Analytics).filter(Analytics.student_id == student_id).first()
        if not db_analytics:
            db_analytics = Analytics(student_id=student_id)
            db.add(db_analytics)
            
        db_analytics.academic_score = academic["academic_score"]
        db_analytics.engagement_score = engagement["engagement_score"]
        db_analytics.risk_score = risk["risk_score"]
        db_analytics.risk_category = risk["risk_category"]
        db_analytics.computed_at = datetime.now()
        
        # Auto Intervention if Critical
        if risk["risk_category"] == "Critical":
            open_int = db.query(Intervention).filter(
                Intervention.student_id == student_id, 
                Intervention.status == "open"
            ).first()
            
            if not open_int:
                new_int = Intervention(
                    student_id=student_id,
                    reason="Automatically generated due to Critical Risk status."
                )
                db.add(new_int)
                
        db.commit()
        
        return {
            "student_id": student_id,
            "academic": academic,
            "engagement": engagement,
            "risk": risk,
            "obe": obe,
            "placement": placement
        }
