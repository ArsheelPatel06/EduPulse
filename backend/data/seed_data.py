MOCK_STUDENTS = [
    {
        "id": "S001",
        "name": "Arsheel Patel",
        "email": "arsheel@edupulse.edu",
        "role": "student",
        "level": 12,
        "xp": 12450,
        "streak": 14,
        "riskStatus": "Safe",
        "attendance": 92.5,
        "performance": 85.0,
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Arsheel"
    },
    {
        "id": "S002",
        "name": "Priya Sharma",
        "email": "priya@edupulse.edu",
        "role": "student",
        "level": 4,
        "xp": 3200,
        "streak": 2,
        "riskStatus": "Critical",
        "attendance": 61.0,
        "performance": 44.5,
        "avatar": "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    }
]

MOCK_COURSES = [
    {
        "id": "C_REACT1",
        "title": "React Fundamentals",
        "status": "published",
        "description": "Learn the basics of React",
        "tags": ["React", "Frontend"]
    }
]

MOCK_ASSIGNMENTS = [
    {
        "id": "A_REACT_1",
        "title": "Build a Todo App",
        "courseId": "C_REACT1",
        "dueDate": "2026-07-01",
        "type": "project",
        "description": "Use React hooks to build a todo app",
        "xp": 500
    }
]

MOCK_AUDIT_LOGS = [
    {
        "id": "L1",
        "timestamp": "2026-06-19T10:15:00Z",
        "user": "teacher@edu.com",
        "role": "teacher",
        "action": "Published Course",
        "resource": "React Fundamentals"
    }
]
