'use client'

import { useState, useRef } from 'react'
import type { DoctorReport } from '@/types/doctor'

const LEVELS = ['A1 Beginner', 'A2 Elementary', 'B1 Intermediate', 'B1+ Upper-Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced']
const SKILLS = ['Grammar', 'Vocabulary', 'Reading', 'Listening', 'Speaking', 'Writing', 'Functional Language']
const TPS = ['TP1', 'TP2', 'TP3', 'TP4', 'TP5', 'TP6']

const PROCESSING_STEPS = [
  'Checking aims & learning outcomes (4a)',
  'Analysing activity sequence (4b)',
  'Reviewing language analysis — form, meaning, phonology (4i)',
  'Evaluating interaction patterns & timing (4f, 4h)',
  'Checking anticipated difficulties & solutions (4j, 4k)',
  'Assessing communicative focus & variety (4g)',
  'Compiling Cambridge CELTA report',
]

function ScoreRing({ score, label }: { score: number; label: string }) {
  const r = 22
  const circ = 2 * Math.PI * r
  const fill = (score / 10) * circ
  const color = score >= 7 ? '#2a6b4a' : score >= 5 ? '#a8722a' : '#8b2233'

  return (
    <div className="text-center">
      <div className="relative w-14 h-14 mx-auto mb-2">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 56 56">
          <circle cx="28" cy="28" r={r} fill="none" stroke="#e2d8c8" strokeWidth="4" />
          <circle
            cx="28" cy="28" r={r} fill="none"
            stroke={color} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={`${fill} ${circ}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-serif text-base font-semibold text-[#0b1c36]">
          {score}
        </span>
      </div>
      <div className="font-mono text-[10px] tracking-widest uppercase text-[#6b5f50]">{label}</div>
    </div>
  )
}

export default function DoctorPage() {
  const [level, setLevel] = useState('')
  const [skill, setSkill] = useState('')
  const [tp, setTp] = useState('TP1')
  const [worry, setWorry] = useState('')
  const [planText, setPlanText] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(-1)
  const [report, setReport] = useState<DoctorReport | null>(null)
  const [tier, setTier] = useState<string>('quick')
  const [error, setError] = useState('')
  const [remainingQuota, setRemainingQuota] = useState<number | null>(null)
  const reportRef = useRef<HTMLDivElement>(null)

  const canSubmit = level && skill && planText.trim().length > 100

  async function handleSubmit() {
    if (!canSubmit) return
    setLoading(true)
    setError('')
    setReport(null)
    setStep(0)

    // Animate through steps
    const stepInterval = setInterval(() => {
      setStep(s => {
        if (s >= PROCESSING_STEPS.length - 2) {
          clearInterval(stepInterval)
          return s
        }
        return s + 1
      })
    }, 900)

    try {
      const res = await fetch('/api/doctor/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonPlanText: planText, level, skill, tp, worry }),
      })
      clearInterval(stepInterval)
      setStep(PROCESSING_STEPS.length - 1)

      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Analysis failed. Please try again.')
        setLoading(false)
        setStep(-1)
        return
      }

      setTimeout(() => {
        setReport(data.report)
        setTier(data.tier)
        setRemainingQuota(data.remainingQuota ?? null)
        setLoading(false)
        setStep(-1)
        setTimeout(() => reportRef.current?.scrollIntoView({ behavior: 'smooth' }), 100)
      }, 600)
    } catch {
      clearInterval(stepInterval)
      setError('Network error. Please try again.')
      setLoading(false)
      setStep(-1)
    }
  }

  const verdictStyle = report?.verdict === 'CELTA-safe'
    ? 'bg-[#f0f7f3] text-[#2a6b4a] border border-[#2a6b4a]/20'
    : report?.verdict === 'Needs Revision'
    ? 'bg-[#fdf6ec] text-[#a8722a] border border-[#a8722a]/20'
    : 'bg-[#fdf0f2] text-[#8b2233] border border-[#8b2233]/20'

  return (
    <div className="min-h-screen bg-[#f4efe6]">
      {/* Top nav */}
      <header className="bg-[#0b1c36] border-b border-[#c9a84c]/10 px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#c9a84c] flex items-center justify-center">
            <svg className="w-4 h-4 fill-[#0b1c36]" viewBox="0 0 18 18">
              <path d="M9 1a1 1 0 011 1v2.17A5.001 5.001 0 0113.83 8H16a1 1 0 010 2h-2.17A5.001 5.001 0 019 13.83V16a1 1 0 01-2 0v-2.17A5.001 5.001 0 014.17 10H2a1 1 0 010-2h2.17A5.001 5.001 0 018 4.17V2a1 1 0 011-1zm0 5a3 3 0 100 6 3 3 0 000-6z"/>
            </svg>
          </div>
          <div>
            <div className="font-serif text-[#f4efe6] text-sm font-semibold leading-none">AI Lesson Doctor</div>
            <div className="font-mono text-[#c9a84c]/50 text-[9px] tracking-widest uppercase">CELTA Precision Review</div>
          </div>
        </a>
        <a href="/" className="font-mono text-[10px] tracking-widest uppercase text-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors">
          ← Back to site
        </a>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">

        {/* Hero */}
        <div className="bg-[#0b1c36] rounded-xl p-10 mb-8 relative overflow-hidden">
          <div className="absolute right-8 top-1/2 -translate-y-1/2 font-serif text-[8rem] font-light text-[#c9a84c]/5 pointer-events-none select-none leading-none">Rx</div>
          <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] mb-3">Cambridge CELTA · July 2024 Criteria</div>
          <h1 className="font-serif text-3xl md:text-4xl font-semibold text-[#f4efe6] leading-tight mb-3">
            Upload your plan.<br />Get a <em className="italic text-[#e2c06a]">tutor-grade</em> review.
          </h1>
          <p className="text-[#f4efe6]/50 text-sm leading-relaxed max-w-lg">
            Assessed against the official Cambridge CELTA Component 1 criteria (4a–4n). Structured clinical review — not a chat. The way a senior CELTA trainer would do it.
          </p>
        </div>

        {/* Form */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div className="bg-white border border-[#e2d8c8] rounded-xl p-6">
            <label className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#6b5f50] block mb-2">
              Learner Level <span className="text-[#c9a84c]">*</span>
            </label>
            <select
              value={level}
              onChange={e => setLevel(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e2d8c8] rounded-lg font-sans text-sm text-[#18140f] bg-[#f4efe6] focus:outline-none focus:border-[#c9a84c] appearance-none"
            >
              <option value="">Select level…</option>
              {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          <div className="bg-white border border-[#e2d8c8] rounded-xl p-6">
            <label className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#6b5f50] block mb-2">
              Skill / Language Focus <span className="text-[#c9a84c]">*</span>
            </label>
            <select
              value={skill}
              onChange={e => setSkill(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e2d8c8] rounded-lg font-sans text-sm text-[#18140f] bg-[#f4efe6] focus:outline-none focus:border-[#c9a84c] appearance-none"
            >
              <option value="">Select focus…</option>
              {SKILLS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div className="bg-white border border-[#e2d8c8] rounded-xl p-6">
            <label className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#6b5f50] block mb-2">Teaching Practice</label>
            <select
              value={tp}
              onChange={e => setTp(e.target.value)}
              className="w-full px-3 py-2.5 border border-[#e2d8c8] rounded-lg font-sans text-sm text-[#18140f] bg-[#f4efe6] focus:outline-none focus:border-[#c9a84c] appearance-none"
            >
              {TPS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div className="bg-white border border-[#e2d8c8] rounded-xl p-6">
            <label className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#6b5f50] block mb-2">Your Main Worry (optional)</label>
            <input
              type="text"
              value={worry}
              onChange={e => setWorry(e.target.value)}
              placeholder="e.g. my aims aren't clear enough"
              className="w-full px-3 py-2.5 border border-[#e2d8c8] rounded-lg font-sans text-sm text-[#18140f] bg-[#f4efe6] focus:outline-none focus:border-[#c9a84c]"
            />
          </div>
        </div>

        <div className="bg-white border border-[#e2d8c8] rounded-xl p-6 mb-5">
          <label className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#6b5f50] block mb-2">
            Paste Your Lesson Plan <span className="text-[#c9a84c]">*</span>
          </label>
          <textarea
            value={planText}
            onChange={e => setPlanText(e.target.value)}
            rows={12}
            placeholder="Paste your full lesson plan here — aims, class profile, procedure, materials, anticipated difficulties, timings…"
            className="w-full px-3 py-3 border border-[#e2d8c8] rounded-lg font-sans text-sm text-[#18140f] bg-[#f4efe6] focus:outline-none focus:border-[#c9a84c] resize-y leading-relaxed"
          />
          <div className="text-right font-mono text-[10px] text-[#6b5f50] mt-1">{planText.length} chars {planText.length < 100 && '· minimum 100'}</div>
        </div>

        {/* Submit bar */}
        <div className="bg-white border border-[#e2d8c8] rounded-xl p-5 flex items-center justify-between gap-4 mb-8">
          <div>
            <div className="text-sm font-semibold text-[#0b1c36] mb-0.5">Ready to diagnose</div>
            <div className="text-xs text-[#6b5f50]">
              {remainingQuota !== null ? `${remainingQuota} free review${remainingQuota !== 1 ? 's' : ''} remaining today` : 'Assessed against Cambridge CELTA 2024 criteria'}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || loading}
            className="bg-[#c9a84c] hover:bg-[#e2c06a] disabled:opacity-50 disabled:cursor-not-allowed text-[#0b1c36] font-semibold text-sm px-8 py-3 rounded-lg transition-all flex items-center gap-2 whitespace-nowrap"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/>
            </svg>
            {loading ? 'Analysing…' : 'Run Analysis'}
          </button>
        </div>

        {/* Processing overlay */}
        {loading && (
          <div className="bg-[#142848] border border-[#c9a84c]/20 rounded-xl p-8 mb-8 text-center">
            <div className="w-14 h-14 rounded-full border-4 border-[#c9a84c]/20 border-t-[#c9a84c] animate-spin mx-auto mb-6" />
            <div className="font-serif text-xl text-[#f4efe6] font-semibold mb-1">Reviewing your plan…</div>
            <div className="text-[#f4efe6]/40 text-xs mb-6">Cambridge CELTA Component 1 criteria</div>
            <div className="flex flex-col gap-2 text-left max-w-sm mx-auto">
              {PROCESSING_STEPS.map((s, i) => (
                <div key={i} className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${i === step ? 'bg-[#c9a84c]/10' : i < step ? 'bg-[#2a6b4a]/10' : ''}`}>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] flex-shrink-0 transition-all ${
                    i < step ? 'border-[#2a6b4a] bg-[#2a6b4a] text-white' :
                    i === step ? 'border-[#c9a84c]' : 'border-[#c9a84c]/20'
                  }`}>
                    {i < step ? '✓' : ''}
                  </div>
                  <span className={`font-mono text-[11px] transition-colors ${
                    i === step ? 'text-[#c9a84c]' : i < step ? 'text-[#f4efe6]/60' : 'text-[#f4efe6]/25'
                  }`}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-[#fdf0f2] border border-[#8b2233]/20 text-[#8b2233] rounded-xl p-5 mb-8 text-sm">
            {error}
          </div>
        )}

        {/* Report */}
        {report && (
          <div ref={reportRef} className="space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#0b1c36] mb-1">Diagnostic Report</h2>
                <p className="font-mono text-[10px] tracking-widest uppercase text-[#6b5f50]">
                  {level} · {skill} · {tp} · Tier: {tier}
                </p>
              </div>
              <span className={`font-mono text-[11px] tracking-[0.1em] uppercase px-4 py-2 rounded-lg font-medium flex-shrink-0 ${verdictStyle}`}>
                {report.verdict}
              </span>
            </div>

            {/* Scores */}
            <div className="bg-white border border-[#e2d8c8] rounded-xl px-6 py-5 grid grid-cols-5 gap-4">
              <ScoreRing score={report.scores.aims} label="Aims" />
              <ScoreRing score={report.scores.staging} label="Staging" />
              <ScoreRing score={report.scores.clarification} label="Clarification" />
              <ScoreRing score={report.scores.progression} label="Progression" />
              <ScoreRing score={report.scores.overall} label="Overall" />
            </div>

            {/* Memory note */}
            {report.memory_note && (
              <div className="bg-[#f9f6f0] border border-[#e2d8c8] border-l-4 border-l-[#c9a84c] rounded-xl p-5 flex gap-3">
                <span className="text-xl flex-shrink-0">🧠</span>
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-[#c9a84c] mb-1">Pattern Note</div>
                  <p className="text-sm text-[#18140f] leading-relaxed italic">{report.memory_note}</p>
                </div>
              </div>
            )}

            {/* Strengths & Risks */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white border border-[#e2d8c8] rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-[#e2d8c8] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2a6b4a]" />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#6b5f50]">Strengths</span>
                </div>
                <div className="p-5 space-y-3">
                  {report.strengths.map((s, i) => (
                    <div key={i} className="flex gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2a6b4a] mt-2 flex-shrink-0" />
                      <p className="text-sm text-[#18140f] leading-relaxed">{s.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#e2d8c8] rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-[#e2d8c8] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#8b2233]" />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#6b5f50]">Risks</span>
                </div>
                <div className="p-5 space-y-3">
                  {report.risks.map((r, i) => (
                    <div key={i} className="flex gap-2.5">
                      <div className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${r.severity === 'danger' ? 'bg-[#8b2233]' : 'bg-[#a8722a]'}`} />
                      <p className="text-sm text-[#18140f] leading-relaxed">{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Priorities */}
            {report.priorities && report.priorities.length > 0 && (
              <div className="bg-[#0b1c36] border border-[#c9a84c]/15 rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-[#c9a84c]/10 flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#c9a84c]">Action Priorities</span>
                </div>
                <div className="p-5 space-y-4">
                  {report.priorities.map((p, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <span className="font-serif text-3xl font-light text-[#c9a84c]/25 leading-none w-7 flex-shrink-0">{i + 1}</span>
                      <div>
                        <div className="text-sm font-semibold text-[#f4efe6] mb-1">{p.title}</div>
                        <div className="text-xs text-[#f4efe6]/50 leading-relaxed">{p.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rewrite */}
            {report.rewrite?.show && (
              <div className="bg-white border border-[#e2d8c8] rounded-xl overflow-hidden">
                <div className="px-5 py-3 border-b border-[#e2d8c8] flex items-center gap-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[#6b5f50]">AI Rewrite — {report.rewrite.label}</span>
                </div>
                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#e2d8c8]">
                  <div className="p-5">
                    <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 bg-[#fef0f0] text-[#8b2233] rounded inline-block mb-3">Before</span>
                    <p className="text-sm text-[#18140f] leading-relaxed italic">{report.rewrite.before}</p>
                  </div>
                  <div className="p-5">
                    <span className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 bg-[#f0f7f3] text-[#2a6b4a] rounded inline-block mb-3">After</span>
                    <p className="text-sm text-[#2a6b4a] leading-relaxed font-medium">{report.rewrite.after}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Next step */}
            {report.next_step && (
              <div className="bg-[#0b1c36] rounded-xl p-5 flex items-start gap-4 justify-between flex-wrap">
                <div>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-[#c9a84c] mb-1">Your Next Step</div>
                  <p className="text-sm text-[#e2d8c8] leading-relaxed">{report.next_step}</p>
                </div>
                <button
                  onClick={() => { setReport(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                  className="bg-[#c9a84c] text-[#0b1c36] text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#e2c06a] transition-colors whitespace-nowrap flex-shrink-0"
                >
                  New Review →
                </button>
              </div>
            )}

            {/* Upsell for quick tier */}
            {tier === 'quick' && (
              <div className="bg-[#f9f6f0] border border-[#e2d8c8] rounded-xl p-6 text-center">
                <div className="font-mono text-[10px] tracking-widest uppercase text-[#c9a84c] mb-2">Free Plan — Limited View</div>
                <p className="text-sm text-[#6b5f50] mb-4">You&apos;re seeing a preview. Enrol in the CELTA Prep program to unlock full reports: all 5 scores, all risks, action priorities, and the AI rewrite.</p>
                <a href="/#pricing" className="inline-block bg-[#0b1c36] text-[#f4efe6] text-sm font-semibold px-6 py-3 rounded-lg hover:bg-[#142848] transition-colors">
                  See Pricing →
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
