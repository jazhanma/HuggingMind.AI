from app.models.database import init_db

def init():
    """Initialize the database."""
    init_db()

if __name__ == "__main__":
    init() 