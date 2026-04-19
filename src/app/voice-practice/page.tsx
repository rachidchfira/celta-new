import type { Metadata } from 'next'
import Link from 'next/link'
import { Mic, Clock, Target, MessageSquare, ChevronLeft } from 'lucide-react'
import VoiceCoachClient from '@/components/VoiceCoachClient'

export const metadata: Metadata = {
  title: 'Voice Practice | CELTA Prep Morocco',
  description:
    'Practice your classroom English out loud with an AI voice coach. Rehearse instructions, CCQs, and teaching language before your CELTA teaching practice.',
}

const tips = [
  {
    icon: Target,
    title: 'What to practise',
    body: 'Classroom instructions, concept-checking questions, transition phrases, and student-facing language.',
  },
  {
    icon: MessageSquare,
    title: 'How the coach responds',
    body: 'Your AI coach plays a Cambridge assessor — giving real-time feedback on clarity, complexity, and register.',
  },
  {
    icon: Clock,
    title: 'Recommended sessions',
    body: '10–15 minutes daily beats a single long session. Short, focused practice builds fluency fastest.',
  },
]

export default function VoicePracticePage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(180deg, #f5f0e8 0%, #ede8df 100%)' }}
    >
      {/* Back nav */}
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-body text-sm text-[#6b6560] hover:text-[#0e0c0a] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to CELTA Prep Morocco
        </Link>
      </div>

      {/* Hero */}
      <header className="max-w-3xl mx-auto px-4 pt-10 pb-12 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border" style={{ borderColor: '#c9a84c', background: 'rgba(201,168,76,0.08)' }}>
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#c9a84c' }} />
          <span className="font-body text-xs font-semibold uppercase tracking-widest" style={{ color: '#c9a84c' }}>
            AI Voice Coach — Free to try
          </span>
        </div>

        <h1
          className="font-display font-bold text-[#0e0c0a] mb-4 leading-tight"
          style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
        >
          Practice Your CELTA English<br />
          <span style={{ color: '#b85c38' }}>Out Loud</span>
        </h1>

        <p className="font-body text-lg text-[#6b6560] max-w-xl mx-auto leading-relaxed">
          Rehearse classroom instructions, CCQs, and teaching language with an AI coach
          trained on CELTA assessment criteria — before your first teaching practice.
        </p>
      </header>

      {/* Main voice interface */}
      <main className="max-w-3xl mx-auto px-4 pb-12">
        <div
          className="rounded-3xl p-8 mb-10"
          style={{
            background: '#fff',
            border: '1px solid #d4cdc0',
            boxShadow: '0 8px 40px rgba(14,12,10,0.08)',
          }}
        >
          <VoiceCoachClient />
        </div>

        {/* Tips */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {tips.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl p-5"
              style={{ background: '#f5f0e8', border: '1px solid #d4cdc0' }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
                style={{ background: 'rgba(201,168,76,0.15)' }}
              >
                <Icon className="w-4 h-4" style={{ color: '#c9a84c' }} />
              </div>
              <h3 className="font-body font-semibold text-[#0e0c0a] mb-1 text-sm">{title}</h3>
              <p className="font-body text-sm text-[#6b6560] leading-relaxed">{body}</p>
            </div>
          ))}
        </div>

        {/* CTA to main site */}
        <div
          className="rounded-2xl p-8 text-center"
          style={{
            background: 'linear-gradient(135deg, #0e0c0a 0%, #1a1614 100%)',
          }}
        >
          <h2 className="font-display font-bold text-2xl mb-2" style={{ color: '#f5f0e8' }}>
            Ready to go deeper?
          </h2>
          <p className="font-body text-sm mb-6" style={{ color: '#a09890' }}>
            Voice practice is one part of full CELTA preparation. Join the program that's helped
            94% of students pass on their first attempt.
          </p>
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-2 font-body font-semibold px-8 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #c9a84c, #b85c38)',
              color: '#fff',
              boxShadow: '0 4px 20px rgba(201,168,76,0.3)',
            }}
          >
            See the full program
          </Link>
        </div>
      </main>
    </div>
  )
}
