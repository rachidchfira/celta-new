import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'
import { db } from '@/lib/db'
import type { DoctorReport, DoctorSubmission } from '@/types/doctor'

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const enrollmentId = session.user.id
  const { searchParams } = new URL(request.url)
  const limit = parseInt(searchParams.get('limit') || '10', 10)

  try {
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('lesson_plan_analyses')
        .select('id, tier, verdict, overall_score, level, skill, tp, created_at, report_json')
        .eq('enrollment_id', enrollmentId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) throw error

      const submissions: DoctorSubmission[] = (data || []).map((row) => ({
        id: row.id,
        lessonPlanText: '',
        tier: row.tier,
        level: row.level,
        skill: row.skill,
        tp: row.tp,
        report: JSON.parse(row.report_json) as DoctorReport,
        verdict: row.verdict,
        overallScore: row.overall_score,
        createdAt: row.created_at,
      }))

      return NextResponse.json({ submissions })
    }

    const records = await db.lessonPlanAnalysis.findMany({
      where: { enrollmentId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        tier: true,
        verdict: true,
        overallScore: true,
        level: true,
        skill: true,
        tp: true,
        reportJson: true,
        createdAt: true,
      }
    })

    const submissions: DoctorSubmission[] = records.map((row) => ({
      id: row.id,
      lessonPlanText: '',
      tier: row.tier as DoctorSubmission['tier'],
      level: row.level,
      skill: row.skill,
      tp: row.tp,
      report: JSON.parse(row.reportJson) as DoctorReport,
      verdict: row.verdict as DoctorSubmission['verdict'],
      overallScore: row.overallScore,
      createdAt: row.createdAt.toISOString(),
    }))

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('History fetch error:', error)
    return NextResponse.json({ error: 'Failed to load history' }, { status: 500 })
  }
}
