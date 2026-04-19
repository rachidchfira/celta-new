'use client'

import { useEffect, useState } from 'react'
import { Users, X } from 'lucide-react'
import { socialProofEvents } from './constants'
import type { SocialProofEvent } from './types'

export function SocialProofNotification() {
  const [show, setShow] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<SocialProofEvent>(socialProofEvents[0])

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimer = setTimeout(() => {
      setShow(true)
    }, 5000)

    // Cycle through notifications
    const interval = setInterval(() => {
      setShow(false)
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * socialProofEvents.length)
        setCurrentEvent(socialProofEvents[randomIndex])
        setShow(true)
      }, 500)
    }, 12000) // Show new notification every 12 seconds

    // Auto-hide after 5 seconds of showing
    const hideInterval = setInterval(() => {
      if (show) {
        setTimeout(() => setShow(false), 5000)
      }
    }, 17000)

    return () => {
      clearTimeout(initialTimer)
      clearInterval(interval)
      clearInterval(hideInterval)
    }
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-24 left-4 z-50 max-w-sm animate-slide-in-left">
      <div className="bg-white rounded-xl shadow-2xl border border-[#d4cdc0] p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center flex-shrink-0">
          <Users className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-body text-sm text-[#0e0c0a]">
            <span className="font-semibold">{currentEvent.name}</span>
            <span className="text-[#6b6560]"> from {currentEvent.location}</span>
          </p>
          <p className="font-body text-xs text-[#b85c38]">{currentEvent.action}</p>
        </div>
        <button 
          onClick={() => setShow(false)}
          className="text-[#6b6560] hover:text-[#0e0c0a] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
