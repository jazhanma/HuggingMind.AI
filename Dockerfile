# Build stage
FROM python:3.10-alpine as builder

WORKDIR /app

# Install build dependencies and clean up in one layer
RUN apk add --no-cache \
    build-base \
    cmake \
    curl \
    linux-headers \
    sqlite-dev \
    libffi-dev \
    zlib-dev \
    jpeg-dev

# Copy requirements and install dependencies
COPY requirements.txt .

# Create virtual environment and install dependencies
RUN python -m venv /opt/venv \
    && . /opt/venv/bin/activate \
    && pip install --no-cache-dir -r requirements.txt \
    && pip uninstall -y torch \
    && find /opt/venv -type d -name "__pycache__" -exec rm -r {} + 2>/dev/null || true \
    && find /opt/venv -type d -name "*.dist-info" -exec rm -r {} + 2>/dev/null || true \
    && find /opt/venv -type d -name "*.egg-info" -exec rm -r {} + 2>/dev/null || true \
    && find /opt/venv -type f -name "*.pyc" -delete \
    && find /opt/venv -type f -name "*.pyo" -delete \
    && find /opt/venv -type f -name "*.pyd" -delete \
    && find /opt/venv -type f -name "*.so" -exec strip {} + 2>/dev/null || true

# Download smallest model variant and clean up
RUN mkdir -p /app/models \
    && curl -L https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q2_K.gguf \
    -o /app/models/model.gguf \
    && rm -rf /root/.cache/*

# Runtime stage
FROM python:3.10-alpine

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache \
    libstdc++ \
    sqlite \
    zlib \
    libjpeg

# Copy virtual environment from builder and set up environment
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH" \
    PORT=8000 \
    HOST=0.0.0.0 \
    PYTHONUNBUFFERED=1 \
    MODEL_PATH=/app/models/model.gguf \
    PYTHONDONTWRITEBYTECODE=1

# Create data and uploads directories
RUN mkdir -p /app/data /app/uploads && chown 1000:1000 /app/data /app/uploads

# Copy model and application files
COPY --from=builder /app/models /app/models
COPY ./app ./app
COPY start.py .

# Health check
HEALTHCHECK --interval=60s --timeout=30s --start-period=300s --retries=3 \
    CMD wget -q --spider http://localhost:${PORT}/health || exit 1

# Start the application
CMD ["python", "start.py"] 