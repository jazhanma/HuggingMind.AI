# Build stage
FROM python:3.10-slim-bullseye as builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt .

# Create virtual environment and install dependencies with aggressive cleanup
RUN python -m venv /opt/venv \
    && . /opt/venv/bin/activate \
    && pip install --no-cache-dir -r requirements.txt \
    && pip uninstall -y torch torchvision torchaudio \
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
    && find /opt/venv -type f -name "*.rst" -delete \
    && rm -rf /opt/venv/lib/python*/site-packages/numpy/doc/ \
    && rm -rf /opt/venv/lib/python*/site-packages/numpy/*/tests/ \
    && rm -rf /opt/venv/lib/python*/site-packages/pip/ \
    && rm -rf /opt/venv/lib/python*/site-packages/setuptools/ \
    && rm -rf /opt/venv/lib/python*/site-packages/wheel/

# Create model directory and download smallest model (Q2_K)
RUN mkdir -p /tmp \
    && curl -L https://huggingface.co/TheBloke/Llama-2-7B-Chat-GGUF/resolve/main/llama-2-7b-chat.Q2_K.gguf \
    -o /tmp/model.gguf \
    && rm -rf /root/.cache/* /tmp/pip-* /tmp/*.whl

# Runtime stage with minimal image
FROM debian:bullseye-slim as runtime

WORKDIR /app

# Install only essential runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-minimal \
    libstdc++6 \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

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
    GPU_LAYERS=0 \
    CONTEXT_LENGTH=2048 \
    THREADS=4

# Create necessary directories with minimal permissions
RUN mkdir -p /app/data /app/uploads /tmp \
    && useradd -r -s /bin/false appuser \
    && chown -R appuser:appuser /app /tmp

# Copy only necessary application files
COPY --chown=appuser:appuser ./app ./app
COPY --chown=appuser:appuser start.py .

# Switch to non-root user
USER appuser

# Health check
HEALTHCHECK --interval=60s --timeout=30s --start-period=300s --retries=3 \
    CMD curl -f http://localhost:${PORT}/health || exit 1

# Start the application
CMD ["python3", "start.py"] 