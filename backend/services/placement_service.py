from sqlalchemy.orm import Session
from uuid import UUID
from schemas import placement_schemas
from repositories import placement_repository
from fastapi import HTTPException

def get_placement_profile(db: Session, student_id: UUID):
    profile = placement_repository.get_profile(db, student_id)
    if not profile:
        # Auto-create if not exists
        profile = placement_repository.create_profile(
            db, placement_schemas.PlacementProfileCreate(student_id=student_id)
        )
    return profile

def update_placement_profile(db: Session, student_id: UUID, target_industry: str):
    profile = get_placement_profile(db, student_id)
    profile.target_industry = target_industry
    db.commit()
    db.refresh(profile)
    return profile

def get_placement_score(db: Session, student_id: UUID):
    score = placement_repository.get_score(db, student_id)
    if not score:
        score = placement_repository.update_score(
            db, student_id, placement_schemas.PlacementScoreCreate(student_id=student_id)
        )
    return score

def get_mock_interviews(db: Session, student_id: UUID):
    return placement_repository.get_mock_interviews(db, student_id)

def record_mock_interview(db: Session, interview: placement_schemas.MockInterviewCreate):
    return placement_repository.create_mock_interview(db, interview)
