from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from typing import Dict, Any

from services.analytics_service import AnalyticsService
from database import get_db

router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"]
)

@router.get("/student/{student_id}", response_model=Dict[str, Any])
def get_student_analytics(student_id: UUID, db: Session = Depends(get_db)):
    """
    Returns the comprehensive 5-engine analytics summary for a single student.
    """
    return AnalyticsService.compute_student_analytics(db, student_id)

@router.get("/course/{course_id}")
def get_course_analytics(course_id: UUID, db: Session = Depends(get_db)):
    """
    Aggregates analytics across all students in a specific course.
    """
    # Placeholder for aggregation
    return {"course_id": course_id, "status": "Aggregated Data"}

@router.get("/class/{class_id}")
def get_class_analytics(class_id: UUID, db: Session = Depends(get_db)):
    """
    Aggregates analytics across an entire class cohort.
    """
    return {"class_id": class_id, "status": "Class Overview"}

@router.get("/outcomes/{student_id}")
def get_student_outcomes(student_id: UUID, db: Session = Depends(get_db)):
    """
    Isolates and returns the Outcome-Based Education (OBE) metrics.
    """
    summary = AnalyticsService.compute_student_analytics(db, student_id)
    return summary["obe"]

@router.get("/placement/{student_id}")
def get_placement_readiness(student_id: UUID, db: Session = Depends(get_db)):
    """
    Isolates and returns Placement Readiness metrics.
    """
    summary = AnalyticsService.compute_student_analytics(db, student_id)
    return summary["placement"]

@router.get("/risk")
def get_at_risk_students(db: Session = Depends(get_db)):
    """
    Returns all students currently categorized as High or Critical risk.
    """
    from models import Analytics
    critical = db.query(Analytics).filter(Analytics.risk_category == 'Critical').all()
    high = db.query(Analytics).filter(Analytics.risk_category == 'High').all()
    
    return {
        "critical_count": len(critical),
        "high_count": len(high),
        "critical_students": [a.student_id for a in critical],
        "high_students": [a.student_id for a in high]
    }
