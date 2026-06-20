from sqlalchemy.orm import Session
from uuid import UUID
from schemas import assessment_schemas
from repositories import assessment_repository
from fastapi import HTTPException

# Assignments
def get_assignments(db: Session, skip: int = 0, limit: int = 100):
    return assessment_repository.get_assignments(db, skip=skip, limit=limit)

def get_assignment(db: Session, assignment_id: UUID):
    assignment = assessment_repository.get_assignment(db, assignment_id)
    if not assignment:
        raise HTTPException(status_code=404, detail="Assignment not found")
    return assignment

def create_assignment(db: Session, assignment: assessment_schemas.AssignmentCreate):
    return assessment_repository.create_assignment(db=db, assignment=assignment)

def get_submissions(db: Session, assignment_id: UUID):
    return assessment_repository.get_submissions_for_assignment(db, assignment_id)

def create_submission(db: Session, submission: assessment_schemas.SubmissionCreate):
    return assessment_repository.create_submission(db=db, submission=submission)

# Quizzes
def get_quizzes(db: Session, skip: int = 0, limit: int = 100):
    return assessment_repository.get_quizzes(db, skip=skip, limit=limit)

def get_quiz(db: Session, quiz_id: UUID):
    quiz = assessment_repository.get_quiz(db, quiz_id)
    if not quiz:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz

def create_quiz(db: Session, quiz: assessment_schemas.QuizCreate):
    return assessment_repository.create_quiz(db=db, quiz=quiz)

def get_attempts(db: Session, quiz_id: UUID):
    return assessment_repository.get_attempts_for_quiz(db, quiz_id)

def create_attempt(db: Session, attempt: assessment_schemas.QuizAttemptCreate):
    return assessment_repository.create_quiz_attempt(db=db, attempt=attempt)
