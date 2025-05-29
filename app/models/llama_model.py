import os
import requests
import asyncio
import gc
import torch
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
    _last_error = None
    _initialization_attempts = 0
    MAX_RETRIES = 3
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(LlamaModel, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        pass  # Don't initialize here, wait for async init

    @classmethod
    async def initialize(cls):
        """Initialize the model with retries and proper resource cleanup"""
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
                # Clear any existing model and force garbage collection
                if cls._model is not None:
                    del cls._model
                    cls._model = None
                    gc.collect()
                    torch.cuda.empty_cache()  # Clear GPU memory if available
                
                settings = get_settings()
                
                # Verify model file exists
                if not os.path.exists(settings.MODEL_PATH):
                    raise FileNotFoundError(f"Model file not found at {settings.MODEL_PATH}")
                
                # Log memory usage before loading
                logger.info(f"Memory usage before model load: {torch.cuda.memory_allocated() if torch.cuda.is_available() else 'N/A'}")
                
                # Initialize model with conservative settings
                cls._model = Llama(
                    model_path=settings.MODEL_PATH,
                    n_ctx=settings.CONTEXT_LENGTH,
                    n_gpu_layers=settings.GPU_LAYERS,
                    n_threads=settings.THREADS,
                    verbose=True
                )
                
                # Test the model with a simple prompt
                test_response = cls._model.create_completion(
                    prompt="Test.",
                    max_tokens=5,
                    temperature=0.7,
                    stop=["User:", "\n"],
                    echo=False
                )
                
                if not test_response or "choices" not in test_response:
                    raise RuntimeError("Model initialization test failed")
                
                cls._initialized = True
                cls._last_error = None
                logger.info("Model initialized successfully!")
                
            except Exception as e:
                cls._last_error = str(e)
                logger.error(f"Model initialization failed: {e}", exc_info=True)
                
                # Cleanup on failure
                if cls._model is not None:
                    del cls._model
                    cls._model = None
                    gc.collect()
                    torch.cuda.empty_cache()
                
                # If we've tried too many times, give up
                if cls._initialization_attempts >= cls.MAX_RETRIES:
                    logger.error("Max initialization attempts reached")
                    raise RuntimeError(f"Failed to initialize model after {cls.MAX_RETRIES} attempts")
                
                # Wait before retrying
                retry_delay = 2 ** cls._initialization_attempts  # Exponential backoff
                logger.info(f"Waiting {retry_delay} seconds before retrying...")
                await asyncio.sleep(retry_delay)
                await cls.initialize()  # Retry initialization
            finally:
                cls._initializing = False

    @classmethod
    async def ensure_initialized(cls):
        """Ensure the model is initialized before use"""
        if not cls._initialized:
            await cls.initialize()
        elif cls._model is None:  # Handle case where model was freed
            cls._initialized = False
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
        
        try:
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
            
            # Generate response with timeout protection
            async def generate():
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
            
            try:
                response = await asyncio.wait_for(
                    asyncio.get_event_loop().run_in_executor(None, lambda: generate()),
                    timeout=30.0  # 30 second timeout
                )
                
                if not response or "choices" not in response:
                    raise RuntimeError("Model returned invalid response")
                
                return response["choices"][0]["text"].strip()
                
            except asyncio.TimeoutError:
                logger.error("Model generation timed out")
                raise RuntimeError("Response generation timed out")
                
        except Exception as e:
            logger.error(f"Error during chat generation: {e}", exc_info=True)
            # If we get a critical error, mark as uninitialized to force reinitialization
            if "access violation" in str(e).lower() or "segmentation fault" in str(e).lower():
                self._initialized = False
                self._model = None
                gc.collect()
                torch.cuda.empty_cache()
            raise

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