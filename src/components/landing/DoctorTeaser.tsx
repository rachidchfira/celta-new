'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Stethoscope, Lock, CheckCircle2, AlertTriangle, ChevronRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { AnimatedSection } from './AnimatedSection'

const MOCK_SCORES = [
  { label: 'Aims', score: 6 },
  { label: 'Staging', score: 8 },
  { label: 'Overall', score: 7 },
]

const LOCKED_FEATURES = [
  'Clarification (MFPA)',
  'Task Progression',
  'All Risks & Strengths',
  'Priority Fix Order',
  'AI Lesson Rewrite',
]

export function DoctorTeaser() {
  const [planText, setPlanText] = useState('')
  const router = useRouter()

  function handleTryFree(e: React.FormEvent) {
    e.preventDefault()
    if (planText.trim()) {
      sessionStorage.setItem('doctor_prefill', planText.trim())
    }
    router.push('/doctor')
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-[#0b1c36]">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #c9a84c 0%, transparent 60%), radial-gradient(circle at 80% 20%, #c9a84c 0%, transparent 50%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/30 px-4 py-1.5 rounded-full mb-6">
              <Stethoscope className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-semibold">New Tool</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
              Is Your Lesson Plan{' '}
              <span className="text-[#c9a84c] italic">CELTA-Ready?</span>
            </h2>
            <p className="font-body text-lg text-white/50 max-w-2xl mx-auto">
              Paste your lesson plan and get an instant expert diagnosis — the same feedback a senior CELTA trainer would give, powered by AI.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: Input form */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-[#c9a84c]/15 p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#c9a84c] flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-[#0b1c36]" />
                </div>
                <h3 className="font-body font-semibold text-white">Try It Free</h3>
                <span className="ml-auto font-mono text-[10px] tracking-wider uppercase bg-[#c9a84c]/15 text-[#c9a84c] px-2 py-0.5 rounded-full border border-[#c9a84c]/20">1 free scan / day</span>
              </div>

              <form onSubmit={handleTryFree} className="space-y-4">
                <Textarea
                  value={planText}
                  onChange={e => setPlanText(e.target.value)}
                  placeholder="Paste a few lines of your lesson plan here — aims, stages, or even just your main aim..."
                  className="font-body text-sm bg-white/8 border-white/15 text-white placeholder:text-white/30 focus:border-[#c9a84c]/60 min-h-[140px] resize-none"
                />

                <Button
                  type="submit"
                  className="btn-shine w-full font-body font-bold py-5 bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#d4b96a] hover:to-[#c9a84c] shadow-lg shadow-[#c9a84c]/20 rounded-xl"
                >
                  <Stethoscope className="w-4 h-4 mr-2" />
                  Get Free Diagnosis →
                </Button>

                <p className="font-body text-xs text-white/30 text-center">
                  No account required. Takes about 10 seconds.
                </p>
              </form>

              {/* What you get */}
              <div className="mt-5 pt-5 border-t border-white/10 space-y-2">
                {[
                  { text: 'Instant verdict: CELTA-safe / Needs Work / High Risk', free: true },
                  { text: 'Overall score + aims & staging scores', free: true },
                  { text: 'Top risk your tutor will flag', free: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2a6b4a] flex-shrink-0 mt-0.5" />
                    <span className="font-body text-xs text-white/60">{item.text}</span>
                  </div>
                ))}
                {LOCKED_FEATURES.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 opacity-40">
                    <Lock className="w-3.5 h-3.5 text-white/40 flex-shrink-0 mt-0.5" />
                    <span className="font-body text-xs text-white/40">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Mock result preview */}
            <div className="space-y-4">
              {/* Mock verdict */}
              <div className="bg-[#fdf6ec] rounded-2xl border border-[#c9a84c]/30 p-5">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-[#6b6560]">Sample Report Preview</p>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf6ec] border border-[#c9a84c]/40 text-[#8a6e1f] text-xs font-semibold font-body">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
                    Needs Revision
                  </span>
                </div>

                {/* Mock scores */}
                <div className="flex gap-4 mb-4">
                  {MOCK_SCORES.map(({ label, score }) => {
                    const color = score >= 7 ? '#2a6b4a' : '#c9a84c'
                    const radius = 20
                    const circ = 2 * Math.PI * radius
                    const fill = (score / 10) * circ
                    return (
                      <div key={label} className="flex flex-col items-center gap-1">
                        <div className="relative w-12 h-12">
                          <svg viewBox="0 0 48 48" className="w-full h-full -rotate-90">
                            <circle cx="24" cy="24" r={radius} fill="none" stroke="#e8e0d0" strokeWidth="3.5" />
                            <circle cx="24" cy="24" r={radius} fill="none" stroke={color} strokeWidth="3.5" strokeLinecap="round"
                              strokeDasharray={`${fill} ${circ}`} />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-mono font-bold text-xs" style={{ color }}>{score}</span>
                          </div>
                        </div>
                        <span className="font-body text-[10px] text-[#6b6560]">{label}</span>
                      </div>
                    )
                  })}
                  {/* Locked scores */}
                  {['Clarity', 'Progress'].map(label => (
                    <div key={label} className="flex flex-col items-center gap-1 opacity-30">
                      <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#d4cdc0] flex items-center justify-center">
                        <Lock className="w-3.5 h-3.5 text-[#a09890]" />
                      </div>
                      <span className="font-body text-[10px] text-[#6b6560]">{label}</span>
                    </div>
                  ))}
                </div>

                {/* Mock strength */}
                <div className="flex items-start gap-2.5 p-3 bg-[#f0f7f3] rounded-xl mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2a6b4a] flex-shrink-0 mt-0.5" />
                  <p className="font-body text-xs text-[#0e0c0a]">Your main aim is clearly learner-focused with a measurable outcome.</p>
                </div>

                {/* Mock risk */}
                <div className="flex items-start gap-2.5 p-3 bg-amber-50 rounded-xl mb-3">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <p className="font-body text-xs text-[#0e0c0a]">Stage 3 jumps directly to freer practice — controlled practice is missing.</p>
                </div>

                {/* Locked items */}
                <div className="space-y-2 relative">
                  {['2 more risks hidden', 'Priority fixes hidden', 'Next step hidden'].map((text, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-[#f5f0e8] rounded-lg blur-[1.5px]">
                      <Lock className="w-3 h-3 text-[#a09890]" />
                      <p className="font-body text-xs text-[#6b6560]">{text}</p>
                    </div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a href="/doctor" className="flex items-center gap-1.5 bg-white border border-[#d4cdc0] rounded-xl px-4 py-2 font-body text-xs font-bold text-[#0e0c0a] shadow-md hover:border-[#c9a84c] transition-colors">
                      <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
                      Try it on your own plan
                    </a>
                  </div>
                </div>
              </div>

              {/* Enrolled CTA */}
              <div className="flex items-center gap-3 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-xl p-4">
                <Sparkles className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                <p className="font-body text-sm text-white/70 flex-1">
                  Enrolled students get <strong className="text-white">unlimited full analyses</strong> with all 5 scores, risks, priorities & AI rewrites.
                </p>
                <a href="/course" className="flex items-center gap-1 font-body text-xs font-bold text-[#c9a84c] hover:text-[#d4b96a] whitespace-nowrap">
                  Enroll <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
