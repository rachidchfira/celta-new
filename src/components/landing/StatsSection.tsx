'use client'

import { useState, useEffect } from 'react'
import { Globe } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { useScrollAnimation } from './hooks'
import { stats } from './constants'

// Animated Stats Counter
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const { ref, isVisible } = useScrollAnimation()

  useEffect(() => {
    if (isVisible) {
      const duration = 2000
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
    <span ref={ref} className="font-display text-3xl md:text-4xl font-bold text-[#c9a84c]">
      {count}{suffix}
    </span>
  )
}

export function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#0e0c0a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#f5f0e8] mb-4">
              The Numbers Speak
            </h2>
            <p className="font-body text-lg text-[#a09890]">
              Real results from real Moroccan teachers.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <AnimatedSection key={index}>
              <div className="bg-[#1a1816] rounded-2xl p-6 text-center border border-[#2a2725]">
                <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                <p className="font-body text-sm text-[#a09890] mt-2">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection>
          <div className="mt-12 bg-gradient-to-r from-[#c9a84c]/20 to-[#b85c38]/20 rounded-2xl p-6 md:p-8 border border-[#c9a84c]/30">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Globe className="w-10 h-10 text-[#c9a84c]" />
                <div>
                  <p className="font-body text-[#f5f0e8] font-semibold">Our graduates now teach in</p>
                  <p className="font-display text-xl text-[#c9a84c]">Vietnam • South Korea • UAE • Turkey • Online</p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
