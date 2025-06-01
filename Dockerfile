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

# Create virtual environment and install dependencies with aggressive cleanup
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
    && find /opt/venv -type f -name "*.so" -exec strip {} + 2>/dev/null || true \
    && find /opt/venv -type f -name "*.c" -delete \
    && find /opt/venv -type f -name "*.h" -delete \
    && find /opt/venv -type f -name "*.txt" ! -name "requirements.txt" -delete \
    && find /opt/venv -type f -name "*.md" -delete \
    && find /opt/venv -type f -name "*.rst" -delete

# Create model directory and download model (using Q3_K_S for smaller size)
RUN mkdir -p /tmp \
    && curl -L https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q3_K_S.gguf \
    -o /tmp/model.gguf \
    && rm -rf /root/.cache/* /tmp/pip-* /tmp/*.whl

# Runtime stage with minimal image
FROM python:3.10-alpine as runtime

WORKDIR /app

# Install only essential runtime dependencies
RUN apk add --no-cache \
    libstdc++ \
    sqlite \
    zlib \
    libjpeg

# Copy only necessary files from builder
COPY --from=builder /opt/venv /opt/venv
COPY --from=builder /tmp/model.gguf /tmp/model.gguf

# Set up environment
ENV PATH="/opt/venv/bin:$PATH" \
    PORT=8000 \
    HOST=0.0.0.0 \
    PYTHONUNBUFFERED=1 \
    MODEL_PATH=/tmp/model.gguf \
    PYTHONDONTWRITEBYTECODE=1 \
    GPU_LAYERS=35 \
    CONTEXT_LENGTH=2048 \
    THREADS=8

# Create necessary directories with minimal permissions
RUN mkdir -p /app/data /app/uploads /tmp \
    && adduser -D appuser \
    && chown -R appuser:appuser /app /tmp

# Copy only necessary application files
COPY --chown=appuser:appuser ./app ./app
COPY --chown=appuser:appuser start.py .

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=60s --timeout=30s --start-period=300s --retries=3 \
    CMD wget -q --spider http://localhost:${PORT}/health || exit 1

# Start the application
CMD ["python", "start.py"] 