# HuggingMind AI - Local LLaMA 2 Chat

A clean and efficient implementation for running LLaMA 2 locally with optimized inference.

## Features

- Local LLaMA 2 7B Chat model inference
- 4-bit quantization for efficient memory usage
- FastAPI backend with chat endpoint
- CLI interface for quick testing
- Web UI using Gradio
- Optimized for RTX 3060 Ti and 32GB RAM

## Setup

1. **Environment Setup**:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

2. **Model Setup**:
The model should be available at:
```
C:\Users\jaska\.llama\checkpoints\Llama-2-7b-chat
```

3. **Configuration**:
Create a `.env` file with your settings (optional):
```env
MODEL_PATH=C:\Users\jaska\.llama\checkpoints\Llama-2-7b-chat
MAX_TOKENS=2048
TEMPERATURE=0.7
```

## Usage

### 1. FastAPI Backend

Start the API server:
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000` with the following endpoints:
- POST `/api/v1/chat`: Chat with the model
- GET `/api/v1/health`: Check model status

Example API request:
```bash
curl -X POST "http://localhost:8000/api/v1/chat" \
     -H "Content-Type: application/json" \
     -d '{"prompt": "Tell me a story", "temperature": 0.7}'
```

### 2. CLI Interface

Run the CLI chat interface:
```bash
python -m app.cli
```

### 3. Web UI

Launch the web interface:
```bash
python -m app.webui
```

The web UI will be available at `http://localhost:8000`

## Model Configuration

The model uses 4-bit quantization by default, optimized for your RTX 3060 Ti. You can adjust the following settings in `config.py`:

- `USE_4BIT`: Enable 4-bit quantization (default: True)
- `USE_8BIT`: Enable 8-bit quantization (default: False)
- `USE_HALF_PRECISION`: Use FP16 (default: True)

## Project Structure

```
app/
├── api/
│   └── routes.py      # FastAPI routes
├── models/
│   └── llama_model.py # Model implementation
├── config.py          # Configuration
├── cli.py            # CLI interface
├── webui.py          # Gradio web interface
└── main.py           # FastAPI app
```

## Performance Notes

- 4-bit quantization reduces VRAM usage to ~6GB
- Inference speed: ~20-30 tokens/second
- First request may be slower due to model loading

## License

MIT 