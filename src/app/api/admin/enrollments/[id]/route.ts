import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// DELETE - Remove an enrollment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Delete lesson progress first
    await db.lessonProgress.deleteMany({
      where: { enrollmentId: id }
    })

    // Delete enrollment
    await db.courseEnrollment.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: 'Enrollment deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to delete enrollment' },
      { status: 500 }
    )
  }
}

// GET - Get single enrollment details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const enrollment = await db.courseEnrollment.findUnique({
      where: { id },
      include: {
        lessonProgress: {
          include: {
            lesson: {
              select: {
                id: true,
                title: true,
                moduleId: true
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

    return NextResponse.json({
      success: true,
      enrollment: {
        id: enrollment.id,
        email: enrollment.email,
        name: enrollment.name,
        phone: enrollment.phone,
        enrollmentCode: enrollment.enrollmentCode,
        paymentStatus: enrollment.paymentStatus,
        paidAmount: enrollment.paidAmount,
        enrolledAt: enrollment.enrolledAt,
        lastAccessedAt: enrollment.lastAccessedAt,
        lessonProgress: enrollment.lessonProgress.map(p => ({
          id: p.id,
          lessonId: p.lessonId,
          completed: p.completed,
          watchTime: p.watchTime,
          notes: p.notes,
          lesson: p.lesson
        }))
      }
    })
  } catch (error) {
    console.error('Error fetching enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollment' },
      { status: 500 }
    )
  }
}
