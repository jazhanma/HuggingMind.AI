# Build stage
FROM python:3.10-slim as builder

WORKDIR /app

# Install build dependencies and clean up in one layer
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/apt/*

# Copy requirements and install dependencies
COPY requirements.txt .

# Create virtual environment and install dependencies
RUN python -m venv /opt/venv \
    && . /opt/venv/bin/activate \
    && pip install --no-cache-dir -r requirements.txt \
    && find /opt/venv -type d -name "__pycache__" -exec rm -r {} + \
    && find /opt/venv -type d -name "*.dist-info" -exec rm -r {} + \
    && find /opt/venv -type d -name "*.egg-info" -exec rm -r {} +

# Download smaller model variant and clean up
RUN mkdir -p /app/models \
    && curl -L https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q2_K.gguf \
    -o /app/models/model.gguf \
    && rm -rf /root/.cache/*

# Runtime stage
FROM python:3.10-slim

WORKDIR /app

# Install runtime dependencies and clean up in one layer
RUN apt-get update && apt-get install -y \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/apt/*

# Copy virtual environment from builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Copy model and application files
COPY --from=builder /app/models /app/models
COPY ./app ./app
COPY start.py .

# Set environment variables
ENV PORT=8000 \
    HOST=0.0.0.0 \
    PYTHONUNBUFFERED=1 \
    MODEL_PATH=/app/models/model.gguf \
    PYTHONDONTWRITEBYTECODE=1

# Health check
HEALTHCHECK --interval=60s --timeout=30s --start-period=300s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# Start the application
CMD ["python", "start.py"] 