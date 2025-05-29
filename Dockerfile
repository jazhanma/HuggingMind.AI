# Build stage
FROM python:3.10-slim as builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt .

# Create virtual environment and install dependencies
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Download smaller model variant
RUN mkdir -p /app/models && \
    curl -L https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q2_K.gguf \
    -o /app/models/model.gguf

# Runtime stage
FROM python:3.10-slim

WORKDIR /app

# Install runtime dependencies and clean up in one layer
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy model from builder
COPY --from=builder /app/models /app/models

# Copy application files
COPY ./app ./app
COPY start.py .

# Set environment variables
ENV PORT=8000 \
    HOST=0.0.0.0 \
    PYTHONUNBUFFERED=1 \
    MODEL_PATH=/app/models/model.gguf

# Health check
HEALTHCHECK --interval=60s --timeout=30s --start-period=300s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# Start the application
CMD ["python", "start.py"] 