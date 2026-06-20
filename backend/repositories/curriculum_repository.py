from sqlalchemy.orm import Session
from uuid import UUID
import models
from schemas import curriculum_schemas

def get_courses(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Course).offset(skip).limit(limit).all()

def get_course(db: Session, course_id: UUID):
    return db.query(models.Course).filter(models.Course.id == course_id).first()

def create_course(db: Session, course: curriculum_schemas.CourseCreate):
    db_course = models.Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

def get_modules_for_course(db: Session, course_id: UUID):
    return db.query(models.Module).filter(models.Module.course_id == course_id).all()

def create_module(db: Session, module: curriculum_schemas.ModuleCreate):
    db_module = models.Module(**module.model_dump())
    db.add(db_module)
    db.commit()
    db.refresh(db_module)
    return db_module

def get_topics_for_module(db: Session, module_id: UUID):
    return db.query(models.Topic).filter(models.Topic.module_id == module_id).all()

def create_topic(db: Session, topic: curriculum_schemas.TopicCreate):
    db_topic = models.Topic(**topic.model_dump())
    db.add(db_topic)
    db.commit()
    db.refresh(db_topic)
    return db_topic

def get_activities_for_topic(db: Session, topic_id: UUID):
    return db.query(models.Activity).filter(models.Activity.topic_id == topic_id).all()

def create_activity(db: Session, activity: curriculum_schemas.ActivityCreate):
    db_activity = models.Activity(**activity.model_dump())
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity
