from sqlalchemy.orm import Session
from uuid import UUID
from schemas import user_schemas
from repositories import user_repository
from fastapi import HTTPException

def get_student(db: Session, student_id: UUID):
    student = user_repository.get_student(db, student_id)
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")
    return student

def get_students(db: Session, skip: int = 0, limit: int = 100):
    return user_repository.get_students(db, skip=skip, limit=limit)

def create_student(db: Session, student: user_schemas.StudentCreate):
    db_user = user_repository.get_user_by_email(db, email=student.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    return user_repository.create_student(db=db, student=student)
