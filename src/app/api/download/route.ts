import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// POST - Record a download and return the file info
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

    // Find the subscriber
    const subscriber = await db.subscriber.findUnique({
      where: { email: email.toLowerCase() }
    })

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Subscriber not found. Please subscribe first.' },
        { status: 404 }
      )
    }

    // Find the booklet
    const booklet = await db.booklet.findUnique({
      where: { id: bookletId }
    })

    if (!booklet || !booklet.isActive) {
      return NextResponse.json(
        { error: 'Booklet not found or unavailable.' },
        { status: 404 }
      )
    }

    // Record the download (create or find existing)
    const existingDownload = await db.download.findFirst({
      where: {
        subscriberId: subscriber.id,
        bookletId: booklet.id
      }
    })

    if (!existingDownload) {
      await db.download.create({
        data: {
          subscriberId: subscriber.id,
          bookletId: booklet.id
        }
      })
    }

    // Return the download URL
    return NextResponse.json({ 
      success: true,
      downloadUrl: `/downloads/${booklet.filename}`,
      title: booklet.title
    })
  } catch (error) {
    console.error('Error recording download:', error)
    return NextResponse.json(
      { error: 'Failed to process download. Please try again.' },
      { status: 500 }
    )
  }
}

// GET - Get download stats for a subscriber
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const subscriber = await db.subscriber.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        downloads: {
          include: {
            booklet: true
          }
        }
      }
    })

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      downloads: subscriber.downloads.map(d => ({
        title: d.booklet.title,
        downloadedAt: d.downloadedAt
      }))
    })
  } catch (error) {
    console.error('Error fetching downloads:', error)
    return NextResponse.json(
      { error: 'Failed to fetch downloads' },
      { status: 500 }
    )
  }
}
