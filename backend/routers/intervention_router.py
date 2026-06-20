from fastapi import APIRouter, Depends, Header
from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID

from schemas import intervention_schemas
from services import intervention_service
from database import get_db

router = APIRouter(
    prefix="/interventions",
    tags=["Intervention Center"]
)

@router.get("/", response_model=List[intervention_schemas.InterventionResponse])
def get_interventions(skip: int = 0, limit: int = 100, status: Optional[str] = None, db: Session = Depends(get_db)):
    """
    Teacher/Admin Endpoint: Returns a list of interventions (can filter by status e.g., 'open', 'resolved').
    """
    return intervention_service.get_interventions(db, skip, limit, status)

@router.get("/{intervention_id}", response_model=intervention_schemas.InterventionResponse)
def get_intervention(intervention_id: UUID, db: Session = Depends(get_db)):
    """
    Returns full details for a single intervention, including action chains and followups.
    """
    return intervention_service.get_intervention(db, intervention_id)

@router.post("/", response_model=intervention_schemas.InterventionResponse)
def create_intervention(
    intervention: intervention_schemas.InterventionCreate, 
    teacher_id: UUID = Header(None, description="The UUID of the Teacher creating the intervention"),
    db: Session = Depends(get_db)
):
    """
    Teacher Endpoint: Manually creates an intervention for a high-risk student.
    Note: Analytics Engine also automatically creates interventions for Critical students.
    """
    return intervention_service.create_intervention(db, intervention, teacher_id)

@router.post("/{intervention_id}/actions", response_model=intervention_schemas.InterventionActionResponse)
def add_action_to_intervention(
    intervention_id: UUID,
    action: intervention_schemas.InterventionActionCreate,
    db: Session = Depends(get_db)
):
    """
    Teacher Endpoint: Adds an actionable step (e.g., 'Assign Tutor', 'Schedule Meeting') to an open intervention.
    """
    return intervention_service.add_action(db, intervention_id, action)

@router.post("/actions/{action_id}/followup", response_model=intervention_schemas.InterventionFollowupResponse)
def add_followup_to_action(
    followup: intervention_schemas.InterventionFollowupCreate,
    teacher_id: UUID = Header(None),
    db: Session = Depends(get_db)
):
    """
    Teacher Endpoint: Records a followup note on an action step (e.g., 'Meeting completed').
    """
    return intervention_service.add_followup(db, followup, teacher_id)

@router.patch("/{intervention_id}/resolve", response_model=intervention_schemas.InterventionResponse)
def resolve_intervention(intervention_id: UUID, db: Session = Depends(get_db)):
    """
    Teacher Endpoint: Marks an intervention as resolved.
    """
    return intervention_service.resolve_intervention(db, intervention_id)
