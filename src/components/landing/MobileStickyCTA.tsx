'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, ChevronUp, ArrowRight } from 'lucide-react'
import { getWhatsAppLink } from './constants'

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)
  const [pulsed, setPulsed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      setIsVisible(scrollY > 500)
      setIsAtBottom(scrollY + winHeight > docHeight - 200)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Pulse the CTA button once after appearing
  useEffect(() => {
    if (isVisible && !pulsed) {
      const t = setTimeout(() => setPulsed(true), 800)
      return () => clearTimeout(t)
    }
  }, [isVisible, pulsed])

  return (
    <>
      {/* Scroll to top floating button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-24 right-4 z-40 md:hidden w-10 h-10 rounded-full bg-white border border-[#d4cdc0] shadow-lg flex items-center justify-center text-[#6b6560] hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all duration-300 ${
          isAtBottom ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Sticky bottom bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* Gradient fade above bar */}
        <div className="h-6 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

        <div className="bg-[#0e0c0a]/96 backdrop-blur-md border-t border-[#2a2725] px-4 py-3 safe-area-inset-bottom">
          <div className="flex items-center gap-3 max-w-md mx-auto">
            {/* Left info */}
            <div className="flex-1 min-w-0">
              <p className="font-body text-white text-sm font-bold leading-tight">CELTA Prep Morocco</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="font-body text-[#c9a84c] text-xs font-semibold">From $79 USD</span>
                <span className="text-[#2a2725]">·</span>
                <span className="font-body text-[#6b6560] text-xs">94% pass rate</span>
              </div>
            </div>

            {/* CTA button */}
            <Button
              asChild
              size="sm"
              className={`btn-shine bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#d4b96a] hover:to-[#c9a84c] font-body font-bold shrink-0 shadow-lg transition-all duration-300 ${
                pulsed ? '' : 'animate-pulse'
              }`}
            >
              <a
                href={getWhatsAppLink("Hi Rachid, I want to learn more about CELTA Prep Morocco. Can you help?")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                Enroll Now
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
