'use client'

import dynamic from 'next/dynamic'

const VoiceCoach = dynamic(() => import('@/components/VoiceCoach'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div
        className="w-16 h-16 rounded-full animate-pulse"
        style={{ background: 'linear-gradient(135deg, #c9a84c, #b85c38)' }}
      />
      <p className="font-body text-sm text-[#a09890]">Loading voice coach...</p>
    </div>
  ),
})

export default function VoiceCoachClient() {
  return <VoiceCoach />
}
