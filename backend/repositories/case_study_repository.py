from sqlalchemy.orm import Session
from uuid import UUID
import models
from schemas import case_study_schemas

def get_case_studies(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.CaseStudy).offset(skip).limit(limit).all()

def get_case_study(db: Session, case_id: UUID):
    return db.query(models.CaseStudy).filter(models.CaseStudy.id == case_id).first()

def create_case_study(db: Session, case_study: case_study_schemas.CaseStudyCreate, user_id: UUID):
    db_case = models.CaseStudy(
        **case_study.model_dump(),
        created_by=user_id
    )
    db.add(db_case)
    db.commit()
    db.refresh(db_case)
    return db_case

def get_submissions_for_case(db: Session, case_id: UUID):
    return db.query(models.CaseSubmission).filter(models.CaseSubmission.case_id == case_id).all()

def get_submission(db: Session, submission_id: UUID):
    return db.query(models.CaseSubmission).filter(models.CaseSubmission.id == submission_id).first()

def create_submission(db: Session, submission: case_study_schemas.CaseSubmissionCreate, student_id: UUID):
    db_submission = models.CaseSubmission(
        **submission.model_dump(),
        student_id=student_id
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission

def evaluate_submission(db: Session, submission_id: UUID, evaluation: case_study_schemas.CaseEvaluation):
    db_submission = get_submission(db, submission_id)
    if db_submission:
        db_submission.score = evaluation.score
        db_submission.rubric_feedback = evaluation.rubric_feedback
        db.commit()
        db.refresh(db_submission)
    return db_submission
