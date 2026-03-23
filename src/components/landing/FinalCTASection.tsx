'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, MessageCircle, ArrowRight, Clock, Users, Zap } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { getWhatsAppLink } from './constants'

const trustSignals = [
  { icon: Shield, label: 'Continued support until you pass' },
  { icon: Clock, label: 'Response within 24 hours' },
  { icon: Users, label: '47+ teachers prepared' },
  { icon: Zap, label: '94% first-attempt pass rate' },
]

const paymentMethods = ['Bank Transfer', 'Cash Deposit', 'PayPal', 'Wise']

export function FinalCTASection() {
  return (
    <section className="py-16 md:py-28 relative overflow-hidden bg-[#0e0c0a]">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] via-[#0e0c0a] to-[#0a0e14]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#c9a84c]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#b85c38]/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#c9a84c]/6 rounded-full blur-3xl" />

      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)',
        backgroundSize: '28px 28px'
      }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <AnimatedSection>
          {/* Pre-headline badge */}
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 px-4 py-1.5 rounded-full mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-semibold">Limited cohort — spots filling fast</span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-[#f5f0e8] mb-6 leading-[1.1]">
            Your CELTA journey doesn&apos;t
            have to be a{' '}
            <span className="relative inline-block">
              <span className="text-[#c9a84c]">lonely struggle.</span>
              <svg className="absolute -bottom-1 left-0 w-full" height="4" viewBox="0 0 300 4" preserveAspectRatio="none">
                <path d="M0 2 Q150 4 300 2" stroke="#c9a84c" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </span>
          </h2>

          <p className="font-body text-lg md:text-xl text-[#a09890] mb-10 max-w-2xl mx-auto leading-relaxed">
            In 4 weeks, you could be walking into your CELTA course with complete confidence —
            knowing exactly what to expect, and knowing exactly how to succeed.
          </p>

          {/* Primary CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button
              asChild
              size="lg"
              className="btn-shine font-body font-bold text-lg px-10 py-7 bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#d4b96a] hover:to-[#c9a84c] shadow-2xl shadow-[#c9a84c]/20 transition-all duration-300"
            >
              <a href={getWhatsAppLink("Hi Rachid, I'm ready to start preparing for CELTA. How do I enroll?")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Enroll Now — WhatsApp Rachid
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="font-body font-semibold text-lg px-10 py-7 border-2 border-[#f5f0e8]/20 text-[#f5f0e8] hover:bg-[#f5f0e8]/5 transition-all duration-300"
            >
              <a href="#pricing">
                View Pricing
              </a>
            </Button>
          </div>

          {/* Trust signals row */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12">
            {trustSignals.map(({ icon: Icon, label }, i) => (
              <span key={i} className="flex items-center gap-2 text-[#6b6560] text-sm font-body">
                <Icon className="w-4 h-4 text-[#c9a84c]" />
                {label}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* Payment methods card */}
        <AnimatedSection>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 max-w-lg mx-auto border border-white/10">
            <p className="font-body text-[#6b6560] text-xs uppercase tracking-widest mb-4 font-semibold">
              Payment methods for Morocco & MENA
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {paymentMethods.map((method) => (
                <Badge
                  key={method}
                  variant="outline"
                  className="border-[#c9a84c]/30 text-[#a09890] font-body bg-white/5 hover:border-[#c9a84c]/60 transition-colors"
                >
                  {method}
                </Badge>
              ))}
            </div>
            <p className="font-body text-xs text-[#6b6560] mt-4">
              💳 Payment plans available for Full Program & VIP — split into 2 installments
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
