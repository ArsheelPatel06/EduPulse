import os

class Settings:
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://localhost/edupulse")

settings = Settings()
