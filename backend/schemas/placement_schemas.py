from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID

class PlacementProfileBase(BaseModel):
    target_industry: Optional[str] = None
    status: str = "Preparing"
    student_id: UUID

class PlacementProfileCreate(PlacementProfileBase):
    pass

class PlacementProfileResponse(PlacementProfileBase):
    id: UUID

    class Config:
        from_attributes = True

class PlacementScoreBase(BaseModel):
    aptitude: float = 0.0
    technical: float = 0.0
    communication: float = 0.0
    projects: float = 0.0
    readiness_percentage: float = 0.0
    student_id: UUID

class PlacementScoreCreate(PlacementScoreBase):
    pass

class PlacementScoreResponse(PlacementScoreBase):
    id: UUID

    class Config:
        from_attributes = True

class MockInterviewBase(BaseModel):
    date: str
    score: float
    feedback: str
    student_id: UUID
    teacher_id: Optional[UUID] = None

class MockInterviewCreate(MockInterviewBase):
    pass

class MockInterviewResponse(MockInterviewBase):
    id: UUID

    class Config:
        from_attributes = True
