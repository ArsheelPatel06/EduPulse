import uuid
from sqlalchemy import Column, String, Boolean, Integer, Numeric, Text, ForeignKey, Date, DateTime, func, Table
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from database import Base

# Association Table for Many-to-Many between Students and Parents
student_parents = Table(
    'student_parents',
    Base.metadata,
    Column('student_id', UUID(as_uuid=True), ForeignKey('students.id', ondelete="CASCADE"), primary_key=True),
    Column('parent_id', UUID(as_uuid=True), ForeignKey('parents.id', ondelete="CASCADE"), primary_key=True)
)

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False) # 'student', 'teacher', 'admin', 'parent'
    created_at = Column(DateTime, default=func.now())
    last_login = Column(DateTime)
    is_active = Column(Boolean, default=True)

class Department(Base):
    __tablename__ = "departments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())

class Program(Base):
    __tablename__ = "programs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id", ondelete="CASCADE"))
    name = Column(String(255), nullable=False)
    degree_type = Column(String(100))

class Semester(Base):
    __tablename__ = "semesters"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    program_id = Column(UUID(as_uuid=True), ForeignKey("programs.id", ondelete="CASCADE"))
    term_name = Column(String(100), nullable=False)
    start_date = Column(Date)
    end_date = Column(Date)

class Class(Base):
    __tablename__ = "classes"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    semester_id = Column(UUID(as_uuid=True), ForeignKey("semesters.id", ondelete="CASCADE"))
    name = Column(String(255), nullable=False)
    section = Column(String(50))

class Parent(Base):
    __tablename__ = "parents"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    name = Column(String(255), nullable=False)
    contact_number = Column(String(50))
    
    students = relationship("Student", secondary=student_parents, back_populates="parents")

class Student(Base):
    __tablename__ = "students"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    class_id = Column(UUID(as_uuid=True), ForeignKey("classes.id", ondelete="SET NULL"))
    parent_id = Column(UUID(as_uuid=True), ForeignKey("parents.id", ondelete="SET NULL"))
    name = Column(String(255), nullable=False)
    enrollment_no = Column(String(100), unique=True, nullable=False)
    avatar_url = Column(Text)
    level = Column(Integer, default=1)
    xp = Column(Integer, default=0)
    streak = Column(Integer, default=0)
    
    parents = relationship("Parent", secondary=student_parents, back_populates="students")

class Teacher(Base):
    __tablename__ = "teachers"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    department_id = Column(UUID(as_uuid=True), ForeignKey("departments.id", ondelete="SET NULL"))
    name = Column(String(255), nullable=False)

# Curriculum Hierarchy
class Course(Base):
    __tablename__ = "courses"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    teacher_id = Column(UUID(as_uuid=True), ForeignKey("teachers.id", ondelete="SET NULL"))
    semester_id = Column(UUID(as_uuid=True), ForeignKey("semesters.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(String(50), default="draft")
    created_at = Column(DateTime, default=func.now())

class Enrollment(Base):
    __tablename__ = "enrollments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"))
    enrolled_at = Column(DateTime, default=func.now())
    status = Column(String(50), default="active")

class Module(Base):
    __tablename__ = "modules"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    description = Column(Text)
    sort_order = Column(Integer, default=0)

