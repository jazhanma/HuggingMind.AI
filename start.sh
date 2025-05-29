#!/bin/bash

# Set default port if not provided
export PORT="${PORT:-8000}"

# Print debug information
echo "Starting server with PORT=$PORT"

# Start uvicorn with the correct port
exec uvicorn app.main:app --host 0.0.0.0 --port "$PORT" --workers 1 --limit-concurrency 1 --timeout-keep-alive 75 --log-level info 