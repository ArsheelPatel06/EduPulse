from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from schemas import assessment_schemas
from services import assessment_service
from database import get_db

router = APIRouter(
    prefix="/assessments",
    tags=["Assessments"]
)

# Assignments
@router.post("/assignments", response_model=assessment_schemas.AssignmentResponse)
def create_assignment(assignment: assessment_schemas.AssignmentCreate, db: Session = Depends(get_db)):
    return assessment_service.create_assignment(db=db, assignment=assignment)

@router.get("/assignments", response_model=List[assessment_schemas.AssignmentResponse])
def read_assignments(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return assessment_service.get_assignments(db, skip=skip, limit=limit)

@router.get("/assignments/{assignment_id}", response_model=assessment_schemas.AssignmentResponse)
def read_assignment(assignment_id: UUID, db: Session = Depends(get_db)):
    return assessment_service.get_assignment(db, assignment_id=assignment_id)

@router.post("/submissions", response_model=assessment_schemas.SubmissionResponse)
def create_submission(submission: assessment_schemas.SubmissionCreate, db: Session = Depends(get_db)):
    return assessment_service.create_submission(db=db, submission=submission)

@router.get("/assignments/{assignment_id}/submissions", response_model=List[assessment_schemas.SubmissionResponse])
def read_submissions(assignment_id: UUID, db: Session = Depends(get_db)):
    return assessment_service.get_submissions(db, assignment_id=assignment_id)

# Quizzes
@router.post("/quizzes", response_model=assessment_schemas.QuizResponse)
def create_quiz(quiz: assessment_schemas.QuizCreate, db: Session = Depends(get_db)):
    return assessment_service.create_quiz(db=db, quiz=quiz)

@router.get("/quizzes", response_model=List[assessment_schemas.QuizResponse])
def read_quizzes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return assessment_service.get_quizzes(db, skip=skip, limit=limit)

@router.get("/quizzes/{quiz_id}", response_model=assessment_schemas.QuizResponse)
def read_quiz(quiz_id: UUID, db: Session = Depends(get_db)):
    return assessment_service.get_quiz(db, quiz_id=quiz_id)

@router.post("/quiz-attempts", response_model=assessment_schemas.QuizAttemptResponse)
def create_quiz_attempt(attempt: assessment_schemas.QuizAttemptCreate, db: Session = Depends(get_db)):
    return assessment_service.create_attempt(db=db, attempt=attempt)

@router.get("/quizzes/{quiz_id}/attempts", response_model=List[assessment_schemas.QuizAttemptResponse])
def read_quiz_attempts(quiz_id: UUID, db: Session = Depends(get_db)):
    return assessment_service.get_attempts(db, quiz_id=quiz_id)
