FROM python:3.10-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Copy only the requirements file first
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY ./app ./app
COPY Procfile .

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Command to run the application
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT 