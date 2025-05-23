from typing import Dict, Any, Optional
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
from app.config import get_settings

class ModelManager:
    _instance = None
    _model = None
    _tokenizer = None
    _is_vllm = False

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(ModelManager, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if self._model is None:
            self._initialize_model()

    def _initialize_model(self):
        settings = get_settings()
        try:
            # Try to import and use vLLM
            from vllm import LLM, SamplingParams
            self._model = LLM(
                model=settings.MODEL_NAME,
                trust_remote_code=True,
                tensor_parallel_size=1
            )
            self._is_vllm = True
        except (ImportError, ModuleNotFoundError):
            # Fallback to regular transformers
            print("Falling back to standard HuggingFace transformers implementation")
            self._model = AutoModelForCausalLM.from_pretrained(
                settings.MODEL_NAME,
                torch_dtype=torch.float16,
                device_map="auto"
            )
            self._tokenizer = AutoTokenizer.from_pretrained(settings.MODEL_NAME)
            self._is_vllm = False

    def generate(
        self,
        prompt: str,
        max_tokens: Optional[int] = None,
        temperature: Optional[float] = None,
        top_p: Optional[float] = None,
        top_k: Optional[int] = None
    ) -> Dict[str, Any]:
        settings = get_settings()
        
        if self._is_vllm:
            from vllm import SamplingParams
            sampling_params = SamplingParams(
                max_tokens=max_tokens or settings.MAX_TOKENS,
                temperature=temperature or settings.TEMPERATURE,
                top_p=top_p or settings.TOP_P,
                top_k=top_k or settings.TOP_K
            )
            outputs = self._model.generate(prompt, sampling_params)
            
            return {
                "text": outputs[0].outputs[0].text,
                "finish_reason": "length" if len(outputs[0].outputs[0].text) >= max_tokens else "stop",
                "usage": {
                    "prompt_tokens": len(outputs[0].prompt_token_ids),
                    "completion_tokens": len(outputs[0].outputs[0].token_ids),
                    "total_tokens": len(outputs[0].prompt_token_ids) + len(outputs[0].outputs[0].token_ids)
                }
            }
        else:
            # Standard transformers implementation
            inputs = self._tokenizer(prompt, return_tensors="pt").to(self._model.device)
            outputs = self._model.generate(
                **inputs,
                max_new_tokens=max_tokens or settings.MAX_TOKENS,
                temperature=temperature or settings.TEMPERATURE,
                top_p=top_p or settings.TOP_P,
                top_k=top_k or settings.TOP_K,
                do_sample=True,
                pad_token_id=self._tokenizer.pad_token_id
            )
            
            response_text = self._tokenizer.decode(outputs[0], skip_special_tokens=True)[len(prompt):]
            
            return {
                "text": response_text,
                "finish_reason": "length" if len(response_text.split()) >= max_tokens else "stop",
                "usage": {
                    "prompt_tokens": len(inputs.input_ids[0]),
                    "completion_tokens": len(outputs[0]) - len(inputs.input_ids[0]),
                    "total_tokens": len(outputs[0])
                }
            }

    def switch_model(self, model_name: str):
        """Switch to a different model"""
        self._model = LLM(
            model=model_name,
            trust_remote_code=True,
            tensor_parallel_size=1
        ) 