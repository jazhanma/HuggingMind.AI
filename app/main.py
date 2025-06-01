from fastapi import FastAPI, HTTPException, BackgroundTasks, Response
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
import time
import psutil
import gc

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

settings = get_settings()

# Get port from environment variable with a default
PORT = None
try:
    port_str = os.environ.get("PORT")
    if port_str:
        PORT = int(port_str)
        logger.info(f"Using PORT from environment: {PORT}")
    else:
        PORT = 8000
        logger.info(f"No PORT environment variable found, using default: {PORT}")
except ValueError as e:
    logger.error(f"Invalid PORT value: {port_str}")
    sys.exit(1)

HOST = "0.0.0.0"  # Always bind to 0.0.0.0 for container deployments
logger.info(f"Configuring server with HOST={HOST} and PORT={PORT}")

# Application state
server_started = False
startup_time = None

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

# Track application start time
start_time = time.time()

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
        # Check system resources
        memory = psutil.virtual_memory()
        if memory.percent > 90:  # If memory usage is above 90%
            logger.warning(f"High memory usage: {memory.percent}%")
            gc.collect()
        
        # Initialize model (uses singleton pattern)
        model = LlamaModel()
        
        # Convert messages to list of dicts
        messages = [msg.dict() for msg in request.messages]
        
        # Generate response with timeout
        try:
            response = await asyncio.wait_for(
                model.chat(
                    messages=messages,
                    max_tokens=request.max_tokens,
                    temperature=request.temperature,
                    top_p=request.top_p,
                    top_k=request.top_k,
                    repeat_penalty=request.repeat_penalty
                ),
                timeout=45.0  # 45 second timeout
            )
            return ChatResponse(response=response)
        except asyncio.TimeoutError:
            logger.error("Chat request timed out")
            raise HTTPException(
                status_code=504,
                detail="Request timed out. Please try again."
            )
        
    except Exception as e:
        logger.error(f"Error in chat endpoint: {e}", exc_info=True)
        if "out of memory" in str(e).lower():
            # Try to recover from OOM
            gc.collect()
            raise HTTPException(
                status_code=503,
                detail="Server is temporarily out of resources. Please try again in a moment."
            )
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.get("/")
async def root():
    model = LlamaModel()
    return {
        "name": "HuggingMind AI - LLaMA 2 Chat API",
        "version": "1.0.0",
        "model": "LLaMA 2 7B Chat",
        "model_status": "initialized" if model._initialized else "initializing",
        "endpoints": {
            "/api/chat": "Chat with the model",
            "/api/keys": "API key management",
            "/": "This help message"
        }
    }

@app.get("/health")
async def health_check():
    """Enhanced health check endpoint"""
    try:
        # Get system metrics
        memory = psutil.virtual_memory()
        cpu_percent = psutil.cpu_percent()
        
        # Get model status
        model = LlamaModel()
        model_status = "initialized" if model._initialized else "initializing"
        if model._last_error:
            model_status = f"error: {model._last_error}"
        
        uptime = int(time.time() - start_time)
        
        # Check if system is healthy
        is_healthy = (
            memory.percent < 95 and  # Memory usage below 95%
            cpu_percent < 95 and    # CPU usage below 95%
            model._initialized      # Model is initialized
        )
        
        response = {
            "status": "healthy" if is_healthy else "unhealthy",
            "uptime_seconds": uptime,
            "port": os.environ.get("PORT", "8000"),
            "memory_usage": f"{memory.percent}%",
            "cpu_usage": f"{cpu_percent}%",
            "model_status": model_status,
            "initialization_attempts": model._initialization_attempts
        }
        
        if not is_healthy:
            raise HTTPException(status_code=503, detail=response)
        
        return response
        
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(
            status_code=503,
            detail=str(e)
        )

@app.get("/health/ready")
async def readiness_check(response: Response):
    """Full health check that includes model status"""
    global server_started
    try:
        model = LlamaModel()
        
        if not server_started:
            response.status_code = 503
            return {
                "status": "starting",
                "details": {
                    "server": "initializing",
                    "model": "not started",
                    "port": PORT,
                    "host": HOST,
                    "uptime": "0s"
                }
            }
        
        is_ready = model._initialized
        if not is_ready:
            response.status_code = 503
            return {
                "status": "initializing",
                "details": {
                    "server": "running",
                    "model": "initializing",
                    "port": PORT,
                    "host": HOST,
                    "pid": os.getpid(),
                    "cwd": os.getcwd(),
                    "uptime": f"{(asyncio.get_event_loop().time() - startup_time):.1f}s"
                }
            }
        
        return {
            "status": "ready",
            "details": {
                "server": "running",
                "model": "initialized",
                "port": PORT,
                "host": HOST,
                "pid": os.getpid(),
                "cwd": os.getcwd(),
                "uptime": f"{(asyncio.get_event_loop().time() - startup_time):.1f}s"
            }
        }
    except Exception as e:
        logger.error(f"Readiness check error: {str(e)}")
        response.status_code = 503
        return {
            "status": "error",
            "details": {
                "error": str(e),
                "server": "error",
                "model": "error"
            }
        }

async def initialize_model():
    """Initialize the model in the background"""
    try:
        logger.info("Starting model initialization in background...")
        model = LlamaModel()
        await model.initialize()
        logger.info("Model initialization complete!")
    except Exception as e:
        logger.error(f"Failed to initialize model: {e}", exc_info=True)
        raise

@app.on_event("startup")
async def on_startup():
    """Initialize application on startup"""
    global server_started, startup_time
    try:
        logger.info("Starting application initialization...")
        logger.info(f"Python version: {sys.version}")
        logger.info(f"Process ID: {os.getpid()}")
        logger.info(f"Current working directory: {os.getcwd()}")
        
        # Record startup time
        startup_time = asyncio.get_event_loop().time()
        
        # Mark server as started
        server_started = True
        logger.info("Server marked as started")
        
        # Start model initialization in the background
        asyncio.create_task(initialize_model())
        
        logger.info("Application startup complete! Model initialization continuing in background...")
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
        log_level="info",
        workers=1,
        limit_concurrency=1,
        timeout_keep_alive=75
    ) 