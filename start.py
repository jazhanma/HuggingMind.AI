import os
import sys
import logging
import traceback
import uvicorn
import time

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
        except ValueError:
            logger.warning(f"Invalid PORT value {port_raw!r}, using default 8000")
            return 8000
            
        # Validate port range
        if port < 1 or port > 65535:
            logger.warning(f"Port {port} out of valid range (1-65535), using default 8000")
            return 8000
            
        logger.info(f"Using port {port}")
        return port
        
    except Exception as e:
        logger.error(f"Unexpected error getting port: {e}")
        return 8000

def main():
    try:
        # Add startup delay to ensure system is ready
        time.sleep(2)
        
        # Log Python version and system info
        logger.info(f"Python version: {sys.version}")
        logger.info(f"Current working directory: {os.getcwd()}")
        
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
            from app.main import app
            logger.info("Application imported successfully")
        except Exception as e:
            logger.error("Failed to import application:")
            logger.error(traceback.format_exc())
            sys.exit(1)
        
        # Start server
        logger.info(f"Starting uvicorn on port {port}...")
        uvicorn.run(
            app,
            host="0.0.0.0",
            port=port,
            workers=1,
            limit_max_requests=1000,
            timeout_keep_alive=120,
            log_level="info"
        )
    except Exception as e:
        logger.error("Critical error during startup:")
        logger.error(traceback.format_exc())
        sys.exit(1)

if __name__ == "__main__":
    main() 