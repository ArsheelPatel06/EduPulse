from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class User(BaseModel):
    id: str
    name: str
    role: str
    email: str

class LoginRequest(BaseModel):
    email: str
    password: str
    role: str

class StudentProfile(BaseModel):
    id: str
    name: str
    level: int
    xp: int
    streak: int
    riskStatus: str
    attendance: float
    performance: float
    avatar: str

class Course(BaseModel):
    id: str
    title: str
    status: str
    description: Optional[str] = None
    tags: Optional[List[str]] = []

class Assignment(BaseModel):
    id: str
    title: str
    courseId: str
    dueDate: str
    type: str
    description: str
    xp: int

class AuditLog(BaseModel):
    id: str
    timestamp: str
    user: str
    role: str
    action: str
    resource: str

class AnalyticsScore(BaseModel):
    academic_score: float
    engagement_score: float
    risk_category: str
    risk_score: float
