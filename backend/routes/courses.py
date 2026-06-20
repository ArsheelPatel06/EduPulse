from fastapi import APIRouter
from typing import List
from models import Course
from data.seed_data import MOCK_COURSES

router = APIRouter()

@router.get("/", response_model=List[Course])
def get_courses():
    return MOCK_COURSES

@router.post("/", response_model=Course)
def create_course(course: Course):
    MOCK_COURSES.append(course.dict())
    return course
