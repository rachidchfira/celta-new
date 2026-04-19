'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Stethoscope, Loader2, Lock, Zap, Star, Crown } from 'lucide-react'
import type { DoctorTier } from '@/types/doctor'

interface DoctorIntakeFormProps {
  onSubmit: (data: {
    lessonPlanText: string
    level: string
    skill: string
    tp: string
    worry: string
    mode: DoctorTier
  }) => void
  isLoading: boolean
  tier: DoctorTier
  remainingQuota?: number | null
  isAuthenticated: boolean
  initialText?: string
}

const LEVELS = ['A1 Beginner', 'A2 Elementary', 'B1 Pre-Intermediate', 'B1+ Intermediate', 'B2 Upper-Intermediate', 'C1 Advanced']
const SKILLS = ['Grammar', 'Vocabulary', 'Reading', 'Listening', 'Speaking', 'Writing', 'Pronunciation']
const TP_NUMS = ['TP1', 'TP2', 'TP3', 'TP4', 'TP5', 'TP6']

const TIER_MODES: Array<{ id: DoctorTier; icon: React.ElementType; name: string; desc: string; tag: string; tagColor: string; locked: boolean; lockedFor: string }> = [
  {
    id: 'quick',
    icon: Zap,
    name: 'Quick Scan',
    desc: 'Verdict + 2 scores + top risk. Instant triage.',
    tag: 'Free',
    tagColor: 'bg-[#f5f0e8] text-[#6b6560] border border-[#d4cdc0]',
    locked: false,
    lockedFor: ''
  },
  {
    id: 'full',
    icon: Star,
    name: 'Full Review',
    desc: 'All 5 scores, strengths, risks, priority fixes & next step.',
    tag: 'Enrolled',
    tagColor: 'bg-[#c9a84c]/15 text-[#8a6e1f] border border-[#c9a84c]/40',
    locked: true,
    lockedFor: 'enrolled'
  },
  {
    id: 'elite',
    icon: Crown,
    name: 'Full + Rewrite',
    desc: 'Everything + AI rewrites your weakest element.',
    tag: 'VIP',
    tagColor: 'bg-[#b85c38]/15 text-[#7a3c22] border border-[#b85c38]/40',
    locked: true,
    lockedFor: 'vip'
  }
]

