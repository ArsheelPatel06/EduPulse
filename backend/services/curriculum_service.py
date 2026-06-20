from sqlalchemy.orm import Session
from uuid import UUID
from schemas import curriculum_schemas
from repositories import curriculum_repository
from fastapi import HTTPException

def get_courses(db: Session, skip: int = 0, limit: int = 100):
    return curriculum_repository.get_courses(db, skip=skip, limit=limit)

def get_course(db: Session, course_id: UUID):
    course = curriculum_repository.get_course(db, course_id)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

def create_course(db: Session, course: curriculum_schemas.CourseCreate):
    return curriculum_repository.create_course(db=db, course=course)

def get_modules(db: Session, course_id: UUID):
    return curriculum_repository.get_modules_for_course(db, course_id)

def create_module(db: Session, module: curriculum_schemas.ModuleCreate):
    return curriculum_repository.create_module(db, module)

def get_topics(db: Session, module_id: UUID):
    return curriculum_repository.get_topics_for_module(db, module_id)

def create_topic(db: Session, topic: curriculum_schemas.TopicCreate):
    return curriculum_repository.create_topic(db, topic)

def get_activities(db: Session, topic_id: UUID):
    return curriculum_repository.get_activities_for_topic(db, topic_id)

def create_activity(db: Session, activity: curriculum_schemas.ActivityCreate):
    return curriculum_repository.create_activity(db, activity)
