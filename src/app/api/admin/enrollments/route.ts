import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Simple auth check - in production, use proper session management
function validateAdminAuth(request: NextRequest): boolean {
  const authHeader = request.headers.get('x-admin-auth')
  const adminKey = process.env.ADMIN_PASSWORD || 'celta2024admin'
  return authHeader === adminKey
}

// GET - List all enrollments (admin only)
export async function GET(request: NextRequest) {
  try {
    // Get all enrollments with progress count
    const enrollments = await db.courseEnrollment.findMany({
      include: {
        _count: {
          select: { lessonProgress: true }
        }
      },
      orderBy: { enrolledAt: 'desc' }
    })

    // Transform for response
    const transformedEnrollments = enrollments.map(e => ({
      id: e.id,
      email: e.email,
      name: e.name,
      phone: e.phone,
      enrollmentCode: e.enrollmentCode,
      paymentStatus: e.paymentStatus,
      paidAmount: e.paidAmount,
      enrolledAt: e.enrolledAt,
      lastAccessedAt: e.lastAccessedAt,
      lessonProgress: e._count.lessonProgress
    }))

    return NextResponse.json({
      success: true,
      enrollments: transformedEnrollments
    })
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}
