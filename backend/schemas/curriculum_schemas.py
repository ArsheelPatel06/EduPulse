from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "draft"
    semester_id: UUID
    teacher_id: Optional[UUID] = None

class CourseCreate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

class ModuleBase(BaseModel):
    title: str
    description: Optional[str] = None
    sort_order: int = 0
    course_id: UUID

class ModuleCreate(ModuleBase):
    pass

class ModuleResponse(ModuleBase):
    id: UUID

    class Config:
        from_attributes = True

class TopicBase(BaseModel):
    title: str
    content_text: Optional[str] = None
    sort_order: int = 0
    module_id: UUID

class TopicCreate(TopicBase):
    pass

class TopicResponse(TopicBase):
    id: UUID

    class Config:
        from_attributes = True

class ActivityBase(BaseModel):
    title: str
    activity_type: str
    xp_reward: int = 0
    sort_order: int = 0
    topic_id: UUID

class ActivityCreate(ActivityBase):
    pass

class ActivityResponse(ActivityBase):
    id: UUID

    class Config:
        from_attributes = True
