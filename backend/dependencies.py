from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from database import get_db
from models import User
from core.security import SECRET_KEY, ALGORITHM

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> User:
    """Extracts JWT token, validates it, and returns the current user."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
        
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise credentials_exception
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    
    return user


# ==========================================
# Role-Based Access Control (RBAC) Guards
# ==========================================

def require_admin(current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions. Admin required.")
    return current_user

def require_teacher(current_user: User = Depends(get_current_user)):
    if current_user.role not in ["teacher", "admin"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions. Teacher required.")
    return current_user

def require_student(current_user: User = Depends(get_current_user)):
    # Any active user can act as a student (teachers/admins can view student data)
    return current_user


# ==========================================
# Matrix Specific Permission Guards
# ==========================================

def can_manage_curriculum(current_user: User = Depends(get_current_user)):
    """Teacher/Admin can create curriculum. Students cannot."""
    if current_user.role not in ["teacher", "admin"]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only teachers and admins can manage curriculum")
    return current_user

def can_manage_users(current_user: User = Depends(get_current_user)):
    """Only Admins can manage users."""
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Only admins can manage users")
    return current_user

def check_analytics_access(student_id: str, current_user: User = Depends(get_current_user)):
    """
    Analytics Matrix logic:
    - Student: Can only view their own stats.
    - Teacher: Can view stats of students in their classes (Note: Class-check logic would go here in service layer).
    - Admin: Can view any student's stats globally.
    """
    if current_user.role == "student" and str(current_user.student_profile.id) != student_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You can only view your own analytics")
    return current_user
