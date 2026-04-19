import { NextRequest, NextResponse } from 'next/server'

// Admin authentication endpoint
export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    const adminPassword = process.env.ADMIN_PASSWORD || 'celta2024admin'
    
    if (password === adminPassword) {
      return NextResponse.json({ 
        success: true,
        message: 'Authenticated successfully'
      })
    }
    
    return NextResponse.json(
      { error: 'Invalid password' },
      { status: 401 }
    )
  } catch {
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
