from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class CaseStudyBase(BaseModel):
    title: str
    description: str
    difficulty: Optional[str] = None
    industry: Optional[str] = None
    activity_id: UUID

class CaseStudyCreate(CaseStudyBase):
    pass

class CaseStudyResponse(CaseStudyBase):
    id: UUID
    created_by: Optional[UUID] = None

    class Config:
        from_attributes = True

class CaseSubmissionBase(BaseModel):
    submission_text: Optional[str] = None
    score: Optional[float] = None
    rubric_feedback: Optional[str] = None
    case_id: UUID

class CaseSubmissionCreate(CaseSubmissionBase):
    pass

class CaseSubmissionResponse(CaseSubmissionBase):
    id: UUID
    student_id: UUID
    submitted_at: datetime

    class Config:
        from_attributes = True

class CaseEvaluation(BaseModel):
    score: float
    rubric_feedback: str
