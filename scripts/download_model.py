import os
import sys
import requests
from tqdm import tqdm

def download_file(url, destination):
    """Download a file with progress bar"""
    # Add Hugging Face user agent
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    response = requests.get(url, stream=True, headers=headers)
    total_size = int(response.headers.get('content-length', 0))
    
    os.makedirs(os.path.dirname(destination), exist_ok=True)
    
    with open(destination, 'wb') as f, tqdm(
        desc=os.path.basename(destination),
        total=total_size,
        unit='iB',
        unit_scale=True,
        unit_divisor=1024,
    ) as pbar:
        for data in response.iter_content(chunk_size=1024):
            size = f.write(data)
            pbar.update(size)

def main():
    # Your specific Hugging Face model URL
    model_url = "https://huggingface.co/Jazhanma0074/llama-2-7b-chat-gguf/resolve/main/model-q4_k_m.gguf?download=true"
    
    # Destination path in Render
    model_path = "/opt/render/project/src/models/model-q4_k_m.gguf"
    
    print(f"Downloading model from Hugging Face Hub...")
    print(f"Destination: {model_path}")
    try:
        download_file(model_url, model_path)
        print("Model downloaded successfully!")
    except Exception as e:
        print(f"Error downloading model: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main() 