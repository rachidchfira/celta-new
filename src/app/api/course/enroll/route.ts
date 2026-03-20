import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { db } from '@/lib/db'
import { CourseEnrollment, LessonProgress } from '@prisma/client'

// Type for enrollment with lesson progress
type EnrollmentWithProgress = CourseEnrollment & {
  lessonProgress: LessonProgress[]
}

// POST - Verify enrollment (email-only)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // If Supabase is configured, use it
    if (supabaseAdmin) {
      const { data: enrollment, error: enrollError } = await supabaseAdmin
        .from('enrollments')
        .select(`
          id,
          email,
          name,
          enrolled_at,
          payment_status,
          lesson_progress (
            lesson_id,
            completed,
            watch_time
          )
        `)
        .eq('email', email.toLowerCase())
        .eq('payment_status', 'completed')
        .single()

      if (enrollError || !enrollment) {
        console.error('Enrollment error:', enrollError)
        return NextResponse.json(
          { error: 'No active enrollment found. Please contact support if you have already enrolled.' },
          { status: 404 }
        )
      }

      // Update last accessed
      await supabaseAdmin
        .from('enrollments')
        .update({ last_accessed_at: new Date().toISOString() })
        .eq('id', enrollment.id)

      // Get full course structure with YouTube IDs
      const { data: modules, error: modulesError } = await supabaseAdmin
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
        .order('order', { ascending: true })

      if (modulesError) {
        console.error('Error fetching modules:', modulesError)
      }

      // Transform data for frontend
      const transformedModules = (modules || []).map((m: {
        id: string
        title: string
        description: string | null
        order: number
        lessons: Array<{
          id: string
          title: string
          description: string | null
          youtube_id: string
          duration: number
          order: number
          has_quiz: boolean
          module_id: string
        }>
      }) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        order: m.order,
        lessons: (m.lessons || []).map((l) => ({
          id: l.id,
          title: l.title,
          description: l.description,
          youtubeId: l.youtube_id,
          duration: l.duration,
          order: l.order,
          hasQuiz: l.has_quiz,
          moduleId: l.module_id
        }))
      }))

      // Calculate progress
      const totalLessons = transformedModules.reduce((acc: number, m: { lessons: unknown[] }) => acc + m.lessons.length, 0)
      const completedLessons = enrollment.lesson_progress?.filter((p: { completed: boolean }) => p.completed).length || 0
      const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

      // Transform progress for frontend
      const progress = (enrollment.lesson_progress || []).map((p: { lesson_id: string; completed: boolean; watch_time: number }) => ({
        lessonId: p.lesson_id,
        completed: p.completed,
        watchTime: p.watch_time
      }))

      return NextResponse.json({
        success: true,
        enrollment: {
          id: enrollment.id,
          email: enrollment.email,
          name: enrollment.name,
          enrolledAt: enrollment.enrolled_at,
          progress: progressPercent,
          completedLessons,
          totalLessons
        },
        modules: transformedModules,
        progress
      })
    }

    // Fallback to Prisma/SQLite
    const enrollment = await db.courseEnrollment.findFirst({
      where: {
        email: email.toLowerCase(),
        paymentStatus: 'completed'
      },
      include: {
        lessonProgress: true
      }
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: 'No active enrollment found. Please contact support if you have already enrolled.' },
        { status: 404 }
      )
    }

    // Update last accessed
    await db.courseEnrollment.update({
      where: { id: enrollment.id },
      data: { lastAccessedAt: new Date() }
    })

    // Get modules
    const modules = await db.courseModule.findMany({
      where: { isActive: true },
      include: {
        lessons: {
          where: { isActive: true },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { order: 'asc' }
    })

    // Transform modules for frontend
    const transformedModules = modules.map(m => ({
      id: m.id,
      title: m.title,
      description: m.description,
      order: m.order,
      lessons: m.lessons.map(l => ({
        id: l.id,
        title: l.title,
        description: l.description,
        youtubeId: l.youtubeId,
        duration: l.duration,
        order: l.order,
        hasQuiz: l.hasQuiz,
        moduleId: l.moduleId
      }))
    }))

    // Calculate progress
    const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
    const completedLessons = enrollment.lessonProgress.filter(p => p.completed).length
    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    // Transform progress for frontend
    const progress = enrollment.lessonProgress.map(p => ({
      lessonId: p.lessonId,
      completed: p.completed,
      watchTime: p.watchTime
    }))

    return NextResponse.json({
      success: true,
      enrollment: {
        id: enrollment.id,
        email: enrollment.email,
        name: enrollment.name,
        enrolledAt: enrollment.enrolledAt.toISOString(),
        progress: progressPercent,
        completedLessons,
        totalLessons
      },
      modules: transformedModules,
      progress
    })
  } catch (error) {
    console.error('Error verifying enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to verify enrollment' },
      { status: 500 }
    )
  }
}

// PUT - Create new enrollment (for admin/payment)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name, phone, paidAmount = 80 } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // If Supabase is configured, use it
    if (supabaseAdmin) {
      // Check if email already exists
      const { data: existing } = await supabaseAdmin
        .from('enrollments')
        .select('id')
        .eq('email', email.toLowerCase())
        .single()

      if (existing) {
        return NextResponse.json(
          { error: 'Email already enrolled' },
          { status: 400 }
        )
      }

      // Create enrollment
      const { data: enrollment, error } = await supabaseAdmin
        .from('enrollments')
        .insert({
          email: email.toLowerCase(),
          name,
          phone,
          payment_status: 'pending',
          paid_amount: paidAmount
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating enrollment:', error)
        return NextResponse.json(
          { error: 'Failed to create enrollment' },
          { status: 500 }
        )
      }

      return NextResponse.json({
        success: true,
        enrollment
      })
    }

    // Fallback to Prisma/SQLite
    const existing = await db.courseEnrollment.findFirst({
      where: { email: email.toLowerCase() }
    })

    if (existing) {
      return NextResponse.json(
        { error: 'Email already enrolled' },
        { status: 400 }
      )
    }

    const enrollment = await db.courseEnrollment.create({
      data: {
        email: email.toLowerCase(),
        name,
        phone,
        paymentStatus: 'pending',
        paidAmount
      }
    })

    return NextResponse.json({
      success: true,
      enrollment
    })
  } catch (error) {
    console.error('Error creating enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}
