import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { db } from '@/lib/db'

// POST - Update lesson progress (mark as complete, update watch time, etc.)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { enrollmentId, lessonId, completed, watchTime, notes } = body

    if (!enrollmentId || !lessonId) {
      return NextResponse.json(
        { error: 'Enrollment ID and lesson ID are required' },
        { status: 400 }
      )
    }

    // If Supabase is configured, use it
    if (supabaseAdmin) {
      // Verify enrollment exists
      const { data: enrollment, error: enrollError } = await supabaseAdmin
        .from('enrollments')
        .select('id')
        .eq('id', enrollmentId)
        .single()

      if (enrollError || !enrollment) {
        return NextResponse.json(
          { error: 'Enrollment not found' },
          { status: 404 }
        )
      }

      // Verify lesson exists
      const { data: lesson, error: lessonError } = await supabaseAdmin
        .from('course_lessons')
        .select('id')
        .eq('id', lessonId)
        .single()

      if (lessonError || !lesson) {
        return NextResponse.json(
          { error: 'Lesson not found' },
          { status: 404 }
        )
      }

      // Upsert progress
      const updateData: Record<string, unknown> = {
        enrollment_id: enrollmentId,
        lesson_id: lessonId
      }
      
      if (completed !== undefined) {
        updateData.completed = completed
        updateData.completed_at = completed ? new Date().toISOString() : null
      }
      if (watchTime !== undefined) {
        updateData.watch_time = watchTime
      }
      if (notes !== undefined) {
        updateData.notes = notes
      }

      // Check if progress exists
      const { data: existingProgress } = await supabaseAdmin
        .from('lesson_progress')
        .select('id')
        .eq('enrollment_id', enrollmentId)
        .eq('lesson_id', lessonId)
        .single()

      let result
      if (existingProgress) {
        const { data, error } = await supabaseAdmin
          .from('lesson_progress')
          .update(updateData)
          .eq('id', existingProgress.id)
          .select()
          .single()
        result = data
        if (error) console.error('Update error:', error)
      } else {
        const { data, error } = await supabaseAdmin
          .from('lesson_progress')
          .insert(updateData)
          .select()
          .single()
        result = data
        if (error) console.error('Insert error:', error)
      }

      // Update enrollment last accessed
      await supabaseAdmin
        .from('enrollments')
        .update({ last_accessed_at: new Date().toISOString() })
        .eq('id', enrollmentId)

      return NextResponse.json({
        success: true,
        progress: result
      })
    }

    // Fallback to Prisma/SQLite
    const enrollment = await db.courseEnrollment.findUnique({
      where: { id: enrollmentId }
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    const lesson = await db.courseLesson.findUnique({
      where: { id: lessonId }
    })

    if (!lesson) {
      return NextResponse.json(
        { error: 'Lesson not found' },
        { status: 404 }
      )
    }

    // Upsert progress
    const existingProgress = await db.lessonProgress.findUnique({
      where: {
        enrollmentId_lessonId: { enrollmentId, lessonId }
      }
    })

    let result
    if (existingProgress) {
      result = await db.lessonProgress.update({
        where: { id: existingProgress.id },
        data: {
          completed: completed ?? existingProgress.completed,
          completedAt: completed ? new Date() : null,
          watchTime: watchTime ?? existingProgress.watchTime,
          notes: notes ?? existingProgress.notes
        }
      })
    } else {
      result = await db.lessonProgress.create({
        data: {
          enrollmentId,
          lessonId,
          completed: completed ?? false,
          completedAt: completed ? new Date() : null,
          watchTime: watchTime ?? 0,
          notes
        }
      })
    }

    // Update enrollment last accessed
    await db.courseEnrollment.update({
      where: { id: enrollmentId },
      data: { lastAccessedAt: new Date() }
    })

    return NextResponse.json({
      success: true,
      progress: {
        id: result.id,
        lessonId: result.lessonId,
        completed: result.completed,
        watchTime: result.watchTime,
        notes: result.notes
      }
    })
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}

// GET - Get progress for an enrollment
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const enrollmentId = searchParams.get('enrollmentId')

    if (!enrollmentId) {
      return NextResponse.json(
        { error: 'Enrollment ID is required' },
        { status: 400 }
      )
    }

    // If Supabase is configured, use it
    if (supabaseAdmin) {
      const { data: enrollment, error: enrollError } = await supabaseAdmin
        .from('enrollments')
        .select(`
          id,
          lesson_progress (
            id,
            lesson_id,
            completed,
            watch_time,
            notes,
            lesson:course_lessons (
              id,
              title,
              module_id,
              duration
            )
          )
        `)
        .eq('id', enrollmentId)
        .single()

      if (enrollError || !enrollment) {
        return NextResponse.json(
          { error: 'Enrollment not found' },
          { status: 404 }
        )
      }

      const { count: totalLessons } = await supabaseAdmin
        .from('course_lessons')
        .select('*', { count: 'exact', head: true })
        .eq('is_active', true)

      const completedLessons = enrollment.lesson_progress?.filter((p: { completed: boolean }) => p.completed).length || 0
      const progressPercent = totalLessons && totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      return NextResponse.json({
        success: true,
        progress: enrollment.lesson_progress,
        stats: {
          completedLessons,
          totalLessons: totalLessons || 0,
          progressPercent
        }
      })
    }

    // Fallback to Prisma/SQLite
    const enrollment = await db.courseEnrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        lessonProgress: {
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
                moduleId: true,
                duration: true
              }
            }
          }
        }
      }
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: 'Enrollment not found' },
        { status: 404 }
      )
    }

    const totalLessons = await db.courseLesson.count({
      where: { isActive: true }
    })

    const completedLessons = enrollment.lessonProgress.filter(p => p.completed).length
    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    return NextResponse.json({
      success: true,
      progress: enrollment.lessonProgress.map(p => ({
        id: p.id,
        lessonId: p.lessonId,
        completed: p.completed,
        watchTime: p.watchTime,
        notes: p.notes,
        lesson: p.lesson
      })),
      stats: {
        completedLessons,
        totalLessons,
        progressPercent
      }
    })
  } catch (error) {
    console.error('Error fetching progress:', error)
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
      { status: 500 }
    )
  }
}
