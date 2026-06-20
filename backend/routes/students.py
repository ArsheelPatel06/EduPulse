from fastapi import APIRouter
from typing import List
from models import StudentProfile
from data.seed_data import MOCK_STUDENTS

router = APIRouter()

@router.get("/", response_model=List[StudentProfile])
def get_all_students():
    return MOCK_STUDENTS

@router.get("/{student_id}", response_model=StudentProfile)
def get_student(student_id: str):
    for s in MOCK_STUDENTS:
        if s["id"] == student_id:
            return s
    return {"error": "Not found"}
