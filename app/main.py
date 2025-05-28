from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import sys
import logging
import asyncio
from app.config import get_settings
from app.models.llama_model import LlamaModel
from app.api.routes import router as api_router
from app.api.api_keys import router as api_key_router
from app.startup import startup

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

settings = get_settings()

# Get port from environment variable with a default
try:
    PORT = int(os.environ.get("PORT", "8000"))
    HOST = "0.0.0.0"  # Always bind to 0.0.0.0 for container deployments
    logger.info(f"Configuring server with HOST={HOST} and PORT={PORT}")
except Exception as e:
    logger.error(f"Error parsing PORT: {e}")
    sys.exit(1)

logger.info(f"Starting application with HOST={HOST} PORT={PORT}")
logger.info(f"Current working directory: {os.getcwd()}")
logger.info(f"Environment variables: {dict(os.environ)}")

app = FastAPI(
    title="HuggingMind AI - LLaMA 2 Chat API",
    description="Local LLaMA 2 Chat API",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variable to track model initialization
model_initialized = False
model_instance = None

# Include API routes
app.include_router(api_router, prefix="/api")
app.include_router(api_key_router, prefix="/api/keys")

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    max_tokens: Optional[int] = None
    temperature: Optional[float] = None
    top_p: Optional[float] = None
    top_k: Optional[int] = None
    repeat_penalty: Optional[float] = None

class ChatResponse(BaseModel):
    response: str

async def initialize_model_async():
    """Initialize the model in the background"""
    global model_initialized, model_instance
    try:
        logger.info("Starting model initialization in background...")
        model_instance = LlamaModel()
        model_initialized = True
        logger.info("Model initialization complete!")
    except Exception as e:
        logger.error(f"Failed to initialize model: {e}")
        model_initialized = False
        raise

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    global model_initialized, model_instance
    
    if not model_initialized:
        raise HTTPException(status_code=503, detail="Model is still initializing. Please try again in a few minutes.")
    
    try:
        # Convert messages to list of dicts
        messages = [msg.dict() for msg in request.messages]
        
        # Generate response
        response = model_instance.chat(
            messages=messages,
            max_tokens=request.max_tokens,
            temperature=request.temperature,
            top_p=request.top_p,
            top_k=request.top_k,
            repeat_penalty=request.repeat_penalty
        )
        
        return ChatResponse(response=response)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    return {
        "name": "HuggingMind AI - LLaMA 2 Chat API",
        "version": "1.0.0",
        "model": "LLaMA 2 7B Chat",
        "model_status": "initialized" if model_initialized else "initializing",
        "endpoints": {
            "/api/chat": "Chat with the model",
            "/api/keys": "API key management",
            "/": "This help message"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "port": PORT,
        "host": HOST,
        "pid": os.getpid(),
        "cwd": os.getcwd(),
        "model_status": "initialized" if model_initialized else "initializing"
    }

@app.on_event("startup")
async def on_startup():
    """Initialize application on startup"""
    try:
        logger.info("Starting application initialization...")
        logger.info(f"Python version: {sys.version}")
        logger.info(f"Process ID: {os.getpid()}")
        logger.info(f"Current working directory: {os.getcwd()}")
        
        # Start model initialization in the background
        asyncio.create_task(initialize_model_async())
        
        logger.info("Application startup complete! Model initialization continuing in background...")
        logger.info(f"Server should be accessible at http://{HOST}:{PORT}")
    except Exception as e:
        logger.error(f"Critical error during startup: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    import uvicorn
    logger.info(f"Running app directly with HOST={HOST} PORT={PORT}")
    uvicorn.run(
        "app.main:app",
        host=HOST,
        port=PORT,
        log_level="info"
    ) 