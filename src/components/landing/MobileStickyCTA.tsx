'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageCircle, ChevronUp } from 'lucide-react'
import { getWhatsAppLink } from './constants'

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      
      setIsVisible(scrollY > 500)
      setIsAtBottom(scrollY + winHeight > docHeight - 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!isVisible) return null

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0e0c0a]/95 backdrop-blur-sm shadow-2xl border-t border-[#2a2725] transform transition-transform duration-300 safe-area-inset-bottom ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-body text-white text-sm font-semibold truncate">CELTA Prep Morocco</p>
          <p className="font-body text-[#c9a84c] text-xs">Starting at $80 USD</p>
        </div>
        <Button
          asChild
          size="sm"
          className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold min-w-[120px]"
        >
          <a href={getWhatsAppLink("Hi Rachid, I want to learn more about CELTA Prep Morocco. Can you help?")} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4 mr-2" />
            Get Info
          </a>
        </Button>
      </div>
      
      {/* Scroll to top button */}
      {isAtBottom && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="absolute -top-12 right-4 w-10 h-10 rounded-full bg-[#c9a84c] text-[#0e0c0a] flex items-center justify-center shadow-lg md:hidden"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
