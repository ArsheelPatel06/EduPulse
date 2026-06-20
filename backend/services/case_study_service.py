from sqlalchemy.orm import Session
from uuid import UUID
from schemas import case_study_schemas
from repositories import case_study_repository
from fastapi import HTTPException

def get_case_studies(db: Session, skip: int = 0, limit: int = 100):
    return case_study_repository.get_case_studies(db, skip=skip, limit=limit)

def get_case_study(db: Session, case_id: UUID):
    case_study = case_study_repository.get_case_study(db, case_id)
    if not case_study:
        raise HTTPException(status_code=404, detail="Case study not found")
    return case_study

def create_case_study(db: Session, case_study: case_study_schemas.CaseStudyCreate, user_id: UUID):
    # In a real app, verify user_id has teacher/admin role here
    return case_study_repository.create_case_study(db=db, case_study=case_study, user_id=user_id)

def get_submissions(db: Session, case_id: UUID):
    return case_study_repository.get_submissions_for_case(db, case_id)

def get_submission(db: Session, submission_id: UUID):
    submission = case_study_repository.get_submission(db, submission_id)
    if not submission:
        raise HTTPException(status_code=404, detail="Submission not found")
    return submission

def create_submission(db: Session, submission: case_study_schemas.CaseSubmissionCreate, student_id: UUID):
    return case_study_repository.create_submission(db=db, submission=submission, student_id=student_id)

def evaluate_submission(db: Session, submission_id: UUID, evaluation: case_study_schemas.CaseEvaluation):
    submission = get_submission(db, submission_id)
    return case_study_repository.evaluate_submission(db=db, submission_id=submission_id, evaluation=evaluation)
