from app.models.database import init_db

def startup():
    """Initialize application dependencies"""
    # Initialize database and create tables
    init_db() 