import os
import requests
import asyncio
from typing import List, Optional, Dict, Any
from llama_cpp import Llama
from app.config import get_settings
import logging

logger = logging.getLogger(__name__)

class LlamaModel:
    _instance = None
    _model = None
    _initialized = False
    _initializing = False
    _init_lock = asyncio.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(LlamaModel, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        pass  # Don't initialize here, wait for async init

    @classmethod
    async def initialize(cls):
        """Asynchronously initialize the model"""
        if cls._initialized:
            return
        
        async with cls._init_lock:
            if cls._initializing:
                # Wait for initialization to complete
                while cls._initializing:
                    await asyncio.sleep(1)
                return
            
            if cls._initialized:
                return
            
            cls._initializing = True
            try:
                await cls._initialize_model()
                cls._initialized = True
            finally:
                cls._initializing = False

    @classmethod
    async def _initialize_model(cls):
        settings = get_settings()
        
        try:
            logger.info("Initializing LLaMA model...")
            logger.info(f"MODEL_PATH: {settings.MODEL_PATH}")
            logger.info(f"MODEL_URL: {settings.MODEL_URL}")
            
            # Ensure MODEL_PATH is not empty
            if not settings.MODEL_PATH:
                settings.MODEL_PATH = "/tmp/model.gguf"
                logger.info(f"Empty MODEL_PATH, using default: {settings.MODEL_PATH}")
            
            # Create the parent directory if it doesn't exist
            model_dir = os.path.dirname(settings.MODEL_PATH)
            if model_dir:  # Only create directory if there's a parent path
                os.makedirs(model_dir, exist_ok=True)
                logger.info(f"Created directory: {model_dir}")
            
            if settings.MODEL_URL:
                logger.info(f"Downloading model from: {settings.MODEL_URL}")
                if not os.path.exists(settings.MODEL_PATH):
                    # Download in chunks to avoid blocking
                    async def download_model():
                        response = requests.get(settings.MODEL_URL, stream=True)
                        response.raise_for_status()
                        
                        with open(settings.MODEL_PATH, "wb") as f:
                            for chunk in response.iter_content(chunk_size=8192):
                                f.write(chunk)
                                await asyncio.sleep(0)  # Yield to event loop
                    
                    await asyncio.get_event_loop().run_in_executor(None, download_model)
                    logger.info("Model downloaded successfully!")
                else:
                    logger.info(f"Using existing model file from: {settings.MODEL_PATH}")
            else:
                logger.info(f"No MODEL_URL provided, using existing model at: {settings.MODEL_PATH}")
                if not os.path.exists(settings.MODEL_PATH):
                    raise ValueError(f"Model file not found at {settings.MODEL_PATH} and no MODEL_URL provided")

            logger.info(f"GPU Layers: {settings.GPU_LAYERS}")
            logger.info(f"Context Length: {settings.CONTEXT_LENGTH}")
            
            # Load model in a separate thread to avoid blocking
            def load_model():
                cls._model = Llama(
                    model_path=settings.MODEL_PATH,
                    n_ctx=settings.CONTEXT_LENGTH,
                    n_gpu_layers=settings.GPU_LAYERS,
                    n_threads=settings.THREADS,
                )
            
            await asyncio.get_event_loop().run_in_executor(None, load_model)
            logger.info("Model loaded successfully!")
            
        except Exception as e:
            logger.error(f"Error loading model: {str(e)}")
            raise

    @classmethod
    async def ensure_initialized(cls):
        """Ensure the model is initialized before use"""
        if not cls._initialized:
            await cls.initialize()

    async def chat(
        self,
        messages: List[dict],
        max_tokens: Optional[int] = None,
        temperature: Optional[float] = None,
        top_p: Optional[float] = None,
        top_k: Optional[int] = None,
        repeat_penalty: Optional[float] = None,
    ) -> str:
        await self.ensure_initialized()
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
        
        # Generate response in a non-blocking way
        def generate():
            return self._model.create_completion(
                prompt=prompt,
                max_tokens=max_tokens,
                temperature=temperature,
                top_p=top_p,
                top_k=top_k,
                repeat_penalty=repeat_penalty,
                stop=["User:", "System:", "\n"],
                echo=False
            )
        
        response = await asyncio.get_event_loop().run_in_executor(None, generate)
        return response["choices"][0]["text"].strip()

    async def generate_response(
        self,
        prompt: str,
        max_tokens: Optional[int] = None,
        temperature: Optional[float] = None,
        top_p: Optional[float] = None,
        top_k: Optional[int] = None
    ) -> Dict[str, Any]:
        await self.ensure_initialized()
        settings = get_settings()
        
        # Format prompt for LLaMA 2 Chat
        formatted_prompt = f"[INST] {prompt} [/INST]"
        
        # Generate response in a non-blocking way
        def generate():
            return self._model(
                formatted_prompt,
                max_tokens=max_tokens or settings.MAX_TOKENS,
                temperature=temperature or settings.TEMPERATURE,
                top_p=top_p or settings.TOP_P,
                top_k=top_k or settings.TOP_K,
                echo=False,
                stop=["[INST]", "</s>"]
            )
        
        response = await asyncio.get_event_loop().run_in_executor(None, generate)
        
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
    async def generate(self, 
                    prompt: str, 
                    max_tokens: Optional[int] = None,
                    temperature: Optional[float] = None,
                    top_p: Optional[float] = None,
                    top_k: Optional[int] = None) -> str:
        response = await self.generate_response(
            prompt,
            max_tokens=max_tokens,
            temperature=temperature,
            top_p=top_p,
            top_k=top_k
        )
        return response["text"] 