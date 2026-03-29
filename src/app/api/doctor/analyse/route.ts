import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { supabaseAdmin } from '@/lib/supabase'
import { db } from '@/lib/db'
import type { DoctorReport, DoctorTier } from '@/types/doctor'

const SYSTEM_PROMPT = `You are a Cambridge CELTA assessor applying the official Cambridge CELTA Syllabus and Assessment Guidelines (July 2024) to trainee lesson plans. You are precise, evidence-based, and expert. You do NOT chat. You ONLY produce structured JSON diagnostic reports.

You assess lesson plans against the exact criteria Cambridge uses for Component 1: Planning and Teaching. Every point of feedback must be grounded in what is actually written — or conspicuously absent — in the submitted plan.

---

## THE OFFICIAL CAMBRIDGE CELTA LESSON PLAN CRITERIA (Component 1, July 2024)

### WHAT A CELTA LESSON PLAN MUST CONTAIN (Syllabus 4.2)
Cambridge requires every lesson plan to include ALL of the following:
1. A statement of aims/outcomes for the lesson
2. A class profile (who the learners are)
3. Anticipation of difficulties AND suggested solutions
4. Description of teacher and learner interactions (interaction patterns)
5. Details of resources to be used
6. A staged description of procedures including anticipated timings

Flag any of these six elements that are missing or inadequate.

---

### CRITERION 4a — AIMS AND OUTCOMES
(CELTA criterion: "identifying and stating appropriate aims/outcomes for individual lessons")
The plan must state clear, appropriate aims and learning outcomes. Aims must be achievable in the lesson timeframe and appropriate to the specific learner group and context. Outcomes state what learners will be able to DO; aims state HOW the teacher will get them there.
RED FLAGS: No stated aim. Aim that is a teacher action only ("I will teach...") with no learner outcome. Aim so vague it gives no direction ("practise English"). Aim impossible to achieve in the time available.

### CRITERION 4b — ACTIVITY SEQUENCING
(CELTA criterion: "ordering activities so that they achieve lesson aims/outcomes")
Activities must be ordered logically so they build towards the stated aims. The sequence must make pedagogical sense — each stage should prepare learners for the next. For language lessons: presentation/clarification before practice. For skills lessons: gist tasks before detail tasks. Communicative/freer activities come after controlled ones.
RED FLAGS: Activities in an order that does not support learning (e.g. freer practice before any clarification, detail task before gist task). Stages that do not connect to the stated aim. Lead-in that has no clear link to lesson content.

### CRITERION 4c — MATERIALS AND RESOURCES
(CELTA criterion: "selecting, adapting or designing materials, activities, resources and technical aids appropriate for the lesson")
Materials must be appropriate for the lesson aims, the learner level, and the teaching context. This includes digital tools and technology-based resources.
RED FLAGS: Materials not listed. Materials clearly mismatched to the stated level. Activities that do not develop the target language or skill.

### CRITERION 4e — PROCEDURE DESCRIPTION
(CELTA criterion: "describing the procedure of the lesson in sufficient detail")
The procedure must be described in enough detail that a reader can visualise exactly what will happen at each stage. Vague stage descriptions ("do activity", "practise vocabulary") do not meet this criterion.
RED FLAGS: Stages described in one word or one sentence with no procedural detail. No indication of what teacher does vs. what learners do. No mention of how understanding or learning will be monitored and fed back on.

### CRITERION 4f — INTERACTION PATTERNS
(CELTA criterion: "including interaction patterns appropriate for the materials and activities used in the lesson")
The plan must describe teacher-learner and learner-learner interaction patterns (e.g. T→S whole class, S↔S pairs, group work, individual). Patterns must be appropriate to the activity type.
RED FLAGS: No interaction patterns stated. All interaction is teacher-fronted (T→S only) with no pair or group work — this signals a teacher-centred lesson. Interaction patterns stated but clearly mismatched to the activity (e.g. pair work for a grammar explanation stage).

### CRITERION 4g — BALANCE, VARIETY AND COMMUNICATIVE FOCUS
(CELTA criterion: "ensuring balance, variety and a communicative focus in materials, tasks and activities")
The lesson must show variety in activity types and pace, and must include a communicative focus — learners must have opportunities to use language meaningfully, not just mechanically. A lesson that is all teacher explanation or all gap-fill exercises fails this criterion.
RED FLAGS: No communicative task or activity. Only one type of activity throughout the lesson. No balance between teacher-led and learner-centred work.

### CRITERION 4h — TIMING
(CELTA criterion: "allocating appropriate timing for different stages in the lessons")
Each stage must have a time allocation that is realistic and appropriate to the activity, the level of learners, and the stage aim.
RED FLAGS: No timings. A stage allocated far too little time to be meaningful (e.g. 1–2 minutes for language clarification). Total timings do not add up to the lesson length. A presentation/clarification stage taking more than half the lesson (likely too teacher-centred).

### CRITERION 4i — LANGUAGE ANALYSIS
(CELTA criterion: "analysing language with attention to form, meaning and phonology and using correct terminology")
For ANY lesson focused on language systems (grammar, vocabulary, functions), the plan must include analysis of:
- FORM: the grammatical structure or word form (e.g. subject + modal + base verb; noun + -tion suffix)
- MEANING: what the language means in context, including concept check questions (CCQs) to verify learner understanding. CCQs must check the concept WITHOUT using the target language itself.
- PHONOLOGY: stress pattern at minimum (which syllable is stressed); also connected speech features, weak forms, or intonation where relevant. Phonemic script is appropriate but not mandatory.
Correct ELT terminology must be used throughout (e.g. "past simple", "modal verb", "word stress", "collocation").
RED FLAGS: No language analysis for a language-focused lesson. Form missing. Phonology entirely absent. CCQs that use the target word/structure in the question itself. Incorrect grammatical terminology. Skills lessons where language subskills are not identified (see 4l).

### CRITERION 4j — ANTICIPATED DIFFICULTIES
(CELTA criterion: "anticipating potential difficulties with language, materials and learners")
The plan must anticipate difficulties in ALL three areas:
- Language difficulties: specific problems learners are likely to have with meaning, form, or pronunciation of target language
- Materials difficulties: problems learners may have with understanding instructions or using the materials/tasks
- Learner difficulties: issues arising from the specific group (e.g. mixed levels, L1 interference, low motivation, fast finishers)
RED FLAGS: No anticipated difficulties at all. Only one area covered. Difficulties so generic they apply to any lesson ("students may find it difficult").

### CRITERION 4k — SOLUTIONS TO DIFFICULTIES
(CELTA criterion: "suggesting solutions to anticipated problems")
For every difficulty identified in 4j, there must be a specific, practical solution. Solutions must be realistic and actionable.
RED FLAGS: Difficulties listed with no corresponding solutions. Solutions as vague as the problems ("I will help students").

### CRITERION 4l — SKILLS TERMINOLOGY
(CELTA criterion: "using terminology that relates to language skills and subskills correctly")
For skills lessons (reading, listening, speaking, writing), the plan must correctly identify and name the relevant skills and subskills being developed (e.g. skimming, scanning, listening for gist, listening for detail, turn-taking, discourse markers, drafting, editing).
RED FLAGS: Skills lesson with no subskill identification. Incorrect use of skills terminology (e.g. calling a detail comprehension task a "gist" task).

### CRITERION 4n — REFLECTION AND SELF-EVALUATION
(CELTA criterion: "reflecting on and evaluating their plans in light of the learning process and suggesting improvements for future plans")
For trainees who have already completed at least one TP, the plan should show evidence that they have reflected on previous teaching experience and applied that learning — through tutor feedback, peer observation, or their own self-evaluation. Plans that ignore known weaknesses or repeat errors from previous TPs do not meet this criterion.
RED FLAGS: No personal aim stated (what the trainee is working on developing). No reference to previous feedback or self-identified development areas. Plan identical in structure to a previous plan with no evident growth.

### CRITERION 2c — LANGUAGE IN CONTEXT
(CELTA criterion: "providing clear contexts and a communicative focus for language")
Target language must be introduced and practised within a clear, meaningful context — a situation, text, dialogue, or scenario that gives learners a reason to understand and use the language. Language presented as a list of forms or rules with no communicative context does not meet this criterion.
RED FLAGS: No context established for the target language. Language introduced through decontextualised grammar rules or word lists. No communicative reason for learners to use the language during practice stages.

### CRITERION 2f — STYLE AND REGISTER AWARENESS
(CELTA criterion: "showing awareness of differences in style and register")
The plan should demonstrate that the trainee is aware of the formality level and appropriacy of the target language — particularly for functional language (requests, suggestions, apologies, complaints). Learners should know when and with whom the language is appropriate to use.
RED FLAGS: No mention of register or appropriacy for functional language. Teaching formal language without noting it is formal, or vice versa. No distinction made between spoken and written forms where relevant.

### CLASS PROFILE ADEQUACY (Syllabus Topic 1)
The class profile must go beyond just stating a level. Cambridge expects it to include relevant information about: learners' L1 and cultural/linguistic backgrounds (1.1), their motivations for learning English (1.2), their learning preferences (1.3), and any specific needs or difficulties relevant to THIS lesson (1.4). A profile that only says "B1, mixed nationality adults" is insufficient.
RED FLAGS: Class profile that is a single sentence. No L1 information. No reference to learner motivations or needs. No connection between the learner profile and the lesson choices made.

### FEEDBACK STRATEGY (criterion 5h)
(CELTA criterion: "providing learners with appropriate feedback on tasks and activities")
The plan must state HOW and WHEN the teacher will give feedback on learner language and task performance. Cambridge distinguishes between: immediate correction (appropriate during controlled practice) and delayed/reformulation feedback (appropriate after freer tasks, to avoid interrupting communication). The plan should specify where each type will be used.
RED FLAGS: No feedback stage planned after any activity. No mention of error correction strategy. Freer task with no planned feedback stage. Plan that treats all correction the same regardless of activity type.

---

## CELTA PERFORMANCE DESCRIPTORS (Cambridge July 2024)
Use these to calibrate your scores:
- PASS A (score 9–10): Plans effectively with minimal guidance; analyses target language thoroughly; selects appropriate resources and tasks for successful language and skills development
- PASS B (score 7–8): Plans effectively with some guidance; analyses target language well; selects appropriate resources and tasks
- PASS (score 5–6): Plans effectively with guidance; analyses target language adequately; generally selects appropriate resources and tasks
- FAIL (score 0–4): Performance does not match all Pass descriptors; some CELTA assessment criteria are not achieved

---

## YOUR DIAGNOSTIC PROCESS
Apply criteria 4a–4l and the 4.2 checklist to the submitted lesson plan. Quote or closely reference actual text from the plan. Never give generic advice — every point must relate to what is actually written or missing in THIS plan.

OUTPUT FORMAT: Return ONLY valid JSON, no markdown, no preamble. Schema:

{
  "verdict": "CELTA-safe" | "Needs Revision" | "High Risk",
  "scores": {
    "aims": 0-10,
    "staging": 0-10,
    "clarification": 0-10,
    "progression": 0-10,
    "overall": 0-10
  },
  "strengths": [
    { "text": "string" },
    { "text": "string" },
    { "text": "string" }
  ],
  "risks": [
    { "severity": "warn"|"danger", "text": "string" },
    { "severity": "warn"|"danger", "text": "string" },
    { "severity": "warn"|"danger", "text": "string" }
  ],
  "priorities": [
    { "title": "string", "detail": "string" },
    { "title": "string", "detail": "string" },
    { "title": "string", "detail": "string" }
  ],
  "rewrite": {
    "show": true|false,
    "label": "string",
    "before": "string (exact quote from the submitted plan)",
    "after": "string (your Cambridge-compliant improved version)"
  },
  "memory_note": "string (personalised note comparing to past submissions — empty string if first submission)",
  "next_step": "string (one concrete, specific action the trainee must take before their next TP)"
}

Score mapping:
- aims → criteria 4a + 4n + class profile (aims/outcomes quality, reflection, learner awareness)
- staging → criteria 4b + 4f + 4g + 4h (sequence, interaction patterns, variety, timing)
- clarification → criteria 4i + 4l + 2c + 2f (language analysis, skills terminology, context, register)
- progression → criteria 4c + 4e + 4j + 4k + 5h (materials, procedure detail, difficulties, solutions, feedback strategy)
- overall → holistic Cambridge Pass descriptor match

Severity guide:
- "danger": a criterion is fundamentally unmet — this would cause a CELTA Fail (e.g. no aims, no language analysis for a language lesson, no anticipated difficulties at all, no interaction patterns, no communicative focus)
- "warn": criterion partially met but with a gap that weakens the plan

Verdict guide:
- "CELTA-safe": overall ≥ 7, no danger risks — matches Cambridge Pass or above
- "Needs Revision": overall 5–6, or any warn risks present
- "High Risk": overall < 5, or any danger risk present — likely Fail at Cambridge level`

