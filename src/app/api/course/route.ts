import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// GET - Get course structure (public, no auth required)
export async function GET() {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    const { data: modules, error } = await supabaseAdmin
      .from('course_modules')
      .select(`
        id,
        title,
        description,
        order,
        lessons:course_lessons (
          id,
          title,
          description,
          youtube_id,
          duration,
          order,
          has_quiz,
          module_id
        )
      `)
      .eq('is_active', true)
      .order('order', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch course content' },
        { status: 500 }
      )
    }

    // Calculate total duration
    const totalDuration = modules?.reduce((acc: number, module: { lessons: { duration: number }[] }) => {
      return acc + module.lessons.reduce((sum: number, lesson: { duration: number }) => sum + lesson.duration, 0)
    }, 0) || 0

    // Count total lessons
    const totalLessons = modules?.reduce((acc: number, module: { lessons: unknown[] }) => acc + module.lessons.length, 0) || 0

    return NextResponse.json({ 
      success: true,
      course: {
        title: 'CELTA PREP COURSE',
        description: 'Complete preparation for your CELTA certification',
        totalModules: modules?.length || 0,
        totalLessons,
        totalDuration,
        modules
      }
    })
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course content' },
      { status: 500 }
    )
  }
}
