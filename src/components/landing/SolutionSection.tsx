'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, ArrowRight, Clock, Video, MessageCircle, FileText } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const pillars = [
  { icon: Clock, title: '4 Weeks', desc: 'Structured preparation' },
  { icon: Video, title: 'Live Sessions', desc: 'Not just recordings' },
  { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Questions answered daily' },
  { icon: FileText, title: 'Assignment Help', desc: 'All 4 reviewed' }
]

const masterList = [
  'Every CELTA assessment criterion — and exactly how to meet it',
  'Lesson planning that impresses assessors (with templates)',
  'CCQs, ICQs, and staging that show you know what you\'re doing',
  'All 4 written assignments — reviewed before submission',
  'Real teaching practice with honest, constructive feedback'
]

const notList = [
  'NOT a generic TEFL course — this is 100% CELTA-specific',
  'NOT pre-recorded videos you watch alone — live interaction matters',
  'NOT a pass guarantee without work — you must participate',
  'NOT for CELTA holders — this is preparation, not advanced training',
  'NOT a CELTA replacement — you still take the real course'
]

export function SolutionSection() {
  return (
    <section className="py-16 md:py-28 bg-white relative overflow-hidden">
      {/* Subtle mesh bg */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a84c]/4 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b85c38]/4 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
              <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-semibold">The Solution</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-5 leading-tight">
              CELTA Prep Morocco
            </h2>
            <p className="font-body text-lg md:text-xl text-[#6b6560] max-w-3xl mx-auto">
              The only CELTA preparation program designed specifically for Moroccan teachers —
              by a Moroccan teacher who passed CELTA and knows exactly what you&apos;re going through.
            </p>
          </div>
        </AnimatedSection>

        {/* 4 Pillars */}
        <AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {pillars.map((item, index) => (
              <div key={index} className="premium-card group bg-[#f5f0e8] rounded-2xl p-5 border border-[#d4cdc0] text-center hover:border-[#c9a84c]/60 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white shadow-sm border border-[#d4cdc0] flex items-center justify-center group-hover:border-[#c9a84c]/50 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-[#c9a84c]" />
                </div>
                <h4 className="font-display text-lg font-bold text-[#0e0c0a] mb-1">{item.title}</h4>
                <p className="font-body text-sm text-[#6b6560]">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* What you master / What this is not */}
        <div className="grid md:grid-cols-2 gap-6 mb-14">
          <AnimatedSection>
            <div className="bg-[#f5f0e8] rounded-2xl p-8 border border-[#d4cdc0] h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#c9a84c] to-[#c9a84c]/20 rounded-l-2xl" />
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#0e0c0a]">What You&apos;ll Master</h3>
              </div>
              <ul className="space-y-3.5">
                {masterList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-[#4a4540] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-[#0e0c0a] rounded-2xl p-8 border border-[#2a2725] h-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[#b85c38] to-[#b85c38]/20 rounded-l-2xl" />
              {/* Subtle dot pattern */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)', backgroundSize: '20px 20px' }} />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-[#b85c38]/15 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-[#b85c38]" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#f5f0e8]">What This Is NOT</h3>
              </div>
              <ul className="space-y-3.5 relative z-10">
                {notList.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-4 h-4 text-[#b85c38] mt-0.5 flex-shrink-0" />
                    <span className="font-body text-sm text-[#a09890] leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        </div>

        {/* Promise Banner */}
        <AnimatedSection>
          <div className="relative rounded-3xl overflow-hidden">
            {/* Rich gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c] via-[#c09040] to-[#b85c38]" />
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            {/* Corner decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 p-8 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-6">
                <span className="font-body text-xs text-white uppercase tracking-widest font-bold">Our Promise to You</span>
              </div>
              <p className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-white mb-6 max-w-3xl mx-auto leading-snug">
                After 4 weeks, you will walk into your CELTA course knowing exactly what assessors expect —
                confident, prepared, and ready to pass on your first attempt.
                <span className="block mt-2 font-body text-base font-normal text-white/80">
                  Or we continue working with you for free until you do.
                </span>
              </p>
              <Button asChild size="lg" className="btn-shine font-body font-bold bg-white text-[#0e0c0a] hover:bg-[#f5f0e8] shadow-xl px-8 py-6">
                <a href="#pricing">
                  See Pricing Options
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
