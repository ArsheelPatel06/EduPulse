from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class InterventionFollowupBase(BaseModel):
    notes: str
    status: str
    followup_date: datetime

class InterventionFollowupCreate(InterventionFollowupBase):
    action_id: UUID

class InterventionFollowupResponse(InterventionFollowupBase):
    id: UUID
    teacher_id: Optional[UUID] = None

    class Config:
        from_attributes = True

class InterventionActionBase(BaseModel):
    action_type: str
    description: str

class InterventionActionCreate(InterventionActionBase):
    pass

class InterventionActionResponse(InterventionActionBase):
    id: UUID
    intervention_id: UUID
    assigned_date: datetime
    followups: List[InterventionFollowupResponse] = []

    class Config:
        from_attributes = True

class InterventionBase(BaseModel):
    reason: str
    status: str = "open"
    student_id: UUID

class InterventionCreate(InterventionBase):
    pass

class InterventionResponse(InterventionBase):
    id: UUID
    teacher_id: Optional[UUID] = None
    created_at: datetime
    actions: List[InterventionActionResponse] = []

    class Config:
        from_attributes = True