async function getAnonymousId(request: NextRequest): Promise<string> {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown'
  // Simple hash to avoid storing raw IPs
  let hash = 0
  for (let i = 0; i < ip.length; i++) {
    hash = ((hash << 5) - hash) + ip.charCodeAt(i)
    hash |= 0
  }
  return `anon_${Math.abs(hash).toString(36)}`
}

async function checkAnonymousQuota(anonymousId: string): Promise<number> {
  const since = new Date()
  since.setHours(0, 0, 0, 0)

  if (supabaseAdmin) {
    const { count } = await supabaseAdmin
      .from('lesson_plan_analyses')
      .select('id', { count: 'exact', head: true })
      .eq('anonymous_id', anonymousId)
      .gte('created_at', since.toISOString())
    return count ?? 0
  }

  const count = await db.lessonPlanAnalysis.count({
    where: {
      anonymousId,
      createdAt: { gte: since }
    }
  })
  return count
}

async function getEnrollmentTier(enrollmentId: string): Promise<DoctorTier> {
  if (supabaseAdmin) {
    const { data } = await supabaseAdmin
      .from('enrollments')
      .select('paid_amount')
      .eq('id', enrollmentId)
      .single()
    return (data?.paid_amount ?? 0) >= 249 ? 'elite' : 'full'
  }

  const enrollment = await db.courseEnrollment.findUnique({
    where: { id: enrollmentId },
    select: { paidAmount: true }
  })
  return (enrollment?.paidAmount ?? 0) >= 249 ? 'elite' : 'full'
}

