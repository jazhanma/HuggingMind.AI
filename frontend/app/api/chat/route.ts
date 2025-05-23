import { NextResponse } from "next/server"

const BACKEND_URL = 'http://127.0.0.1:8000'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Convert the frontend's format to match the backend's ChatRequest model exactly
    const backendRequest = {
      messages: [{ role: "user", content: body.prompt }], // Format as messages array
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 0.95,
      top_k: 40,
      repeat_penalty: 1.1
    }

    console.log('Attempting to connect to backend at:', BACKEND_URL)
    console.log('Request payload:', JSON.stringify(backendRequest, null, 2))

    try {
      // First, test the backend connection
      const healthCheck = await fetch(`${BACKEND_URL}/api/health`)
      if (!healthCheck.ok) {
        throw new Error(`Backend health check failed with status: ${healthCheck.status}`)
      }
      console.log('Backend health check successful')

      // Now send the actual chat request
      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer test-key'
        },
        body: JSON.stringify(backendRequest),
      })

      const responseText = await response.text()
      console.log('Raw backend response:', responseText)

      if (!response.ok) {
        throw new Error(`Backend responded with status: ${response.status}. ${responseText}`)
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Failed to parse backend response:', parseError)
        throw new Error('Backend returned invalid JSON')
      }

      console.log('Parsed backend response:', data)
      
      return NextResponse.json({ response: data.response }) // Use data.response since that's what the backend returns
    } catch (fetchError) {
      console.error('Fetch error:', fetchError)
      if (fetchError instanceof TypeError && fetchError.message === 'fetch failed') {
        return NextResponse.json(
          { error: 'Could not connect to the AI backend. Please make sure the backend server is running on http://127.0.0.1:8000' },
          { status: 503 }
        )
      }
      throw fetchError
    }
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    )
  }
}
