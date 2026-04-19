import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Real booklets — served directly from /public/downloads/
const BOOKLETS: Record<string, { title: string; filename: string }> = {
  'see-your-learner': {
    title: 'See Your Learner',
    filename: 'see-your-learner.pdf'
  },
  'think-like-celta-trainer': {
    title: 'Think Like a CELTA Trainer',
    filename: 'think-like-celta-trainer.pdf'
  },
  'the-celta-mindset': {
    title: 'The CELTA Mindset',
    filename: 'the-celta-mindset.pdf'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, bookletId } = body

    if (!email || !bookletId) {
      return NextResponse.json(
        { error: 'Email and booklet ID are required' },
        { status: 400 }
      )
    }

    const booklet = BOOKLETS[bookletId]
    if (!booklet) {
      return NextResponse.json(
        { error: 'Booklet not found.' },
        { status: 404 }
      )
    }

    // Record download in DB — graceful degradation if unavailable
    try {
      const subscriber = await db.subscriber.findUnique({
        where: { email: email.toLowerCase() }
      })

      if (subscriber) {
        const existingDownload = await db.download.findFirst({
          where: {
            subscriberId: subscriber.id,
            bookletId: bookletId
          }
        })

        if (!existingDownload) {
          // Try to record — skip if booklet not in DB
          try {
            await db.download.create({
              data: {
                subscriberId: subscriber.id,
                bookletId: bookletId
              }
            })
          } catch {
            // Booklet not in DB table — skip recording, still serve the file
          }
        }
      }
    } catch (dbError) {
      console.log('DB unavailable, serving file anyway:', dbError)
    }

    // Always return the direct download URL
    return NextResponse.json({
      success: true,
      downloadUrl: `/downloads/${booklet.filename}`,
      title: booklet.title
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to process download. Please try again.' },
      { status: 500 }
    )
  }
}