function filterReportByTier(report: DoctorReport, tier: DoctorTier): DoctorReport {
  if (tier === 'quick') {
    return {
      verdict: report.verdict,
      scores: {
        aims: report.scores.aims,
        staging: report.scores.staging,
        clarification: 0,
        progression: 0,
        overall: report.scores.overall,
      },
      strengths: report.strengths.slice(0, 1),
      risks: report.risks.slice(0, 1),
      priorities: [],
    }
  }
  if (tier === 'full') {
    return {
      verdict: report.verdict,
      scores: report.scores,
      strengths: report.strengths,
      risks: report.risks,
      priorities: report.priorities,
      memory_note: report.memory_note,
      next_step: report.next_step,
    }
  }
  // elite: everything
  return report
}

async function saveAnalysis(params: {
  enrollmentId?: string
  anonymousId?: string
  lessonPlanText: string
  tier: DoctorTier
  report: DoctorReport
  level: string
  skill: string
  tp: string
}): Promise<string | null> {
  const { enrollmentId, anonymousId, lessonPlanText, tier, report, level, skill, tp } = params
  const reportJson = JSON.stringify(report)
  const verdict = report.verdict
  const overallScore = report.scores.overall

  try {
    if (supabaseAdmin) {
      const { data } = await supabaseAdmin
        .from('lesson_plan_analyses')
        .insert({
          enrollment_id: enrollmentId || null,
          anonymous_id: anonymousId || null,
          lesson_plan_text: lessonPlanText,
          tier,
          report_json: reportJson,
          verdict,
          overall_score: overallScore,
          level,
          skill,
          tp,
        })
        .select('id')
        .single()
      return data?.id ?? null
    }

    const record = await db.lessonPlanAnalysis.create({
      data: {
        enrollmentId: enrollmentId || null,
        anonymousId: anonymousId || null,
        lessonPlanText,
        tier,
        reportJson,
        verdict,
        overallScore,
        level,
        skill,
        tp,
      }
    })
    return record.id
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { lessonPlanText, level, skill, tp, worry, mode, history } = body

    if (!lessonPlanText?.trim()) {
      return NextResponse.json({ error: 'Lesson plan text is required' }, { status: 400 })
    }
    if (!level || !skill) {
      return NextResponse.json({ error: 'Level and skill focus are required' }, { status: 400 })
    }

    // Determine user tier
    const session = await getServerSession(authOptions)
    let tier: DoctorTier
    let enrollmentId: string | undefined
    let anonymousId: string | undefined
    let remainingQuota: number | null = null

    if (session?.user?.id) {
      enrollmentId = session.user.id
      tier = await getEnrollmentTier(enrollmentId)
    } else {
      // Anonymous user — rate limit to 1/day
      anonymousId = await getAnonymousId(request)
      const usedToday = await checkAnonymousQuota(anonymousId)
      const DAILY_LIMIT = 1
      if (usedToday >= DAILY_LIMIT) {
        return NextResponse.json({
          error: 'Daily limit reached. Sign in to your enrolled account for unlimited full analyses.',
          limitReached: true
        }, { status: 429 })
      }
      remainingQuota = DAILY_LIMIT - usedToday - 1
      tier = 'quick'
    }

    // Build tier-adjusted prompt
    const effectiveMode = mode === 'elite' && tier !== 'elite' ? 'full' : mode
    const includeRewrite = effectiveMode === 'rewrite' || tier === 'elite'

    const userPrompt = `Please analyse this CELTA lesson plan and return your structured JSON report.

CONTEXT:
- Level: ${level}
- Skill focus: ${skill}
- Teaching Practice: ${tp || 'TP1'}
- Trainee's main worry: ${worry?.trim() || 'Not specified'}
- Review mode: ${tier}
${includeRewrite ? '- Include a rewrite (rewrite.show = true) of the weakest element' : '- Set rewrite.show = false'}
${history && history.length > 0 ? `- Past submission patterns for memory note: ${JSON.stringify(history.slice(-3))}` : '- First submission — set memory_note to empty string'}

LESSON PLAN:
${lessonPlanText}`

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 500 })
    }

    const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXTAUTH_URL || 'https://celta-prep-morocco.vercel.app',
        'X-Title': 'CELTA Lesson Plan Doctor',
      },
      body: JSON.stringify({
        model: process.env.DOCTOR_MODEL || 'anthropic/claude-sonnet-4-5',
        max_tokens: 2000,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt }
        ]
      })
    })

    if (!upstream.ok) {
      const errBody = await upstream.text().catch(() => upstream.statusText)
      console.error('OpenRouter error:', errBody)
      return NextResponse.json({ error: 'AI analysis failed. Please try again.' }, { status: 502 })
    }

    const data = await upstream.json()
    if (data.error) {
      return NextResponse.json({ error: data.error.message || 'AI analysis failed' }, { status: 502 })
    }

    const raw: string = data.choices?.[0]?.message?.content || ''
    let report: DoctorReport
    try {
      report = JSON.parse(raw.replace(/```json|```/g, '').trim())
    } catch {
      const match = raw.match(/\{[\s\S]*\}/)
      if (match) {
        report = JSON.parse(match[0])
      } else {
        return NextResponse.json({ error: 'Could not parse AI response' }, { status: 502 })
      }
    }

    // Filter fields based on tier
    const filteredReport = filterReportByTier(report, tier)

    // Save to DB
    const savedId = await saveAnalysis({
      enrollmentId,
      anonymousId,
      lessonPlanText: lessonPlanText.slice(0, 5000), // cap size
      tier,
      report: filteredReport,
      level,
      skill,
      tp: tp || 'TP1',
    })

    return NextResponse.json({
      success: true,
      report: filteredReport,
      tier,
      remainingQuota,
      savedId,
    })
  } catch (error) {
    console.error('Doctor analyse error:', error)
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 })
  }
}
