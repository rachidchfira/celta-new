import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// POST - Generate a signed URL for downloading a booklet
export async function POST(request: NextRequest) {
  try {
    const { filename } = await request.json()

    if (!filename) {
      return NextResponse.json(
        { error: 'Filename is required' },
        { status: 400 }
      )
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Supabase not configured. Please add Supabase credentials to .env' },
        { status: 500 }
      )
    }

    // Generate a signed URL that expires in 1 hour
    const { data, error } = await supabaseAdmin.storage
      .from('booklets')
      .createSignedUrl(filename, 3600) // 1 hour expiry

    if (error) {
      console.error('Error creating signed URL:', error)
      return NextResponse.json(
        { error: 'Failed to generate download link', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      signedUrl: data.signedUrl,
      expiresIn: 3600 
    })
  } catch (error) {
    console.error('Error in download API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
