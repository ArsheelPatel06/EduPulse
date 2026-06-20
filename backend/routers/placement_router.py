from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from schemas import placement_schemas
from services import placement_service
from database import get_db

router = APIRouter(
    prefix="/placement",
    tags=["Placement Readiness"]
)

@router.get("/profile/{student_id}", response_model=placement_schemas.PlacementProfileResponse)
def get_profile(student_id: UUID, db: Session = Depends(get_db)):
    """
    Returns the placement profile for a student (creates it if it doesn't exist).
    """
    return placement_service.get_placement_profile(db, student_id)

@router.patch("/profile/{student_id}/industry")
def update_industry(student_id: UUID, target_industry: str, db: Session = Depends(get_db)):
    """
    Updates the target industry for a student's placement profile.
    """
    return placement_service.update_placement_profile(db, student_id, target_industry)

@router.get("/score/{student_id}", response_model=placement_schemas.PlacementScoreResponse)
def get_score(student_id: UUID, db: Session = Depends(get_db)):
    """
    Returns the detailed placement readiness score breakdown for a student.
    """
    return placement_service.get_placement_score(db, student_id)

@router.get("/interviews/{student_id}", response_model=List[placement_schemas.MockInterviewResponse])
def get_mock_interviews(student_id: UUID, db: Session = Depends(get_db)):
    """
    Returns all mock interview records for a student.
    """
    return placement_service.get_mock_interviews(db, student_id)

@router.post("/interviews", response_model=placement_schemas.MockInterviewResponse)
def record_mock_interview(interview: placement_schemas.MockInterviewCreate, db: Session = Depends(get_db)):
    """
    Teacher Endpoint: Records a new mock interview and feedback.
    """
    return placement_service.record_mock_interview(db, interview)
