from sqlalchemy.orm import Session
from uuid import UUID
import models
from schemas import user_schemas
from core.security import get_password_hash

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: user_schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(email=user.email, role=user.role, password_hash=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_student(db: Session, student_id: UUID):
    return db.query(models.Student).filter(models.Student.id == student_id).first()

def get_student_by_user_id(db: Session, user_id: UUID):
    return db.query(models.Student).filter(models.Student.user_id == user_id).first()

def get_students(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Student).offset(skip).limit(limit).all()

def create_student(db: Session, student: user_schemas.StudentCreate):
    # Create User
    db_user = create_user(db, user_schemas.UserCreate(
        email=student.email,
        password=student.password,
        role="student"
    ))
    
    # Create Student Profile
    db_student = models.Student(
        user_id=db_user.id,
        name=student.name,
        enrollment_no=student.enrollment_no,
        level=student.level,
        xp=student.xp,
        streak=student.streak,
        avatar_url=student.avatar_url,
        class_id=student.class_id
    )
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student
