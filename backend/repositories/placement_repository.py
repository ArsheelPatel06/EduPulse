from sqlalchemy.orm import Session
from uuid import UUID
import models
from schemas import placement_schemas

def get_profile(db: Session, student_id: UUID):
    return db.query(models.PlacementProfile).filter(models.PlacementProfile.student_id == student_id).first()

def create_profile(db: Session, profile: placement_schemas.PlacementProfileCreate):
    db_profile = models.PlacementProfile(**profile.model_dump())
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile

def get_score(db: Session, student_id: UUID):
    return db.query(models.PlacementScore).filter(models.PlacementScore.student_id == student_id).first()

def update_score(db: Session, student_id: UUID, score: placement_schemas.PlacementScoreCreate):
    db_score = get_score(db, student_id)
    if not db_score:
        db_score = models.PlacementScore(**score.model_dump())
        db.add(db_score)
    else:
        for key, value in score.model_dump().items():
            setattr(db_score, key, value)
    db.commit()
    db.refresh(db_score)
    return db_score

def get_mock_interviews(db: Session, student_id: UUID):
    return db.query(models.MockInterview).filter(models.MockInterview.student_id == student_id).all()

def create_mock_interview(db: Session, interview: placement_schemas.MockInterviewCreate):
    db_interview = models.MockInterview(**interview.model_dump())
    db.add(db_interview)
    db.commit()
    db.refresh(db_interview)
    return db_interview
