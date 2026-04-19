'use client'

import { useEffect, useState } from 'react'
import { Phone } from 'lucide-react'
import { getWhatsAppLink } from './constants'

export function FloatingWhatsApp() {
  const [isVisible, setIsVisible] = useState(false)
  const [isNearBottom, setIsNearBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      
      setIsVisible(scrollY > 300)
      // Hide when within 200px of bottom (footer area)
      setIsNearBottom(scrollY + winHeight > docHeight - 200)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Hide completely on mobile when near footer
  const shouldShow = isVisible && !(isNearBottom)

  return (
    <a
      href={getWhatsAppLink("Hi Rachid, I'm interested in CELTA Prep Morocco")}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 
        md:bottom-6 md:translate-y-0 md:opacity-100
        ${shouldShow ? 'bottom-44 translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}
      `}
    >
      <div className="relative">
        <Phone className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full" />
      </div>
      <span className="font-body font-semibold hidden sm:inline">Chat Now</span>
    </a>
  )
}
