'use client'

import { useState, useEffect } from 'react'
import { Globe, TrendingUp } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { useScrollAnimation } from './hooks'
import { stats } from './constants'

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const { ref, isVisible } = useScrollAnimation()

  useEffect(() => {
    if (isVisible) {
      const duration = 1800
      const steps = 60
      const increment = value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)
      return () => clearInterval(timer)
    }
  }, [isVisible, value])

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl font-bold gold-shimmer stat-number">
      {count}{suffix}
    </span>
  )
}

const destinations = ['Vietnam', 'South Korea', 'UAE', 'Turkey', 'Online']

export function StatsSection() {
  return (
    <section className="py-16 md:py-28 bg-[#0e0c0a] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)', backgroundSize: '28px 28px' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#c9a84c]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/25 px-4 py-1.5 rounded-full mb-6">
              <TrendingUp className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-semibold">By the Numbers</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0e8] mb-4">
              The Numbers{' '}
              <span className="text-[#c9a84c]">Speak</span>
            </h2>
            <p className="font-body text-lg text-[#a09890]">
              Real results from real Moroccan teachers.
            </p>
          </div>
        </AnimatedSection>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} className={`stagger-${index + 1}`}>
              <div className="group relative bg-[#1a1816] rounded-2xl p-6 text-center border border-[#2a2725] hover:border-[#c9a84c]/40 transition-all duration-300 overflow-hidden">
                {/* Hover glow */}
                <div className="absolute inset-0 bg-[#c9a84c]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                {/* Top line */}
                <div className="absolute top-0 left-1/4 right-1/4 h-px bg-[#c9a84c]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                  <p className="font-body text-sm text-[#6b6560] mt-2 leading-snug">{stat.label}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Destinations bar */}
        <AnimatedSection>
          <div className="bg-gradient-to-r from-[#c9a84c]/10 via-[#c9a84c]/15 to-[#c9a84c]/10 border border-[#c9a84c]/25 rounded-2xl px-6 md:px-10 py-6">
            <div className="flex flex-col md:flex-row items-center gap-5">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[#c9a84c]/15 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-[#c9a84c]" />
                </div>
                <p className="font-body text-[#f5f0e8] text-sm font-semibold whitespace-nowrap">
                  Our graduates now teach in:
                </p>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {destinations.map((dest, i) => (
                  <span key={i} className="font-body text-xs font-semibold text-[#c9a84c] bg-[#c9a84c]/10 border border-[#c9a84c]/25 px-3 py-1 rounded-full">
                    {dest}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
