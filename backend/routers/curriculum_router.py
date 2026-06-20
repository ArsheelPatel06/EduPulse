from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from uuid import UUID

from schemas import curriculum_schemas
from services import curriculum_service
from database import get_db

router = APIRouter(
    prefix="/curriculum",
    tags=["Curriculum Hierarchy"]
)

# Courses
@router.post("/courses", response_model=curriculum_schemas.CourseResponse)
def create_course(course: curriculum_schemas.CourseCreate, db: Session = Depends(get_db)):
    return curriculum_service.create_course(db=db, course=course)

@router.get("/courses", response_model=List[curriculum_schemas.CourseResponse])
def read_courses(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return curriculum_service.get_courses(db, skip=skip, limit=limit)

@router.get("/courses/{course_id}", response_model=curriculum_schemas.CourseResponse)
def read_course(course_id: UUID, db: Session = Depends(get_db)):
    return curriculum_service.get_course(db, course_id=course_id)

# Modules
@router.post("/modules", response_model=curriculum_schemas.ModuleResponse)
def create_module(module: curriculum_schemas.ModuleCreate, db: Session = Depends(get_db)):
    return curriculum_service.create_module(db=db, module=module)

@router.get("/courses/{course_id}/modules", response_model=List[curriculum_schemas.ModuleResponse])
def read_modules(course_id: UUID, db: Session = Depends(get_db)):
    return curriculum_service.get_modules(db, course_id=course_id)

# Topics
@router.post("/topics", response_model=curriculum_schemas.TopicResponse)
def create_topic(topic: curriculum_schemas.TopicCreate, db: Session = Depends(get_db)):
    return curriculum_service.create_topic(db=db, topic=topic)

@router.get("/modules/{module_id}/topics", response_model=List[curriculum_schemas.TopicResponse])
def read_topics(module_id: UUID, db: Session = Depends(get_db)):
    return curriculum_service.get_topics(db, module_id=module_id)

# Activities
@router.post("/activities", response_model=curriculum_schemas.ActivityResponse)
def create_activity(activity: curriculum_schemas.ActivityCreate, db: Session = Depends(get_db)):
    return curriculum_service.create_activity(db=db, activity=activity)

@router.get("/topics/{topic_id}/activities", response_model=List[curriculum_schemas.ActivityResponse])
def read_activities(topic_id: UUID, db: Session = Depends(get_db)):
    return curriculum_service.get_activities(db, topic_id=topic_id)
