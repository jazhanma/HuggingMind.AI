from pydantic import BaseModel
from functools import lru_cache
import os
from dotenv import load_dotenv

load_dotenv()

# Default to production path if in production environment
DEFAULT_MODEL_PATH = "/opt/render/project/src/models/model-q4_k_m.gguf" if os.getenv("PYTHON_ENV") == "production" else r"C:\Users\jaska\.llama\checkpoints\Llama-2-7b-chat\model-q4_k_m.gguf"

class Settings(BaseModel):
    # Model settings
    MODEL_PATH: str = os.getenv("MODEL_PATH", DEFAULT_MODEL_PATH)
    CONTEXT_LENGTH: int = int(os.getenv("CONTEXT_LENGTH", "2048"))
    GPU_LAYERS: int = int(os.getenv("GPU_LAYERS", "35"))  # Number of layers to offload to GPU
    THREADS: int = int(os.getenv("THREADS", "8"))  # Number of CPU threads
    
    # Generation settings
    MAX_TOKENS: int = int(os.getenv("MAX_TOKENS", "2048"))
    TEMPERATURE: float = float(os.getenv("TEMPERATURE", "0.7"))
    TOP_P: float = float(os.getenv("TOP_P", "0.95"))
    TOP_K: int = int(os.getenv("TOP_K", "40"))
    REPEAT_PENALTY: float = float(os.getenv("REPEAT_PENALTY", "1.1"))
    
    # Server settings
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # Email settings
    SENDGRID_API_KEY: str = os.getenv("SENDGRID_API_KEY", "")
    FROM_EMAIL: str = os.getenv("FROM_EMAIL", "noreply@huggingmind.fyi")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

@lru_cache()
def get_settings() -> Settings:
    return Settings() 