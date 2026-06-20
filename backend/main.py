import os
import time
import json
import logging
from datetime import datetime
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from prometheus_client import Gauge, Counter
from routers import user_router, curriculum_router, assessment_router, analytics_router, case_study_router, placement_router, intervention_router

app = FastAPI(title="EduPulse V3 API", version="3.0.0")

# Custom Business Metrics
ACTIVE_STUDENTS = Gauge('active_students', 'Number of active students')
ACTIVE_TEACHERS = Gauge('active_teachers', 'Number of active teachers')
ACTIVE_INTERVENTIONS = Gauge('active_interventions', 'Number of active interventions')
PLACEMENT_READINESS_AVERAGE = Gauge('placement_readiness_average', 'Average placement readiness score')
HIGH_RISK_STUDENTS = Gauge('high_risk_students', 'Number of high risk students')
CASE_STUDIES_SUBMITTED = Gauge('case_studies_submitted', 'Number of case studies submitted')
ASSIGNMENTS_COMPLETED = Gauge('assignments_completed', 'Number of assignments completed')

# Set some dummy metrics for demonstration
ACTIVE_STUDENTS.set(1250)
ACTIVE_TEACHERS.set(85)
ACTIVE_INTERVENTIONS.set(42)
PLACEMENT_READINESS_AVERAGE.set(84.5)
HIGH_RISK_STUDENTS.set(18)
CASE_STUDIES_SUBMITTED.set(342)
ASSIGNMENTS_COMPLETED.set(8900)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Setup JSON logger
logger = logging.getLogger("edupulse")
logger.setLevel(logging.INFO)
handler = logging.StreamHandler()
handler.setFormatter(logging.Formatter('%(message)s'))
logger.addHandler(handler)

# Vault Integration
def get_secret(key_name: str, vault_file: str):
    """Attempt to read secret from Vault injected file, fallback to OS env"""
    vault_path = f"/vault/secrets/{vault_file}"
    if os.path.exists(vault_path):
        try:
            with open(vault_path, 'r') as f:
                # Vault agent formats injected secrets (usually key=value or json based on template)
                # In this demo, assuming JSON format
                secrets = json.load(f)
                if key_name in secrets:
                    return secrets[key_name]
        except Exception as e:
            logger.error(json.dumps({"event": "vault_read_error", "error": str(e)}))
    return os.getenv(key_name)

# Initialize critical configuration via Vault
DATABASE_URL = get_secret("connection_url", "database")
JWT_SECRET = get_secret("jwt_secret", "auth")
GEMINI_API_KEY = get_secret("gemini_api_key", "ai")

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = int((time.time() - start_time) * 1000)
    
    log_data = {
        "event": "api_request",
        "method": request.method,
        "path": request.url.path,
        "status": response.status_code,
        "response_time": process_time,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        # We would typically extract user_id and role from JWT here
        "user_id": "anonymous", 
        "role": "guest"
    }
    logger.info(json.dumps(log_data))
    return response

def log_business_event(event_name: str, **kwargs):
    log_data = {
        "event": event_name,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        **kwargs
    }
    logger.info(json.dumps(log_data))

app.include_router(user_router.router)
app.include_router(curriculum_router.router)
app.include_router(assessment_router.router)
app.include_router(analytics_router.router)
app.include_router(case_study_router.router)
app.include_router(placement_router.router)
app.include_router(intervention_router.router)

@app.on_event("startup")
async def startup():
    Instrumentator().instrument(app).expose(app)

@app.get("/health")
def health_check():
    return {"status": "ok", "version": "3.0.0"}
