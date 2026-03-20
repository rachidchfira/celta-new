import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET - List all booklets from the bucket
export async function GET() {
  try {
    if (!supabaseAdmin) {
      // Return empty list if Supabase not configured
      return NextResponse.json({ 
        booklets: [],
        error: 'Supabase not configured. Please add Supabase credentials to .env'
      })
    }

    // List all files in the booklets bucket
    const { data, error } = await supabaseAdmin.storage
      .from('booklets')
      .list('', {
        sortBy: { column: 'name', order: 'asc' }
      })

    if (error) {
      console.error('Error listing booklets:', error)
      return NextResponse.json(
        { error: 'Failed to list booklets', details: error.message },
        { status: 500 }
      )
    }

    // Filter out folders and format the response
    const booklets = data
      .filter(item => item.id && !item.id.endsWith('/')) // Exclude folders and null ids
      .map(item => ({
        name: item.name,
        id: item.id!,
        size: item.metadata?.size || 0,
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }))

    return NextResponse.json({ booklets })
  } catch (error) {
    console.error('Error in booklets API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
