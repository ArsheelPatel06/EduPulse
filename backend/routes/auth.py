from fastapi import APIRouter, HTTPException
from models import LoginRequest
from data.seed_data import MOCK_STUDENTS

router = APIRouter()

@router.post("/login")
def login(request: LoginRequest):
    # Mock login
    if request.role == "admin":
        return {"id": "A001", "name": "Admin User", "role": "admin", "token": "mock-jwt-admin"}
    elif request.role == "teacher":
        return {"id": "T001", "name": "Prof. Smith", "role": "teacher", "token": "mock-jwt-teacher"}
    else:
        # Default to student
        return {"id": MOCK_STUDENTS[0]["id"], "name": MOCK_STUDENTS[0]["name"], "role": "student", "token": "mock-jwt-student"}
