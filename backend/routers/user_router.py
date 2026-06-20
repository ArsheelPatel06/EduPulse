from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from schemas import user_schemas
from services import user_service
from database import get_db

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)

@router.post("/", response_model=user_schemas.StudentResponse)
def create_student(student: user_schemas.StudentCreate, db: Session = Depends(get_db)):
    return user_service.create_student(db=db, student=student)

@router.get("/", response_model=List[user_schemas.StudentResponse])
def read_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return user_service.get_students(db, skip=skip, limit=limit)

@router.get("/{student_id}", response_model=user_schemas.StudentResponse)
def read_student(student_id: UUID, db: Session = Depends(get_db)):
    return user_service.get_student(db, student_id=student_id)
