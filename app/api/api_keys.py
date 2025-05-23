from fastapi import APIRouter, HTTPException, status, Depends
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import secrets
import string
from app.models.database import get_db, APIKeyModel
from sqlalchemy.orm import Session

router = APIRouter()

class APIKey(BaseModel):
    key: str
    name: Optional[str] = None
    created_at: datetime
    last_used: Optional[datetime] = None
    is_active: bool = True

class APIKeyCreate(BaseModel):
    name: Optional[str] = Field(None, description="Optional name for the API key")

class APIKeyResponse(BaseModel):
    key: str
    name: Optional[str] = None
    created_at: datetime
    last_used: Optional[datetime] = None

def generate_api_key() -> str:
    """Generate a secure API key with prefix 'hm_'"""
    # Generate 32 random characters
    alphabet = string.ascii_letters + string.digits
    random_part = ''.join(secrets.choice(alphabet) for _ in range(32))
    return f"hm_{random_part}"

@router.post("/", response_model=APIKeyResponse)
async def create_api_key(key_create: APIKeyCreate, db: Session = Depends(get_db)):
    """Create a new API key"""
    new_key = generate_api_key()
    db_api_key = APIKeyModel(
        key=new_key,
        name=key_create.name,
        created_at=datetime.utcnow(),
        is_active=True
    )
    
    db.add(db_api_key)
    db.commit()
    db.refresh(db_api_key)
    
    return APIKeyResponse(
        key=new_key,
        name=db_api_key.name,
        created_at=db_api_key.created_at,
        last_used=db_api_key.last_used
    )

@router.get("/", response_model=List[APIKeyResponse])
async def list_api_keys(db: Session = Depends(get_db)):
    """List all active API keys"""
    db_keys = db.query(APIKeyModel).filter(APIKeyModel.is_active == True).all()
    return [
        APIKeyResponse(
            key=key.key,
            name=key.name,
            created_at=key.created_at,
            last_used=key.last_used
        ) for key in db_keys
    ]

@router.delete("/{key}")
async def revoke_api_key(key: str, db: Session = Depends(get_db)):
    """Revoke an API key"""
    db_key = db.query(APIKeyModel).filter(APIKeyModel.key == key).first()
    if not db_key:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="API key not found"
        )
    
    db_key.is_active = False
    db.commit()
    
    return {"status": "success", "message": "API key revoked"} 