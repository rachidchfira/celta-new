'use client'

import { Button } from '@/components/ui/button'
import { ScoreRing } from './ScoreRing'
import { RotateCcw, CheckCircle2, AlertTriangle, AlertCircle, Lock, ChevronRight, Lightbulb } from 'lucide-react'
import type { DoctorReport as DoctorReportType, DoctorTier } from '@/types/doctor'
import { AnimatedSection } from '@/components/landing/AnimatedSection'

interface DoctorReportProps {
  report: DoctorReportType
  tier: DoctorTier
  level: string
  skill: string
  tp: string
  onStartOver: () => void
}

const VERDICT_CONFIG = {
  'CELTA-safe': { label: 'CELTA-Safe', color: 'text-[#2a6b4a] bg-[#f0f7f3] border-[#2a6b4a]/30', dot: 'bg-[#2a6b4a]' },
  'Needs Revision': { label: 'Needs Revision', color: 'text-[#8a6e1f] bg-[#fdf6ec] border-[#c9a84c]/50', dot: 'bg-[#c9a84c]' },
  'High Risk': { label: 'High Risk', color: 'text-[#7a3c22] bg-red-50 border-red-200', dot: 'bg-[#b85c38]' },
}

export function DoctorReport({ report, tier, level, skill, tp, onStartOver }: DoctorReportProps) {
  const verdict = VERDICT_CONFIG[report.verdict] || VERDICT_CONFIG['Needs Revision']
  const isQuick = tier === 'quick'

  const allScores = [
    { label: 'Aims', key: 'aims' as const },
    { label: 'Staging', key: 'staging' as const },
    { label: 'Clarification', key: 'clarification' as const },
    { label: 'Progression', key: 'progression' as const },
    { label: 'Overall', key: 'overall' as const },
  ]

  return (
    <div className="space-y-5">
      {/* Header */}
      <AnimatedSection>
        <div className="bg-[#0b1c36] rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#c9a84c]/5 rounded-full -translate-y-1/4 translate-x-1/4" />
          <div className="relative">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#c9a84c]/60 mb-2">CELTA Precision Review</p>
            <h2 className="font-display text-2xl font-bold text-white mb-1">Diagnostic Report</h2>
            <p className="font-body text-sm text-white/40">
              {level} · {skill} · {tp} · {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold font-body ${verdict.color}`}>
                <span className={`w-2 h-2 rounded-full ${verdict.dot}`} />
                {verdict.label}
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Scores */}
      <AnimatedSection>
        <div className="bg-white rounded-2xl border border-[#d4cdc0] p-5">
          <h3 className="font-body text-xs font-semibold text-[#6b6560] uppercase tracking-widest mb-4">Diagnostic Scores</h3>
          <div className="flex items-center justify-around gap-2">
            {allScores.map(({ label, key }) => (
              <ScoreRing
                key={key}
                label={label}
                value={report.scores[key] || 0}
                locked={isQuick && key !== 'aims' && key !== 'staging' && key !== 'overall'}
              />
            ))}
          </div>
          {isQuick && (
            <div className="mt-4 pt-4 border-t border-[#e8e0d0] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#a09890]" />
              <p className="font-body text-xs text-[#a09890]">
                3 diagnostic scores locked.{' '}
                <a href="/course" className="text-[#c9a84c] underline underline-offset-2">Enroll for full analysis →</a>
              </p>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Strengths */}
      <AnimatedSection>
        <div className="bg-white rounded-2xl border border-[#d4cdc0] p-5">
          <h3 className="font-body text-xs font-semibold text-[#6b6560] uppercase tracking-widest mb-3">What&apos;s Working</h3>
          <div className="space-y-2.5">
            {report.strengths.map((s, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-[#f0f7f3]">
                <CheckCircle2 className="w-4 h-4 text-[#2a6b4a] flex-shrink-0 mt-0.5" />
                <p className="font-body text-sm text-[#0e0c0a] leading-relaxed">{s.text}</p>
              </div>
            ))}
            {isQuick && (
              <div className="relative">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#f0f7f3] opacity-30 blur-[2px] select-none pointer-events-none">
                  <CheckCircle2 className="w-4 h-4 text-[#2a6b4a] flex-shrink-0 mt-0.5" />
                  <p className="font-body text-sm text-[#0e0c0a]">Additional strength hidden...</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <a href="/course" className="flex items-center gap-1.5 bg-white border border-[#d4cdc0] rounded-lg px-3 py-1.5 font-body text-xs font-semibold text-[#0e0c0a] shadow-sm hover:border-[#c9a84c] transition-colors">
                    <Lock className="w-3 h-3 text-[#c9a84c]" />
                    Unlock full analysis
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Risks */}
      <AnimatedSection>
        <div className="bg-white rounded-2xl border border-[#d4cdc0] p-5">
          <h3 className="font-body text-xs font-semibold text-[#6b6560] uppercase tracking-widest mb-3">CELTA Tutor Concerns</h3>
          <div className="space-y-2.5">
            {report.risks.map((r, i) => (
              <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${r.severity === 'danger' ? 'bg-red-50' : 'bg-amber-50'}`}>
                {r.severity === 'danger'
                  ? <AlertCircle className="w-4 h-4 text-[#b85c38] flex-shrink-0 mt-0.5" />
                  : <AlertTriangle className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                }
                <p className="font-body text-sm text-[#0e0c0a] leading-relaxed">{r.text}</p>
              </div>
            ))}
            {isQuick && (
              <div className="relative">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50 opacity-30 blur-[2px] select-none pointer-events-none">
                  <AlertTriangle className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <p className="font-body text-sm text-[#0e0c0a]">Additional risks hidden...</p>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <a href="/course" className="flex items-center gap-1.5 bg-white border border-[#d4cdc0] rounded-lg px-3 py-1.5 font-body text-xs font-semibold text-[#0e0c0a] shadow-sm hover:border-[#c9a84c] transition-colors">
                    <Lock className="w-3 h-3 text-[#c9a84c]" />
                    Unlock all risks
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </AnimatedSection>

      {/* Priority fixes — full/elite only */}
      {!isQuick && report.priorities && report.priorities.length > 0 && (
        <AnimatedSection>
          <div className="bg-white rounded-2xl border border-[#d4cdc0] p-5">
            <h3 className="font-body text-xs font-semibold text-[#6b6560] uppercase tracking-widest mb-3">Priority Fix Order</h3>
            <div className="space-y-3">
              {report.priorities.map((p, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0b1c36] text-[#c9a84c] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                  <div>
                    <p className="font-body font-semibold text-sm text-[#0e0c0a]">{p.title}</p>
                    <p className="font-body text-sm text-[#6b6560] leading-relaxed mt-0.5">{p.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Rewrite — elite only */}
      {report.rewrite?.show && report.rewrite.before && (
        <AnimatedSection>
          <div className="bg-white rounded-2xl border-2 border-[#c9a84c]/40 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-[#c9a84c]/15 flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-[#c9a84c]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="font-body text-xs font-semibold text-[#0e0c0a] uppercase tracking-widest">AI Rewrite: {report.rewrite.label}</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-[#b85c38] mb-2">Before</p>
                <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                  <p className="font-body text-sm text-[#0e0c0a] leading-relaxed whitespace-pre-line">{report.rewrite.before}</p>
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-[#2a6b4a] mb-2">After</p>
                <div className="bg-[#f0f7f3] border border-[#2a6b4a]/20 rounded-xl p-3">
                  <p className="font-body text-sm text-[#0e0c0a] leading-relaxed whitespace-pre-line">{report.rewrite.after}</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Memory note */}
      {report.memory_note && (
        <AnimatedSection>
          <div className="bg-[#0b1c36]/5 border border-[#0b1c36]/10 rounded-2xl p-4 flex items-start gap-3">
            <svg className="w-4 h-4 text-[#0b1c36]/40 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <div>
              <p className="font-body text-xs font-semibold text-[#0e0c0a] uppercase tracking-wider mb-1">Pattern Note</p>
              <p className="font-body text-sm text-[#6b6560] leading-relaxed">{report.memory_note}</p>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Next step */}
      {report.next_step && (
        <AnimatedSection>
          <div className="bg-gradient-to-r from-[#c9a84c]/10 to-[#b85c38]/5 border border-[#c9a84c]/30 rounded-2xl p-5">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-[#c9a84c]" />
              </div>
              <div>
                <p className="font-body text-xs font-semibold text-[#8a6e1f] uppercase tracking-wider mb-1">Your Next Step</p>
                <p className="font-body text-sm text-[#0e0c0a] font-medium leading-relaxed">{report.next_step}</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      )}

      {/* Quick tier CTA */}
      {isQuick && (
        <AnimatedSection>
          <div className="bg-[#0b1c36] rounded-2xl p-6 text-center">
            <p className="font-display text-xl font-bold text-white mb-1.5">Unlock Your Full Diagnosis</p>
            <p className="font-body text-sm text-white/50 mb-4">All 5 scores · All risks · Priority fixes · Next step</p>
            <a href="/course" className="inline-flex items-center gap-2 bg-[#c9a84c] text-[#0b1c36] font-body font-bold px-6 py-3 rounded-xl hover:bg-[#d4b96a] transition-colors">
              Access with Enrollment
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </AnimatedSection>
      )}

      {/* Start over */}
      <div className="flex justify-center pt-2">
        <Button
          variant="outline"
          onClick={onStartOver}
          className="font-body text-sm border-[#d4cdc0] text-[#6b6560] hover:border-[#c9a84c] hover:text-[#0e0c0a] gap-2"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Analyse Another Plan
        </Button>
      </div>
    </div>
  )
}
