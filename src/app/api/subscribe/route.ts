import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Real booklets that exist in /public/downloads/
const AVAILABLE_BOOKLETS = [
  {
    id: 'see-your-learner',
    title: 'See Your Learner',
    description: 'Assignment 1 guide — understand your learners the way CELTA assessors expect',
    filename: 'see-your-learner.pdf',
    size: '1.8 MB'
  },
  {
    id: 'think-like-celta-trainer',
    title: 'Think Like a CELTA Trainer',
    description: 'Get inside the assessor\'s mind and know exactly what they\'re looking for',
    filename: 'think-like-celta-trainer.pdf',
    size: '2.1 MB'
  },
  {
    id: 'the-celta-mindset',
    title: 'The CELTA Mindset',
    description: 'Mental resilience and confidence strategies for the most intense 4 weeks of your career',
    filename: 'the-celta-mindset.pdf',
    size: '1.5 MB'
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, source = 'lead_magnet' } = body

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    let isNew = true

    // Save to DB — graceful degradation if DB is unavailable
    try {
      const existing = await db.subscriber.findUnique({
        where: { email: email.toLowerCase() }
      })

      if (existing) {
        isNew = false
      } else {
        await db.subscriber.create({
          data: {
            email: email.toLowerCase(),
            name: name || null,
            source
          }
        })
      }
    } catch (dbError) {
      console.log('DB unavailable, continuing without saving:', dbError)
    }

    return NextResponse.json({
      success: true,
      message: isNew ? 'You\'re in! Download your free booklets below.' : 'Welcome back! Your booklets are ready.',
      isNew,
      booklets: AVAILABLE_BOOKLETS
    })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({ booklets: AVAILABLE_BOOKLETS })
}
