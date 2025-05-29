# Build stage
FROM python:3.10-slim as builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt .

# Create virtual environment and install dependencies
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Runtime stage
FROM python:3.10-slim

WORKDIR /app

# Install curl for health checks
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy only necessary application files
COPY ./app ./app
COPY Procfile .

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV HOST=0.0.0.0

# Health check with longer start period and using PORT env var
HEALTHCHECK --interval=10s --timeout=5s --start-period=60s --retries=5 \
    CMD curl -f "http://localhost:${PORT}/health" || exit 1

# Command to run the application
CMD uvicorn app.main:app --host ${HOST} --port ${PORT} --workers 1 --limit-concurrency 1 --timeout-keep-alive 75 --log-level info 