export function DoctorIntakeForm({ onSubmit, isLoading, tier, remainingQuota, isAuthenticated, initialText = '' }: DoctorIntakeFormProps) {
  const [lessonPlanText, setLessonPlanText] = useState(initialText)
  const [level, setLevel] = useState('')
  const [skill, setSkill] = useState('')
  const [tp, setTp] = useState('TP1')
  const [worry, setWorry] = useState('')
  const [mode, setMode] = useState<DoctorTier>(tier === 'elite' ? 'elite' : tier === 'full' ? 'full' : 'quick')

  const effectiveMode: DoctorTier = !isAuthenticated
    ? 'quick'
    : tier === 'elite'
    ? mode
    : 'full'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!lessonPlanText.trim() || !level || !skill) return
    onSubmit({ lessonPlanText, level, skill, tp, worry, mode: effectiveMode })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Context grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label className="font-body text-xs font-semibold text-[#0e0c0a] uppercase tracking-wider">
            Learner Level <span className="text-[#b85c38]">*</span>
          </label>
          <Select value={level} onValueChange={setLevel} required>
            <SelectTrigger className="font-body border-[#d4cdc0] focus:border-[#c9a84c] bg-[#f5f0e8] h-10">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {LEVELS.map(l => <SelectItem key={l} value={l} className="font-body">{l}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="font-body text-xs font-semibold text-[#0e0c0a] uppercase tracking-wider">
            Skill Focus <span className="text-[#b85c38]">*</span>
          </label>
          <Select value={skill} onValueChange={setSkill} required>
            <SelectTrigger className="font-body border-[#d4cdc0] focus:border-[#c9a84c] bg-[#f5f0e8] h-10">
              <SelectValue placeholder="Select skill" />
            </SelectTrigger>
            <SelectContent>
              {SKILLS.map(s => <SelectItem key={s} value={s} className="font-body">{s}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label className="font-body text-xs font-semibold text-[#0e0c0a] uppercase tracking-wider">Teaching Practice</label>
          <Select value={tp} onValueChange={setTp}>
            <SelectTrigger className="font-body border-[#d4cdc0] focus:border-[#c9a84c] bg-[#f5f0e8] h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TP_NUMS.map(t => <SelectItem key={t} value={t} className="font-body">{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Lesson plan textarea */}
      <div className="space-y-1.5">
        <label className="font-body text-xs font-semibold text-[#0e0c0a] uppercase tracking-wider">
          Lesson Plan <span className="text-[#b85c38]">*</span>
        </label>
        <Textarea
          value={lessonPlanText}
          onChange={e => setLessonPlanText(e.target.value)}
          placeholder="Paste your full lesson plan here — aims, stages, timing, procedures, materials..."
          className="font-body border-[#d4cdc0] focus:border-[#c9a84c] bg-[#f5f0e8] min-h-[200px] resize-y text-sm leading-relaxed"
          required
        />
        <p className="font-body text-xs text-[#a09890]">{lessonPlanText.length} characters. Include your aims, stage sequence, timing, and any procedures you&apos;ve planned.</p>
      </div>

      {/* Optional worry */}
      <div className="space-y-1.5">
        <label className="font-body text-xs font-semibold text-[#0e0c0a] uppercase tracking-wider">
          Main Worry <span className="text-[#a09890] font-normal normal-case">(optional)</span>
        </label>
        <Textarea
          value={worry}
          onChange={e => setWorry(e.target.value)}
          placeholder="What are you most worried about in this plan? e.g. 'My staging feels rushed' or 'I'm unsure about my CCQs'"
          className="font-body border-[#d4cdc0] focus:border-[#c9a84c] bg-[#f5f0e8] min-h-[72px] resize-none text-sm"
        />
      </div>

      {/* Review depth — only show to authenticated users with elite tier */}
      {isAuthenticated && tier === 'elite' && (
        <div className="space-y-2">
          <label className="font-body text-xs font-semibold text-[#0e0c0a] uppercase tracking-wider">Review Depth</label>
          <div className="grid grid-cols-3 gap-3">
            {TIER_MODES.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`relative text-left p-3.5 rounded-xl border-2 transition-all duration-150 ${
                  mode === m.id
                    ? 'border-[#c9a84c] bg-[#c9a84c]/5'
                    : 'border-[#d4cdc0] hover:border-[#c9a84c]/50 bg-white'
                }`}
              >
                {mode === m.id && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-[#c9a84c] rounded-full flex items-center justify-center">
                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <m.icon className="w-4 h-4 text-[#c9a84c] mb-1.5" />
                <p className="font-body font-semibold text-[#0e0c0a] text-xs mb-0.5">{m.name}</p>
                <p className="font-body text-[#6b6560] text-[11px] leading-tight">{m.desc}</p>
                <span className={`inline-block text-[10px] font-mono px-1.5 py-0.5 rounded mt-1.5 ${m.tagColor}`}>{m.tag}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tier info for non-enrolled */}
      {!isAuthenticated && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#c9a84c]/8 border border-[#c9a84c]/25">
          <Lock className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-body text-sm font-semibold text-[#0e0c0a]">Free Quick Scan</p>
            <p className="font-body text-xs text-[#6b6560] mt-0.5">
              You get 1 free scan per day. Enrolled students get unlimited full analyses with all 5 scores, risks, and priority fixes.{' '}
              <a href="/course" className="text-[#c9a84c] underline underline-offset-2 font-medium">Access with your enrollment →</a>
            </p>
          </div>
        </div>
      )}

      {/* Enrolled but not elite */}
      {isAuthenticated && tier === 'full' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#f5f0e8] border border-[#d4cdc0]">
          <Star className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-body text-sm font-semibold text-[#0e0c0a]">Full Review Active</p>
            <p className="font-body text-xs text-[#6b6560] mt-0.5">
              All 5 diagnostic scores, strengths, risks, priorities & next step.
              VIP students also get AI lesson plan rewrites.
            </p>
          </div>
        </div>
      )}

      {/* Quota warning */}
      {!isAuthenticated && remainingQuota === 0 && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-center">
          <p className="font-body text-sm text-amber-800">
            Daily free limit reached.{' '}
            <a href="/course" className="font-semibold underline">Sign in with your enrollment</a> for unlimited access.
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={isLoading || !lessonPlanText.trim() || !level || !skill || (!isAuthenticated && remainingQuota === 0)}
        className="btn-shine w-full font-body font-bold text-base py-6 bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#d4b96a] hover:to-[#c9a84c] shadow-lg shadow-[#c9a84c]/20 transition-all duration-300 disabled:opacity-50 rounded-xl"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        ) : (
          <Stethoscope className="w-5 h-5 mr-2" />
        )}
        {isLoading ? 'Running 7 diagnostic tools...' : 'Diagnose My Lesson Plan →'}
      </Button>
    </form>
  )
}
