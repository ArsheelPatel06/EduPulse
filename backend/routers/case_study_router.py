from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from schemas import case_study_schemas
from services import case_study_service
from database import get_db

router = APIRouter(
    prefix="/case-studies",
    tags=["Case Studies"]
)

# Case Studies (Teacher perspective)
@router.post("/", response_model=case_study_schemas.CaseStudyResponse)
def create_case_study(
    case_study: case_study_schemas.CaseStudyCreate, 
    user_id: UUID = Header(None, description="The UUID of the Teacher creating the case study"),
    db: Session = Depends(get_db)
):
    """
    Teacher Endpoint: Creates a new case study. Requires the teacher's UUID in the user-id header.
    """
    return case_study_service.create_case_study(db=db, case_study=case_study, user_id=user_id)

@router.get("/", response_model=List[case_study_schemas.CaseStudyResponse])
def read_case_studies(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return case_study_service.get_case_studies(db, skip=skip, limit=limit)

@router.get("/{case_id}", response_model=case_study_schemas.CaseStudyResponse)
def read_case_study(case_id: UUID, db: Session = Depends(get_db)):
    return case_study_service.get_case_study(db, case_id=case_id)

# Submissions (Student perspective)
@router.post("/submissions", response_model=case_study_schemas.CaseSubmissionResponse)
def submit_case_solution(
    submission: case_study_schemas.CaseSubmissionCreate, 
    student_id: UUID = Header(None, description="The UUID of the Student submitting"),
    db: Session = Depends(get_db)
):
    """
    Student Endpoint: Submits a solution for a case study.
    """
    return case_study_service.create_submission(db=db, submission=submission, student_id=student_id)

@router.get("/{case_id}/submissions", response_model=List[case_study_schemas.CaseSubmissionResponse])
def read_submissions(case_id: UUID, db: Session = Depends(get_db)):
    """
    Teacher Endpoint: Retrieves all student submissions for a specific case study.
    """
    return case_study_service.get_submissions(db, case_id=case_id)

# Evaluation (Teacher perspective)
@router.patch("/submissions/{submission_id}/evaluate", response_model=case_study_schemas.CaseSubmissionResponse)
def evaluate_submission(
    submission_id: UUID, 
    evaluation: case_study_schemas.CaseEvaluation,
    db: Session = Depends(get_db)
):
    """
    Teacher Endpoint: Evaluates a student's case study submission, adding a score and rubric feedback.
    """
    return case_study_service.evaluate_submission(db=db, submission_id=submission_id, evaluation=evaluation)
