'use client'

import { History, TrendingUp, ChevronRight, Database } from 'lucide-react'
import type { DoctorSubmission } from '@/types/doctor'

interface DoctorDashboardProps {
  submissions: DoctorSubmission[]
  onSelect: (submission: DoctorSubmission) => void
  isAuthenticated: boolean
}

const VERDICT_BADGE = {
  'CELTA-safe': 'bg-[#f0f7f3] text-[#2a6b4a] border border-[#2a6b4a]/25',
  'Needs Revision': 'bg-[#fdf6ec] text-[#8a6e1f] border border-[#c9a84c]/35',
  'High Risk': 'bg-red-50 text-[#7a3c22] border border-red-200',
}

function ScoreBadge({ score }: { score: number }) {
  const color = score >= 7 ? 'text-[#2a6b4a]' : score >= 5 ? 'text-[#8a6e1f]' : 'text-[#7a3c22]'
  return <span className={`font-mono font-bold text-lg ${color}`}>{score}<span className="text-xs text-[#a09890] font-normal">/10</span></span>
}

export function DoctorDashboard({ submissions, onSelect, isAuthenticated }: DoctorDashboardProps) {
  if (submissions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-[#d4cdc0] p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-[#f5f0e8] flex items-center justify-center mx-auto mb-3">
          <History className="w-6 h-6 text-[#a09890]" />
        </div>
        <p className="font-body font-semibold text-[#0e0c0a] mb-1">No analyses yet</p>
        <p className="font-body text-sm text-[#6b6560]">Submit your first lesson plan to start tracking your progress.</p>
      </div>
    )
  }

  const avgScore = Math.round(submissions.reduce((acc, s) => acc + s.overallScore, 0) / submissions.length)
  const safeCount = submissions.filter(s => s.verdict === 'CELTA-safe').length

  return (
    <div className="space-y-4">
      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl border border-[#d4cdc0] p-3 text-center">
          <p className="font-display text-2xl font-bold text-[#0e0c0a]">{submissions.length}</p>
          <p className="font-body text-xs text-[#6b6560]">Plans Reviewed</p>
        </div>
        <div className="bg-white rounded-xl border border-[#d4cdc0] p-3 text-center">
          <p className="font-display text-2xl font-bold text-[#0e0c0a]">{avgScore}<span className="text-sm text-[#a09890]">/10</span></p>
          <p className="font-body text-xs text-[#6b6560]">Avg Score</p>
        </div>
        <div className="bg-white rounded-xl border border-[#d4cdc0] p-3 text-center">
          <p className="font-display text-2xl font-bold text-[#2a6b4a]">{safeCount}</p>
          <p className="font-body text-xs text-[#6b6560]">CELTA-Safe</p>
        </div>
      </div>

      {/* History list */}
      <div className="bg-white rounded-2xl border border-[#d4cdc0] overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#e8e0d0]">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#a09890]" />
            <h3 className="font-body text-xs font-semibold text-[#6b6560] uppercase tracking-widest">Recent Analyses</h3>
          </div>
          {!isAuthenticated && (
            <div className="flex items-center gap-1 text-[#a09890]">
              <Database className="w-3 h-3" />
              <span className="font-body text-[10px]">This device only</span>
            </div>
          )}
        </div>

        <div className="divide-y divide-[#e8e0d0]">
          {submissions.map((s) => (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#f5f0e8] transition-colors text-left group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold font-body ${VERDICT_BADGE[s.verdict] || VERDICT_BADGE['Needs Revision']}`}>
                    {s.verdict}
                  </span>
                  <span className="font-mono text-[10px] text-[#a09890]">{s.level}</span>
                  <span className="font-mono text-[10px] text-[#a09890]">·</span>
                  <span className="font-mono text-[10px] text-[#a09890]">{s.skill}</span>
                </div>
                <p className="font-body text-xs text-[#a09890]">
                  {new Date(s.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </p>
              </div>
              <ScoreBadge score={s.overallScore} />
              <ChevronRight className="w-4 h-4 text-[#d4cdc0] group-hover:text-[#c9a84c] transition-colors flex-shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {!isAuthenticated && submissions.length > 0 && (
        <div className="bg-[#f5f0e8] rounded-xl border border-[#d4cdc0] p-4 text-center">
          <p className="font-body text-xs text-[#6b6560]">
            History saved on this device only.{' '}
            <a href="/course" className="text-[#c9a84c] underline underline-offset-2 font-medium">Enroll to save across devices →</a>
          </p>
        </div>
      )}
    </div>
  )
}
