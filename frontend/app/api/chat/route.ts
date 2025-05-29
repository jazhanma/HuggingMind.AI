import { NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-cc82b.up.railway.app'

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
      const healthCheck = await fetch(`${BACKEND_URL}/health`)
      const healthData = await healthCheck.text()
      console.log('Health check response:', healthData)
      
      if (!healthCheck.ok) {
        return NextResponse.json(
          { error: `Backend health check failed: ${healthData}` },
          { status: healthCheck.status }
        )
      }
      console.log('Backend health check successful')

      // Now send the actual chat request
      const response = await fetch(`${BACKEND_URL}/api/chat`, {
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
        return NextResponse.json(
          { error: `Backend error: ${responseText}` },
          { status: response.status }
        )
      }

      let data
      try {
        data = JSON.parse(responseText)
      } catch (parseError) {
        console.error('Failed to parse backend response:', parseError)
        return NextResponse.json(
          { error: 'Backend returned invalid JSON' },
          { status: 500 }
        )
      }

      console.log('Parsed backend response:', data)
      
      return NextResponse.json({ response: data.response })
    } catch (fetchError) {
      console.error('Fetch error:', fetchError)
      return NextResponse.json(
        { error: 'Could not connect to the AI backend. Please try again in a few minutes.' },
        { status: 503 }
      )
    }
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process request' },
      { status: 500 }
    )
  }
}
