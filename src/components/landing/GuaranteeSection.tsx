'use client'

import { Shield, CheckCircle2, Star } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const guaranteePoints = [
  'Additional teaching practice sessions included',
  'Full assignment review for your second attempt',
  'WhatsApp support through your next CELTA',
  'No extra cost — ever'
]

function SpinningSeal() {
  const text = 'CELTA · CONFIDENCE · GUARANTEE · '
  const chars = text.split('')
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const charSpacing = circumference / chars.length

  return (
    <div className="relative w-36 h-36 mx-auto mb-8">
      {/* Spinning text ring */}
      <svg
        className="seal-spin absolute inset-0 w-full h-full"
        viewBox="0 0 144 144"
        fill="none"
      >
        <defs>
          <path
            id="seal-circle"
            d="M72,72 m-52,0 a52,52 0 1,1 104,0 a52,52 0 1,1 -104,0"
          />
        </defs>
        <text className="fill-[#c9a84c]" style={{ fontSize: '9.5px', fontFamily: 'var(--font-outfit), sans-serif', fontWeight: '600', letterSpacing: '2px' }}>
          <textPath href="#seal-circle">{text}</textPath>
        </text>
      </svg>

      {/* Center shield */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b8973b] flex items-center justify-center shadow-xl">
          <Shield className="w-9 h-9 text-[#0e0c0a]" strokeWidth={1.5} />
        </div>
      </div>

      {/* Outer glow ring */}
      <div className="absolute inset-0 rounded-full border-2 border-[#c9a84c]/20 animate-glow-ring" />
    </div>
  )
}

export function GuaranteeSection() {
  return (
    <section className="py-16 md:py-24 bg-[#e8e0d0] relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)',
        backgroundSize: '36px 36px'
      }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c9a84c]/6 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="bg-gradient-to-br from-[#0e0c0a] to-[#1a1816] rounded-3xl p-8 md:p-14 text-center border border-[#2a2725] relative overflow-hidden shadow-2xl">
            {/* Inner glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-[#c9a84c]/8 rounded-full blur-2xl" />
            {/* Corner accents */}
            <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-[#c9a84c]/30 rounded-tl-2xl" />
            <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-[#c9a84c]/30 rounded-tr-2xl" />
            <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-[#c9a84c]/30 rounded-bl-2xl" />
            <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-[#c9a84c]/30 rounded-br-2xl" />

            <div className="relative z-10">
              {/* Spinning seal */}
              <SpinningSeal />

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
                ))}
              </div>

              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0e8] mb-6 leading-tight">
                The CELTA{' '}
                <span className="text-[#c9a84c]">Confidence</span>{' '}
                Guarantee
              </h2>

              <p className="font-body text-lg md:text-xl text-[#a09890] mb-4 max-w-2xl mx-auto leading-relaxed">
                Complete all 4 weeks and the mock teaching day. If you don&apos;t pass CELTA on
                your first attempt, I&apos;ll provide additional 1-on-1 support at{' '}
                <span className="text-[#c9a84c] font-semibold">no extra cost</span>{' '}
                until you do.
              </p>

              <p className="font-body text-sm text-[#6b6560] mb-10 max-w-xl mx-auto">
                This is not a marketing promise. It&apos;s a personal commitment from your instructor — the same one who answers your WhatsApp messages.
              </p>

              {/* Guarantee points */}
              <div className="grid sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-8">
                {guaranteePoints.map((point, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/8 rounded-xl px-4 py-3 text-left">
                    <CheckCircle2 className="w-5 h-5 text-[#c9a84c] flex-shrink-0" />
                    <span className="font-body text-sm text-[#f5f0e8]">{point}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-4 max-w-xs mx-auto">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a84c]/40" />
                <span className="font-body text-xs text-[#6b6560] uppercase tracking-widest">Our word is our bond</span>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a84c]/40" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
