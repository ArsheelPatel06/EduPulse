from sqlalchemy.orm import Session
from uuid import UUID
import models
from schemas import assessment_schemas

# Assignments
def get_assignments(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Assignment).offset(skip).limit(limit).all()

def get_assignment(db: Session, assignment_id: UUID):
    return db.query(models.Assignment).filter(models.Assignment.id == assignment_id).first()

def create_assignment(db: Session, assignment: assessment_schemas.AssignmentCreate):
    db_assignment = models.Assignment(**assignment.model_dump())
    db.add(db_assignment)
    db.commit()
    db.refresh(db_assignment)
    return db_assignment

# Submissions
def get_submissions_for_assignment(db: Session, assignment_id: UUID):
    return db.query(models.AssignmentSubmission).filter(models.AssignmentSubmission.assignment_id == assignment_id).all()

def create_submission(db: Session, submission: assessment_schemas.SubmissionCreate):
    db_submission = models.AssignmentSubmission(**submission.model_dump())
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission

# Quizzes
def get_quizzes(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Quiz).offset(skip).limit(limit).all()

def get_quiz(db: Session, quiz_id: UUID):
    return db.query(models.Quiz).filter(models.Quiz.id == quiz_id).first()

def create_quiz(db: Session, quiz: assessment_schemas.QuizCreate):
    db_quiz = models.Quiz(**quiz.model_dump())
    db.add(db_quiz)
    db.commit()
    db.refresh(db_quiz)
    return db_quiz

# Quiz Attempts
def get_attempts_for_quiz(db: Session, quiz_id: UUID):
    return db.query(models.QuizAttempt).filter(models.QuizAttempt.quiz_id == quiz_id).all()

def create_quiz_attempt(db: Session, attempt: assessment_schemas.QuizAttemptCreate):
    db_attempt = models.QuizAttempt(**attempt.model_dump())
    db.add(db_attempt)
    db.commit()
    db.refresh(db_attempt)
    return db_attempt
