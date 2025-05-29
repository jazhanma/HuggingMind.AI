import os
import sys
import logging
from app.main import app
import uvicorn

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
        port_raw = os.environ.get("PORT")
        logger.info(f"Raw PORT value: {port_raw!r}")
        
        # If no port specified, use default
        if not port_raw:
            logger.info("No PORT environment variable found, using default port 8000")
            return 8000
        
        # Try to convert to integer
        try:
            port = int(port_raw)
        except ValueError:
            logger.error(f"Invalid PORT value {port_raw!r}, using default 8000")
            return 8000
            
        # Validate port range
        if port < 1 or port > 65535:
            logger.error(f"Port {port} out of valid range (1-65535), using default 8000")
            return 8000
            
        logger.info(f"Using port {port}")
        return port
        
    except Exception as e:
        logger.error(f"Unexpected error getting port: {e}", exc_info=True)
        return 8000

def main():
    try:
        # Get port with proper error handling
        port = get_port()
        
        # Log startup information
        logger.info("Starting server with configuration:")
        logger.info(f"  PORT: {port}")
        logger.info(f"  CWD: {os.getcwd()}")
        logger.info(f"  Python: {sys.version}")
        
        # Start server
        uvicorn.run(
            app,
            host="0.0.0.0",
            port=port,
            workers=1,
            limit_concurrency=1,
            timeout_keep_alive=75,
            log_level="info"
        )
    except Exception as e:
        logger.error(f"Error starting server: {e}", exc_info=True)
        sys.exit(1)

if __name__ == "__main__":
    main() 