class Topic(Base):
    __tablename__ = "topics"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    module_id = Column(UUID(as_uuid=True), ForeignKey("modules.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    content_text = Column(Text)
    sort_order = Column(Integer, default=0)

class Activity(Base):
    __tablename__ = "activities"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    topic_id = Column(UUID(as_uuid=True), ForeignKey("topics.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    activity_type = Column(String(50), nullable=False)
    xp_reward = Column(Integer, default=0)
    sort_order = Column(Integer, default=0)

# OBE
class ProgramOutcome(Base):
    __tablename__ = "program_outcomes"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    program_id = Column(UUID(as_uuid=True), ForeignKey("programs.id", ondelete="CASCADE"))
    code = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)

class CourseOutcome(Base):
    __tablename__ = "course_outcomes"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"))
    code = Column(String(50), nullable=False)
    description = Column(Text, nullable=False)

class ActivityOutcome(Base):
    __tablename__ = "activity_outcomes"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    activity_id = Column(UUID(as_uuid=True), ForeignKey("activities.id", ondelete="CASCADE"))
    course_outcome_id = Column(UUID(as_uuid=True), ForeignKey("course_outcomes.id", ondelete="CASCADE"))

# Assessments
class Assignment(Base):
    __tablename__ = "assignments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    activity_id = Column(UUID(as_uuid=True), ForeignKey("activities.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    description = Column(Text)
    due_date = Column(DateTime)
    max_score = Column(Integer, default=100)

class AssignmentSubmission(Base):
    __tablename__ = "assignment_submissions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    assignment_id = Column(UUID(as_uuid=True), ForeignKey("assignments.id", ondelete="CASCADE"))
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    submission_url = Column(Text)
    score = Column(Numeric(5, 2))
    feedback = Column(Text)
    submitted_at = Column(DateTime, default=func.now())

class Quiz(Base):
    __tablename__ = "quizzes"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    activity_id = Column(UUID(as_uuid=True), ForeignKey("activities.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    difficulty = Column(String(50))
    time_limit_minutes = Column(Integer, default=30)

class QuizAttempt(Base):
    __tablename__ = "quiz_attempts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    quiz_id = Column(UUID(as_uuid=True), ForeignKey("quizzes.id", ondelete="CASCADE"))
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    score = Column(Numeric(5, 2))
    time_taken_seconds = Column(Integer)
    completed_at = Column(DateTime, default=func.now())

class Flashcard(Base):
    __tablename__ = "flashcards"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    activity_id = Column(UUID(as_uuid=True), ForeignKey("activities.id", ondelete="CASCADE"))
    front = Column(Text, nullable=False)
    back = Column(Text, nullable=False)

class Attendance(Base):
    __tablename__ = "attendance"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    course_id = Column(UUID(as_uuid=True), ForeignKey("courses.id", ondelete="CASCADE"))
    date = Column(Date, nullable=False)
    status = Column(String(50))
    recorded_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    recorded_at = Column(DateTime, default=func.now())

# Case Studies
class CaseStudy(Base):
    __tablename__ = "case_studies"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    activity_id = Column(UUID(as_uuid=True), ForeignKey("activities.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    difficulty = Column(String(50))
    industry = Column(String(100))
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))

class CaseSubmission(Base):
    __tablename__ = "case_submissions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    case_id = Column(UUID(as_uuid=True), ForeignKey("case_studies.id", ondelete="CASCADE"))
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    submission_text = Column(Text)
    score = Column(Numeric(5, 2))
    rubric_feedback = Column(Text)
    submitted_at = Column(DateTime, default=func.now())

# Placement & Readiness
class PlacementProfile(Base):
    __tablename__ = "placement_profiles"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    target_industry = Column(String(100))
    status = Column(String(50), default="Preparing")

class PlacementScore(Base):
    __tablename__ = "placement_scores"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    aptitude = Column(Numeric(5, 2), default=0)
    technical = Column(Numeric(5, 2), default=0)
    communication = Column(Numeric(5, 2), default=0)
    projects = Column(Numeric(5, 2), default=0)
    readiness_percentage = Column(Numeric(5, 2), default=0)

class MockInterview(Base):
    __tablename__ = "mock_interviews"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    teacher_id = Column(UUID(as_uuid=True), ForeignKey("teachers.id", ondelete="SET NULL"))
    date = Column(Date)
    score = Column(Numeric(5, 2))
    feedback = Column(Text)

class AptitudeTest(Base):
    __tablename__ = "aptitude_tests"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    score = Column(Numeric(5, 2))
    date = Column(Date)

# Interventions
class Intervention(Base):
    __tablename__ = "interventions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    teacher_id = Column(UUID(as_uuid=True), ForeignKey("teachers.id", ondelete="SET NULL"))
    reason = Column(Text, nullable=False)
    status = Column(String(50), default="open")
    created_at = Column(DateTime, default=func.now())

class InterventionAction(Base):
    __tablename__ = "intervention_actions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    intervention_id = Column(UUID(as_uuid=True), ForeignKey("interventions.id", ondelete="CASCADE"))
    action_type = Column(String(100), nullable=False)
    description = Column(Text)
    recommended_by_ai = Column(Boolean, default=False)
    assigned_date = Column(DateTime, default=func.now())

class InterventionFollowup(Base):
    __tablename__ = "intervention_followups"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    action_id = Column(UUID(as_uuid=True), ForeignKey("intervention_actions.id", ondelete="CASCADE"))
    teacher_id = Column(UUID(as_uuid=True), ForeignKey("teachers.id", ondelete="SET NULL"))
    notes = Column(Text)
    status = Column(String(50), default="pending")
    followup_date = Column(DateTime)

# Progress & Analytics
class StudentProgress(Base):
    __tablename__ = "student_progress"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    topic_id = Column(UUID(as_uuid=True), ForeignKey("topics.id", ondelete="CASCADE"))
    completion_percentage = Column(Numeric(5, 2), default=0)

class Analytics(Base):
    __tablename__ = "analytics"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    academic_score = Column(Numeric(5, 2), default=0)
    engagement_score = Column(Numeric(5, 2), default=0)
    risk_score = Column(Integer, default=0)
    risk_category = Column(String(50), default="Low Risk")
    computed_at = Column(DateTime, default=func.now())

class Event(Base):
    __tablename__ = "events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    student_id = Column(UUID(as_uuid=True), ForeignKey("students.id", ondelete="CASCADE"))
    title = Column(String(255), nullable=False)
    event_type = Column(String(100))
    event_date = Column(DateTime, nullable=False)

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    text = Column(Text, nullable=False)
    type = Column(String(50))
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    actor_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="SET NULL"))
    role = Column(String(50))
    action = Column(String(255), nullable=False)
    resource = Column(String(255), nullable=False)
    ip_address = Column(String(45))
    created_at = Column(DateTime, default=func.now())

# AI Tracking
class AiConversation(Base):
    __tablename__ = "ai_conversations"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    role = Column(String(50))
    created_at = Column(DateTime, default=func.now())

class AiMessage(Base):
    __tablename__ = "ai_messages"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    conversation_id = Column(UUID(as_uuid=True), ForeignKey("ai_conversations.id", ondelete="CASCADE"))
    sender = Column(String(50), nullable=False)
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=func.now())

class AiUsageLog(Base):
    __tablename__ = "ai_usage_logs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    prompt_tokens = Column(Integer)
    response_tokens = Column(Integer)
    model = Column(String(100))
    cost = Column(Numeric(10, 6))
    created_at = Column(DateTime, default=func.now())
