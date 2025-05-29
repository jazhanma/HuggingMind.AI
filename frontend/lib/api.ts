export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-cc82b.up.railway.app';

interface APIKeyResponse {
  key: string;
  name?: string;
  created_at: string;
  last_used?: string;
}

interface APIKeyCreate {
  name?: string;
}

interface FileResponse {
  filename: string;
  size: number;
  upload_time: string;
  file_type: string;
}

export async function createApiKey(name?: string): Promise<APIKeyResponse> {
  const response = await fetch(`${API_BASE_URL}/keys`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to create API key' }));
    throw new Error(error.detail || 'Failed to create API key');
  }

  return response.json();
}

export async function listApiKeys(): Promise<APIKeyResponse[]> {
  const response = await fetch(`${API_BASE_URL}/keys`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to list API keys' }));
    throw new Error(error.detail || 'Failed to list API keys');
  }

  return response.json();
}

export async function revokeApiKey(key: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/keys/${key}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to revoke API key' }));
    throw new Error(error.detail || 'Failed to revoke API key');
  }
}

export async function testApiEndpoint(apiKey: string, prompt: string): Promise<string> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      max_tokens: 100,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to test API endpoint' }));
    throw new Error(error.detail || 'Failed to test API endpoint');
  }

  const data = await response.json();
  return data.text;
}

export async function uploadFile(file: File): Promise<FileResponse> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = { detail: await response.text() || response.statusText };
    }

    if (!response.ok) {
      console.error('Upload error response:', {
        status: response.status,
        statusText: response.statusText,
        data,
        contentType
      });
      
      throw new Error(
        typeof data === 'object' && 'detail' in data 
          ? data.detail 
          : 'Failed to upload file: ' + response.statusText
      );
    }

    return data;
  } catch (error) {
    console.error('Upload error:', error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unexpected error occurred during upload');
    }
  }
}

export async function listUploads(): Promise<FileResponse[]> {
  const response = await fetch(`${API_BASE_URL}/uploads`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Failed to list uploads' }));
    throw new Error(error.detail || 'Failed to list uploads');
  }

  return response.json();
} 