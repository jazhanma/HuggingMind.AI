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
        model_url = os.getenv("MODEL_URL")
        local_path = "/tmp/model.gguf"

        try:
            print("Initializing LLaMA model...")
            
            if not os.path.exists(local_path):
                print("Downloading model from:", model_url)
                response = requests.get(model_url, stream=True)
                with open(local_path, "wb") as f:
                    for chunk in response.iter_content(chunk_size=8192):
                        f.write(chunk)
                print("Model downloaded successfully!")
            else:
                print("Using existing model file from:", local_path)

            print(f"GPU Layers: {settings.GPU_LAYERS}")
            print(f"Context Length: {settings.CONTEXT_LENGTH}")
            
            self._model = Llama(
                model_path=local_path,
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