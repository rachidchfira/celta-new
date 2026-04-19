import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const response = await fetch('https://vocalbridgeai.com/api/v1/token', {
      method: 'POST',
      headers: {
        'X-API-Key': process.env.VOCAL_BRIDGE_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ participant_name: 'CELTA Prep Student' }),
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: `VocalBridge API error: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to get voice token', detail: error?.message },
      { status: 500 }
    )
  }
}
