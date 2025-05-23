from fastapi import APIRouter, HTTPException, status, Depends, Header, UploadFile, File
from pydantic import BaseModel, Field
from typing import Optional, Dict, Any, List
from app.models.llama_model import LlamaModel
from app.api.api_keys import router as api_key_router
from app.models.database import get_db, APIKeyModel
from sqlalchemy.orm import Session
from datetime import datetime
import os
import shutil

router = APIRouter()
model = LlamaModel()

# Include API key routes
router.include_router(api_key_router, prefix="/keys", tags=["api-keys"])

# Create uploads directory if it doesn't exist
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

class FileResponse(BaseModel):
    filename: str
    size: int
    upload_time: datetime
    file_type: str

@router.post("/upload", response_model=FileResponse)
async def upload_file(file: UploadFile = File(...)):
    """Upload a file"""
    try:
        if not file or not file.filename:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="No file was uploaded"
            )

        # Validate file type
        allowed_extensions = ['.pdf', '.txt', '.csv', '.docx']
        file_extension = os.path.splitext(file.filename)[1].lower()
        
        if not file_extension:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="File has no extension"
            )
        
        if file_extension not in allowed_extensions:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail=f"File type '{file_extension}' not allowed. Allowed types: {', '.join(allowed_extensions)}"
            )
        
        # Generate a safe filename
        safe_filename = f"{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, safe_filename)
        
        # Save the file
        try:
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to save file: {str(e)}"
            )
        
        # Get file size
        file_size = os.path.getsize(file_path)
        
        return FileResponse(
            filename=file.filename,
            size=file_size,
            upload_time=datetime.utcnow(),
            file_type=file.content_type or file_extension[1:]  # Remove the dot from extension
        )
    
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload file: {str(e)}"
        )
    finally:
        if file and hasattr(file, 'file') and file.file:
            try:
                await file.file.close()
            except:
                pass  # Ignore errors during file closing

@router.get("/uploads", response_model=List[FileResponse])
async def list_uploads():
    """List all uploaded files"""
    try:
        files = []
        for filename in os.listdir(UPLOAD_DIR):
            file_path = os.path.join(UPLOAD_DIR, filename)
            if os.path.isfile(file_path):
                # Get file stats
                stats = os.stat(file_path)
                files.append(FileResponse(
                    filename=filename,
                    size=stats.st_size,
                    upload_time=datetime.fromtimestamp(stats.st_mtime),
                    file_type=os.path.splitext(filename)[1][1:]  # Remove the dot from extension
                ))
        return files
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to list uploads: {str(e)}"
        )

async def verify_api_key(api_key: str = Header(..., alias="Authorization"), db: Session = Depends(get_db)):
    """Verify API key and update last used timestamp"""
    if not api_key.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication scheme"
        )
    
    key = api_key.split(" ")[1]
    
    # Accept test-key for development
    if key == "test-key":
        return APIKeyModel(
            key="test-key",
            name="Test Key",
            created_at=datetime.utcnow(),
            is_active=True
        )
    
    db_key = db.query(APIKeyModel).filter(
        APIKeyModel.key == key,
        APIKeyModel.is_active == True
    ).first()
    
    if not db_key:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key"
        )
    
    # Update last used timestamp
    db_key.last_used = datetime.utcnow()
    db.commit()
    
    return db_key

class ChatRequest(BaseModel):
    prompt: str = Field(..., description="The input prompt to send to the model")
    max_tokens: Optional[int] = Field(None, description="Maximum number of tokens to generate")
    temperature: Optional[float] = Field(None, description="Sampling temperature (0.0 to 1.0)")
    top_p: Optional[float] = Field(None, description="Nucleus sampling parameter")
    top_k: Optional[int] = Field(None, description="Top-k sampling parameter")

class ChatResponse(BaseModel):
    text: str
    usage: Dict[str, int]

@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, api_key: APIKeyModel = Depends(verify_api_key)):
    """
    Chat with the LLaMA model.
    """
    try:
        response = model.generate_response(
            prompt=request.prompt,
            max_tokens=request.max_tokens,
            temperature=request.temperature,
            top_p=request.top_p,
            top_k=request.top_k
        )
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error during chat generation: {str(e)}"
        )

@router.get("/health")
async def health_check():
    """
    Check if the model is loaded and ready.
    """
    return {
        "status": "healthy",
        "model": "LLaMA 2 7B Chat",
        "quantization": "4-bit" if model._model is not None else None
    } 