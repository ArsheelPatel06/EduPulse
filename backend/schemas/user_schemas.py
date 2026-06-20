from pydantic import BaseModel, EmailStr
from typing import Optional, List
from uuid import UUID
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    role: str

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: UUID
    is_active: bool
    created_at: datetime
    last_login: Optional[datetime] = None

    class Config:
        from_attributes = True

class StudentBase(BaseModel):
    name: str
    enrollment_no: str
    level: int = 1
    xp: int = 0
    streak: int = 0
    avatar_url: Optional[str] = None
    class_id: Optional[UUID] = None

class StudentCreate(StudentBase):
    email: EmailStr
    password: str

class StudentResponse(StudentBase):
    id: UUID
    user_id: UUID

    class Config:
        from_attributes = True
