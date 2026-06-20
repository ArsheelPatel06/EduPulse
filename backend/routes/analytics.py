from fastapi import APIRouter
from models import AnalyticsScore
from services.analytics_service import calculate_student_scores
from data.seed_data import MOCK_STUDENTS

router = APIRouter()

@router.get("/student/{student_id}", response_model=AnalyticsScore)
def get_student_analytics(student_id: str):
    student = next((s for s in MOCK_STUDENTS if s["id"] == student_id), None)
    if not student:
        return {"error": "Student not found"}
    
    return calculate_student_scores(student)
