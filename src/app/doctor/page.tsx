'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { Stethoscope, CheckCircle2, X, Loader2 } from 'lucide-react'
import { DoctorIntakeForm } from '@/components/doctor/DoctorIntakeForm'
import { DoctorReport } from '@/components/doctor/DoctorReport'
import { DoctorDashboard } from '@/components/doctor/DoctorDashboard'
import type { DoctorReport as DoctorReportType, DoctorSubmission, DoctorTier, DoctorAnalyseRequest } from '@/types/doctor'

const STORAGE_KEY = 'celta_doctor_history'

const DIAGNOSTIC_TOOLS = [
  'Checking main aim quality...',
  'Checking subsidiary aim alignment...',
  'Analysing stage sequence...',
  'Checking MFPA clarification...',
  'Checking task progression...',
  'Detecting common CELTA risks...',
  'Compiling precision report...',
]

type ViewState = 'form' | 'loading' | 'report'

export default function DoctorPage() {
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const isLoading = status === 'loading'

  const [view, setView] = useState<ViewState>('form')
  const [report, setReport] = useState<DoctorReportType | null>(null)
  const [reportMeta, setReportMeta] = useState<{ level: string; skill: string; tp: string; tier: DoctorTier } | null>(null)
  const [submissions, setSubmissions] = useState<DoctorSubmission[]>([])
  const [loadingTool, setLoadingTool] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [remainingQuota, setRemainingQuota] = useState<number | null>(null)
  const [tier, setTier] = useState<DoctorTier>('quick')

  const [prefillText, setPrefillText] = useState('')

  // Load history from localStorage on mount and check for prefill
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setSubmissions(JSON.parse(stored))
      }
    } catch {
      // ignore
    }

    // Check for prefill from landing page teaser
    try {
      const prefill = sessionStorage.getItem('doctor_prefill')
      if (prefill) {
        setPrefillText(prefill)
        sessionStorage.removeItem('doctor_prefill')
      }
    } catch {
      // ignore
    }
  }, [])

  // If authenticated, load DB history and merge
  const loadDbHistory = useCallback(async () => {
    if (!isAuthenticated) return
    try {
      const res = await fetch('/api/doctor/history?limit=10')
      if (res.ok) {
        const data = await res.json()
        if (data.submissions?.length) {
          setSubmissions(prev => {
            // Merge: DB results take precedence, deduplicate by id
            const dbIds = new Set(data.submissions.map((s: DoctorSubmission) => s.id))
            const localOnly = prev.filter(s => !dbIds.has(s.id))
            const merged = [...data.submissions, ...localOnly].sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ).slice(0, 20)
            return merged
          })
          // Determine tier from first enrolled submission
          setTier('full')
        } else {
          setTier('full')
        }
      }
    } catch {
      // fallback to localStorage only
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isAuthenticated) {
      loadDbHistory()
    }
  }, [isAuthenticated, loadDbHistory])

  // Update tier based on session
  useEffect(() => {
    if (!isAuthenticated) {
      setTier('quick')
    }
    // Actual elite tier is determined server-side; we can check via history API response
  }, [isAuthenticated])

  function saveToLocalStorage(submission: DoctorSubmission) {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const existing: DoctorSubmission[] = stored ? JSON.parse(stored) : []
      const updated = [submission, ...existing].slice(0, 20)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      setSubmissions(updated)
    } catch {
      // ignore
    }
  }

  function animateTools() {
    let idx = 0
    const interval = setInterval(() => {
      idx++
      setLoadingTool(idx)
      if (idx >= DIAGNOSTIC_TOOLS.length - 1) {
        clearInterval(interval)
      }
    }, 600)
    return interval
  }

  async function handleSubmit(data: DoctorAnalyseRequest) {
    setView('loading')
    setLoadingTool(0)
    setError(null)

    const toolInterval = animateTools()

    try {
      const historySnippet = submissions.slice(0, 3).map(s => ({
        risks: s.report.risks.map(r => r.text.slice(0, 60))
      }))

      const res = await fetch('/api/doctor/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, history: historySnippet })
      })

      const result = await res.json()

      clearInterval(toolInterval)

      if (!res.ok || result.error) {
        setError(result.error || 'Analysis failed. Please try again.')
        setView('form')
        return
      }

      const submission: DoctorSubmission = {
        id: result.savedId || `local_${Date.now()}`,
        lessonPlanText: data.lessonPlanText,
        tier: result.tier,
        level: data.level,
        skill: data.skill,
        tp: data.tp,
        report: result.report,
        verdict: result.report.verdict,
        overallScore: result.report.scores.overall,
        createdAt: new Date().toISOString(),
      }

      if (!isAuthenticated) {
        saveToLocalStorage(submission)
      } else {
        // DB already saved server-side; refresh history
        setSubmissions(prev => [submission, ...prev].slice(0, 20))
      }

      if (result.remainingQuota !== null) {
        setRemainingQuota(result.remainingQuota)
      }

      setTier(result.tier)
      setReport(result.report)
      setReportMeta({ level: data.level, skill: data.skill, tp: data.tp, tier: result.tier })

      // Small delay to let last tool animation finish
      setTimeout(() => setView('report'), 400)

    } catch {
      clearInterval(toolInterval)
      setError('Connection error. Please check your internet and try again.')
      setView('form')
    }
  }

  function handleSelectHistory(submission: DoctorSubmission) {
    setReport(submission.report)
    setReportMeta({ level: submission.level, skill: submission.skill, tp: submission.tp, tier: submission.tier })
    setView('report')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <div className="bg-[#0b1c36] border-b border-[#c9a84c]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#c9a84c] flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-[#0b1c36]" />
            </div>
            <div>
              <h1 className="font-display text-lg font-bold text-white leading-none">AI Lesson Doctor</h1>
              <p className="font-mono text-[10px] tracking-widest uppercase text-[#c9a84c]/60 mt-0.5">CELTA Precision Review</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-full px-3 py-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span className="font-body text-xs text-[#c9a84c] font-medium">{session.user?.name || session.user?.email}</span>
              </div>
            ) : (
              <a href="/course" className="font-body text-xs text-white/50 hover:text-[#c9a84c] transition-colors">
                Sign in for full access →
              </a>
            )}
            <a href="/" className="font-body text-xs text-white/30 hover:text-white/60 transition-colors">← Home</a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error banner */}
        {error && (
          <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4">
            <X className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="font-body text-sm text-red-700">{error}</p>
            <button onClick={() => setError(null)} className="ml-auto text-red-400 hover:text-red-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 animate-spin text-[#c9a84c]" />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main content area */}
            <div className="lg:col-span-2">
              {view === 'form' && (
                <div className="bg-white rounded-2xl border border-[#d4cdc0] shadow-sm overflow-hidden">
                  {/* Card header */}
                  <div className="bg-[#0b1c36] px-6 py-5 relative overflow-hidden">
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-8xl font-light text-[#c9a84c]/5 pointer-events-none select-none">Rx</div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-[#c9a84c] mb-1.5">AI-Powered Diagnostic</p>
                    <h2 className="font-display text-xl font-bold text-white">Is Your Lesson Plan CELTA-Ready?</h2>
                    <p className="font-body text-sm text-white/45 mt-1">
                      7 specialist diagnostic tools. Expert-level feedback. In seconds.
                    </p>
                  </div>
                  <div className="p-6">
                    <DoctorIntakeForm
                      onSubmit={handleSubmit}
                      isLoading={view === 'loading'}
                      tier={tier}
                      remainingQuota={remainingQuota}
                      isAuthenticated={isAuthenticated}
                      initialText={prefillText}
                    />
                  </div>
                </div>
              )}

              {view === 'loading' && (
                <div className="bg-white rounded-2xl border border-[#d4cdc0] shadow-sm p-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-[#0b1c36] flex items-center justify-center mx-auto mb-4">
                      <Stethoscope className="w-8 h-8 text-[#c9a84c] animate-pulse" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-[#0e0c0a] mb-1">Analysing Your Plan</h3>
                    <p className="font-body text-sm text-[#6b6560]">Running 7 CELTA diagnostic tools...</p>
                  </div>
                  <div className="space-y-3 max-w-sm mx-auto">
                    {DIAGNOSTIC_TOOLS.map((tool, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${
                          i < loadingTool
                            ? 'bg-[#f0f7f3] text-[#2a6b4a]'
                            : i === loadingTool
                            ? 'bg-[#0b1c36] text-[#c9a84c]'
                            : 'bg-[#f5f0e8] text-[#a09890]'
                        }`}
                      >
                        <div className="w-5 h-5 flex items-center justify-center flex-shrink-0">
                          {i < loadingTool ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : i === loadingTool ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <div className="w-2 h-2 rounded-full bg-current opacity-30" />
                          )}
                        </div>
                        <span className="font-body text-sm">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {view === 'report' && report && reportMeta && (
                <DoctorReport
                  report={report}
                  tier={reportMeta.tier}
                  level={reportMeta.level}
                  skill={reportMeta.skill}
                  tp={reportMeta.tp}
                  onStartOver={() => {
                    setView('form')
                    setReport(null)
                    setReportMeta(null)
                  }}
                />
              )}
            </div>

            {/* Sidebar — Dashboard */}
            <div className="lg:col-span-1 space-y-4">
              {/* What you get info */}
              {view === 'form' && !isAuthenticated && (
                <div className="bg-[#0b1c36] rounded-2xl p-5 space-y-3">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[#c9a84c]/60">Free Quick Scan</p>
                  <ul className="space-y-2">
                    {[
                      'Instant verdict (CELTA-safe / Needs Work / High Risk)',
                      'Overall score out of 10',
                      'Aims & staging scores',
                      'Top risk identified',
                      '1 strength highlighted',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                        <span className="font-body text-xs text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-white/10 pt-3">
                    <p className="font-body text-xs text-white/40 mb-2">Enrolled students also get:</p>
                    <ul className="space-y-1.5">
                      {[
                        'All 5 diagnostic scores',
                        'All risks & strengths',
                        'Priority fix order',
                        'Personalised next step',
                        'Pattern tracking across plans',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 opacity-50">
                          <div className="w-3.5 h-3.5 rounded border border-white/30 flex-shrink-0 mt-0.5" />
                          <span className="font-body text-xs text-white/50">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <a href="/course" className="inline-flex items-center gap-1.5 mt-3 font-body text-xs text-[#c9a84c] hover:underline font-medium">
                      Access with enrollment →
                    </a>
                  </div>
                </div>
              )}

              <DoctorDashboard
                submissions={submissions}
                onSelect={handleSelectHistory}
                isAuthenticated={isAuthenticated}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
