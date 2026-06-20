from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class AssignmentBase(BaseModel):
    title: str
    description: Optional[str] = None
    due_date: Optional[datetime] = None
    max_score: int = 100
    activity_id: UUID

class AssignmentCreate(AssignmentBase):
    pass

class AssignmentResponse(AssignmentBase):
    id: UUID

    class Config:
        from_attributes = True

class SubmissionBase(BaseModel):
    submission_url: Optional[str] = None
    score: Optional[float] = None
    feedback: Optional[str] = None
    assignment_id: UUID
    student_id: UUID

class SubmissionCreate(SubmissionBase):
    pass

class SubmissionResponse(SubmissionBase):
    id: UUID
    submitted_at: datetime

    class Config:
        from_attributes = True

class QuizBase(BaseModel):
    title: str
    difficulty: Optional[str] = None
    time_limit_minutes: int = 30
    activity_id: UUID

class QuizCreate(QuizBase):
    pass

class QuizResponse(QuizBase):
    id: UUID

    class Config:
        from_attributes = True

class QuizAttemptBase(BaseModel):
    score: Optional[float] = None
    time_taken_seconds: Optional[int] = None
    quiz_id: UUID
    student_id: UUID

class QuizAttemptCreate(QuizAttemptBase):
    pass

class QuizAttemptResponse(QuizAttemptBase):
    id: UUID
    completed_at: datetime

    class Config:
        from_attributes = True
