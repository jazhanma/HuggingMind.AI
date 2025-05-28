import os
import requests
from typing import List, Optional, Dict, Any
from llama_cpp import Llama
from app.config import get_settings

class LlamaModel:
    _instance = None
    _model = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(LlamaModel, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if self._model is None:
            self._initialize_model()

    def _initialize_model(self):
        settings = get_settings()
        
        try:
            print("Initializing LLaMA model...")
            print("MODEL_PATH:", settings.MODEL_PATH)
            print("MODEL_URL:", settings.MODEL_URL)
            
            # Ensure MODEL_PATH is not empty
            if not settings.MODEL_PATH:
                settings.MODEL_PATH = "/tmp/model.gguf"
                print("Empty MODEL_PATH, using default:", settings.MODEL_PATH)
            
            # Create the parent directory if it doesn't exist
            model_dir = os.path.dirname(settings.MODEL_PATH)
            if model_dir:  # Only create directory if there's a parent path
                os.makedirs(model_dir, exist_ok=True)
                print(f"Created directory: {model_dir}")
            
            if settings.MODEL_URL:
                print("Downloading model from:", settings.MODEL_URL)
                if not os.path.exists(settings.MODEL_PATH):
                    response = requests.get(settings.MODEL_URL, stream=True)
                    response.raise_for_status()  # Raise an error for bad status codes
                    
                    with open(settings.MODEL_PATH, "wb") as f:
                        for chunk in response.iter_content(chunk_size=8192):
                            f.write(chunk)
                    print("Model downloaded successfully!")
                else:
                    print("Using existing model file from:", settings.MODEL_PATH)
            else:
                print("No MODEL_URL provided, using existing model at:", settings.MODEL_PATH)
                if not os.path.exists(settings.MODEL_PATH):
                    raise ValueError(f"Model file not found at {settings.MODEL_PATH} and no MODEL_URL provided")

            print(f"GPU Layers: {settings.GPU_LAYERS}")
            print(f"Context Length: {settings.CONTEXT_LENGTH}")
            
            self._model = Llama(
                model_path=settings.MODEL_PATH,
                n_ctx=settings.CONTEXT_LENGTH,
                n_gpu_layers=settings.GPU_LAYERS,
                n_threads=settings.THREADS,
            )
            print("Model loaded successfully!")
            
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise

    def chat(
        self,
        messages: List[dict],
        max_tokens: Optional[int] = None,
        temperature: Optional[float] = None,
        top_p: Optional[float] = None,
        top_k: Optional[int] = None,
        repeat_penalty: Optional[float] = None,
    ) -> str:
        settings = get_settings()
        
        # Use provided parameters or fall back to settings
        max_tokens = max_tokens or settings.MAX_TOKENS
        temperature = temperature or settings.TEMPERATURE
        top_p = top_p or settings.TOP_P
        top_k = top_k or settings.TOP_K
        repeat_penalty = repeat_penalty or settings.REPEAT_PENALTY
        
        # Format messages into a prompt
        prompt = ""
        for msg in messages:
            role = msg["role"]
            content = msg["content"]
            if role == "system":
                prompt += f"System: {content}\n"
            elif role == "user":
                prompt += f"User: {content}\n"
            elif role == "assistant":
                prompt += f"Assistant: {content}\n"
        prompt += "Assistant: "
        
        # Generate response
        response = self._model.create_completion(
            prompt=prompt,
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p,
            top_k=top_k,
            repeat_penalty=repeat_penalty,
            stop=["User:", "System:", "\n"],
            echo=False
        )
        
        return response["choices"][0]["text"].strip()

    def generate_response(
        self,
        prompt: str,
        max_tokens: Optional[int] = None,
        temperature: Optional[float] = None,
        top_p: Optional[float] = None,
        top_k: Optional[int] = None
    ) -> Dict[str, Any]:
        settings = get_settings()
        
        # Format prompt for LLaMA 2 Chat
        formatted_prompt = f"[INST] {prompt} [/INST]"
        
        # Generate response
        response = self._model(
            formatted_prompt,
            max_tokens=max_tokens or settings.MAX_TOKENS,
            temperature=temperature or settings.TEMPERATURE,
            top_p=top_p or settings.TOP_P,
            top_k=top_k or settings.TOP_K,
            echo=False,  # Don't include prompt in output
            stop=["[INST]", "</s>"]  # Stop tokens
        )
        
        # Extract completion text
        completion_text = response["choices"][0]["text"].strip()
        
        return {
            "text": completion_text,
            "usage": {
                "prompt_tokens": response["usage"]["prompt_tokens"],
                "completion_tokens": response["usage"]["completion_tokens"],
                "total_tokens": response["usage"]["total_tokens"]
            }
        }

    # Simple generate method for basic usage
    def generate(self, 
                prompt: str, 
                max_tokens: Optional[int] = None,
                temperature: Optional[float] = None,
                top_p: Optional[float] = None,
                top_k: Optional[int] = None) -> str:
        response = self.generate_response(
            prompt,
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p,
            top_k=top_k
        )
        return response["text"] 