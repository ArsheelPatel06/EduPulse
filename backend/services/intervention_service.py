from sqlalchemy.orm import Session
from uuid import UUID
from schemas import intervention_schemas
from repositories import intervention_repository
from fastapi import HTTPException

def get_interventions(db: Session, skip: int = 0, limit: int = 100, status: str = None):
    return intervention_repository.get_interventions(db, skip, limit, status)

def get_intervention(db: Session, intervention_id: UUID):
    intervention = intervention_repository.get_intervention(db, intervention_id)
    if not intervention:
        raise HTTPException(status_code=404, detail="Intervention not found")
    return intervention

def create_intervention(db: Session, intervention: intervention_schemas.InterventionCreate, teacher_id: UUID = None):
    return intervention_repository.create_intervention(db, intervention, teacher_id)

def add_action(db: Session, intervention_id: UUID, action: intervention_schemas.InterventionActionCreate):
    # Verify intervention exists
    get_intervention(db, intervention_id)
    return intervention_repository.add_action_to_intervention(db, intervention_id, action)

def add_followup(db: Session, followup: intervention_schemas.InterventionFollowupCreate, teacher_id: UUID):
    # Verify action exists could be done here
    return intervention_repository.add_followup_to_action(db, followup, teacher_id)

def resolve_intervention(db: Session, intervention_id: UUID):
    intervention = get_intervention(db, intervention_id)
    return intervention_repository.update_intervention_status(db, intervention_id, "resolved")
