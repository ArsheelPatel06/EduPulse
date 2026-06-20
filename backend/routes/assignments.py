from fastapi import APIRouter
from typing import List
from models import Assignment
from data.seed_data import MOCK_ASSIGNMENTS

router = APIRouter()

@router.get("/", response_model=List[Assignment])
def get_assignments():
    return MOCK_ASSIGNMENTS

@router.post("/", response_model=Assignment)
def create_assignment(assignment: Assignment):
    MOCK_ASSIGNMENTS.append(assignment.dict())
    return assignment
