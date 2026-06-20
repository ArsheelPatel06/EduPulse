from fastapi import APIRouter
from typing import List
from models import AuditLog
from data.seed_data import MOCK_AUDIT_LOGS

router = APIRouter()

@router.get("/", response_model=List[AuditLog])
def get_audit_logs():
    return MOCK_AUDIT_LOGS

@router.post("/", response_model=AuditLog)
def create_audit_log(log: AuditLog):
    MOCK_AUDIT_LOGS.append(log.dict())
    return log
