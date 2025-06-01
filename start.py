import os
import sys
import logging
import traceback
import uvicorn
import time
from app.main import app
from app.config import get_settings
from app.models.llama_model import LlamaModel

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def get_port():
    """Get port from environment with detailed error handling"""
    try:
        # Log all environment variables for debugging
        logger.info("Environment variables:")
        for key, value in os.environ.items():
            logger.info(f"  {key}: {value!r}")
        
        # Get raw port value
        port_raw = os.environ.get("PORT", "8000")
        logger.info(f"Raw PORT value: {port_raw!r}")
        
        # Try to convert to integer
        try:
            port = int(port_raw)
            if port < 1 or port > 65535:
                logger.warning(f"Port {port} out of valid range, using default 8000")
                return 8000
            return port
        except ValueError:
            logger.warning(f"Invalid PORT value {port_raw!r}, using default 8000")
            return 8000
            
    except Exception as e:
        logger.error(f"Error getting port: {e}")
        return 8000

def main():
    try:
        # Add startup delay to ensure system is ready
        time.sleep(5)
        
        # Log Python version and system info
        logger.info(f"Python version: {sys.version}")
        logger.info(f"Current working directory: {os.getcwd()}")
        
        # Pre-load the model
        logger.info("Pre-loading LLM model...")
        settings = get_settings()
        logger.info(f"Model path: {settings.MODEL_PATH}")
        try:
            model = LlamaModel()
            logger.info("LLM model loaded successfully")
        except Exception as e:
            logger.error("Failed to load LLM model:")
            logger.error(traceback.format_exc())
            sys.exit(1)
        
        # Get port with proper error handling
        port = get_port()
        
        # Set environment variables
        os.environ["PORT"] = str(port)
        os.environ["HOST"] = "0.0.0.0"
        
        # Log startup information
        logger.info("Starting server with configuration:")
        logger.info(f"  PORT: {port}")
        logger.info(f"  HOST: 0.0.0.0")
        logger.info(f"  CWD: {os.getcwd()}")
        
        try:
            # Import app here to ensure environment is set
            logger.info("Application imported successfully")
        except Exception as e:
            logger.error("Failed to import application:")
            logger.error(traceback.format_exc())
            sys.exit(1)
        
        # Start server
        logger.info(f"Starting uvicorn on port {port}...")
        uvicorn.run(
            "app.main:app",
            host="0.0.0.0",
            port=port,
            workers=1,
            log_level="info",
            timeout_keep_alive=120,
            reload=False
        )
    except Exception as e:
        logger.error("Critical error during startup:")
        logger.error(traceback.format_exc())
        sys.exit(1)

if __name__ == "__main__":
    main() 