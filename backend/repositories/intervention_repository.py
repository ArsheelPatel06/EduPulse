from sqlalchemy.orm import Session
from uuid import UUID
import models
from schemas import intervention_schemas

def get_interventions(db: Session, skip: int = 0, limit: int = 100, status: str = None):
    query = db.query(models.Intervention)
    if status:
        query = query.filter(models.Intervention.status == status)
    return query.offset(skip).limit(limit).all()

def get_intervention(db: Session, intervention_id: UUID):
    return db.query(models.Intervention).filter(models.Intervention.id == intervention_id).first()

def create_intervention(db: Session, intervention: intervention_schemas.InterventionCreate, teacher_id: UUID = None):
    db_intervention = models.Intervention(**intervention.model_dump(), teacher_id=teacher_id)
    db.add(db_intervention)
    db.commit()
    db.refresh(db_intervention)
    return db_intervention

def add_action_to_intervention(db: Session, intervention_id: UUID, action: intervention_schemas.InterventionActionCreate):
    db_action = models.InterventionAction(**action.model_dump(), intervention_id=intervention_id)
    db.add(db_action)
    db.commit()
    db.refresh(db_action)
    return db_action

def add_followup_to_action(db: Session, followup: intervention_schemas.InterventionFollowupCreate, teacher_id: UUID):
    db_followup = models.InterventionFollowup(**followup.model_dump(), teacher_id=teacher_id)
    db.add(db_followup)
    db.commit()
    db.refresh(db_followup)
    return db_followup

def update_intervention_status(db: Session, intervention_id: UUID, status: str):
    db_intervention = get_intervention(db, intervention_id)
    if db_intervention:
        db_intervention.status = status
        db.commit()
        db.refresh(db_intervention)
    return db_intervention
