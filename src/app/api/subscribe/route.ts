import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { supabaseAdmin } from '@/lib/supabase'

// Static booklets available for download
const AVAILABLE_BOOKLETS = [
  {
    id: 'celta-grammar-guide',
    title: 'CELTA Grammar Guide',
    description: 'Essential grammar points every CELTA trainee needs to know',
    filename: 'celta-grammar-guide.pdf',
    size: '2.4 MB'
  },
  {
    id: 'lesson-plan-template',
    title: 'Lesson Plan Template',
    description: 'Professional CELTA lesson plan template with examples',
    filename: 'lesson-plan-template.pdf',
    size: '1.2 MB'
  },
  {
    id: 'ccq-bank',
    title: 'CCQ Examples Bank',
    description: '50+ concept checking questions for common language points',
    filename: 'ccq-bank.pdf',
    size: '1.8 MB'
  }
]

// POST - Subscribe email (saves to leads table)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, source = 'lead_magnet' } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    let isNew = true

    // Check if already subscribed
    try {
      const existing = await db.subscriber.findUnique({
        where: { email: email.toLowerCase() }
      })

      if (existing) {
        isNew = false
      } else {
        // Create new subscriber
        await db.subscriber.create({
          data: {
            email: email.toLowerCase(),
            name: name || null,
            source
          }
        })
      }
    } catch (dbError) {
      console.log('Database error, continuing:', dbError)
      // Continue anyway - graceful degradation
    }

    return NextResponse.json({
      success: true,
      message: isNew ? 'Successfully subscribed!' : 'Welcome back!',
      isNew,
      booklets: AVAILABLE_BOOKLETS
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    )
  }
}

// GET - Get all leads (for admin)
export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { data: leads, error } = await supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      leads
    })
  } catch (error) {
    console.error('Error fetching leads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    )
  }
}
