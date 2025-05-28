from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
import sys
from app.config import get_settings
from app.models.llama_model import LlamaModel
from app.api.routes import router as api_router
from app.api.api_keys import router as api_key_router
from app.startup import startup

settings = get_settings()

# Get port from environment variable with a default
try:
    PORT = int(os.environ.get("PORT", 8000))
    print(f"Using port: {PORT}")
except Exception as e:
    print(f"Error setting port: {e}")
    PORT = 8000
    print(f"Falling back to default port: {PORT}")

app = FastAPI(
    title="HuggingMind AI - LLaMA 2 Chat API",
    description="Local LLaMA 2 Chat API",
    version="1.0.0"
)

print(f"FastAPI app initialized with port {PORT}")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
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
    return {"status": "healthy"}

@app.on_event("startup")
async def on_startup():
    """Initialize application on startup"""
    try:
        print(f"Starting server on port {PORT}")
        print(f"Environment variables: {dict(os.environ)}")
        startup()
    except Exception as e:
        print(f"Error during startup: {e}")
        sys.exit(1)

if __name__ == "__main__":
    import uvicorn
    print(f"Running app directly with port {PORT}")
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=PORT,
        reload=True,
        log_level="info"
    ) 