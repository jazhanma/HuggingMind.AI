import { NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'https://web-production-cc82b.up.railway.app'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate the request body
    if (!body.messages || !Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request: messages array is required' },
        { status: 400 }
      )
    }

    const lastMessage = body.messages[body.messages.length - 1]
    if (!lastMessage || !lastMessage.content) {
      return NextResponse.json(
        { error: 'Invalid request: message content is required' },
        { status: 400 }
      )
    }
    
    // Format request to match backend's expected format
    const backendRequest = {
      prompt: lastMessage.content,  // Send the last message's content as prompt
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
      if (!healthCheck.ok) {
        throw new Error(`Backend health check failed with status: ${healthCheck.status}`)
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
      
      return NextResponse.json({ response: data.text })  // Changed from data.response to data.text
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
