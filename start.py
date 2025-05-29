import os
import sys
import uvicorn
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def get_port():
    """Get port from environment with detailed error handling"""
    try:
        # Try to get PORT from environment
        port_str = os.environ.get("PORT")
        if port_str is None:
            logger.warning("No PORT environment variable found, using default port 8000")
            return 8000
            
        # Try to convert to integer
        port = int(port_str)
        if port < 1 or port > 65535:
            logger.error(f"Invalid port number {port}, must be between 1 and 65535")
            return 8000
            
        logger.info(f"Using port {port} from environment")
        return port
        
    except ValueError as e:
        logger.error(f"Invalid PORT value '{port_str}': {e}")
        return 8000
    except Exception as e:
        logger.error(f"Unexpected error getting port: {e}")
        return 8000

def main():
    try:
        # Get port with proper error handling
        port = get_port()
        
        # Log all relevant information
        logger.info(f"Starting server with:")
        logger.info(f"- PORT: {port}")
        logger.info(f"- CWD: {os.getcwd()}")
        logger.info(f"- ENV: {dict(os.environ)}")
        
        # Start server
        uvicorn.run(
            "app.main:app",
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