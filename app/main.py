from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import sys
import logging
import socket
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
    PORT = int(os.environ.get("PORT", 8000))
    HOST = os.environ.get("HOST", "0.0.0.0")
    logger.info(f"Configuring server with HOST={HOST} and PORT={PORT}")
except Exception as e:
    logger.error(f"Error parsing PORT or HOST: {e}")
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

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Initialize model (uses singleton pattern)
        model = LlamaModel()
        
        # Convert messages to list of dicts
        messages = [msg.dict() for msg in request.messages]
        
        # Generate response
        response = model.chat(
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
        "endpoints": {
            "/api/chat": "Chat with the model",
            "/api/keys": "API key management",
            "/": "This help message"
        }
    }

@app.get("/health")
async def health_check():
    try:
        # Try to create a socket with the configured host and port
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.bind((HOST, PORT))
        sock.close()
        logger.info(f"Health check: Successfully bound to {HOST}:{PORT}")
        return {"status": "healthy", "port": PORT, "host": HOST}
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        return {"status": "unhealthy", "error": str(e), "port": PORT, "host": HOST}

@app.on_event("startup")
async def on_startup():
    """Initialize application on startup"""
    try:
        logger.info("Starting application initialization...")
        logger.info(f"Python version: {sys.version}")
        logger.info(f"Current working directory: {os.getcwd()}")
        logger.info(f"Environment variables: {dict(os.environ)}")
        logger.info(f"Binding to HOST={HOST} PORT={PORT}")
        
        # Test socket binding
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.bind((HOST, PORT))
            sock.close()
            logger.info(f"Successfully tested socket binding to {HOST}:{PORT}")
        except Exception as e:
            logger.error(f"Failed to bind socket: {e}")
            raise
        
        # Initialize other components
        startup()
        
        logger.info("Application startup complete!")
        logger.info(f"Server should be accessible at http://{HOST}:{PORT}")
    except Exception as e:
        logger.error(f"Critical error during startup: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    import uvicorn
    logger.info(f"Running app directly with HOST={HOST} PORT={PORT}")
    uvicorn.run(
        app,
        host=HOST,
        port=PORT,
        log_level="info"
    ) 