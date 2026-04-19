'use client'

import { useState } from 'react'
import { Award, Clock, Play, X, BookOpen, Globe, Linkedin } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const credentials = [
  { label: 'CELTA Certified', icon: Award },
  { label: 'TESOL Certificate', icon: BookOpen },
  { label: 'Train the Trainer', icon: BookOpen },
  { label: 'DELTA Module 2 Candidate', icon: Award },
  { label: 'B.A. Linguistics', icon: BookOpen },
]

function VideoIntroduction() {
  const [isPlaying, setIsPlaying] = useState(false)
  const videoId = 'usqsM5IIoqo'

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#2a2725] bg-[#0e0c0a]">
      {/* Gold border glow */}
      <div className="absolute inset-0 rounded-3xl ring-1 ring-[#c9a84c]/20 pointer-events-none z-20" />

      <div className="aspect-video relative">
        {!isPlaying ? (
          <>
            {/* Thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1410] to-[#0e0c0a]" />
            <div className="absolute inset-0 opacity-25">
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` }}
              />
            </div>
            {/* Dot pattern overlay */}
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)', backgroundSize: '20px 20px' }} />

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              {/* Instructor photo */}
              <div className="w-20 h-20 rounded-full p-0.5 animate-glow-ring" style={{ background: 'linear-gradient(135deg, #c9a84c, #b85c38)' }}>
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img src="/instructor.jpeg" alt="Rachid Chfirra" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Play button */}
              <button
                onClick={() => setIsPlaying(true)}
                className="group relative w-18 h-18"
                aria-label="Play video"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b8973b] flex items-center justify-center shadow-2xl shadow-[#c9a84c]/30 group-hover:shadow-[#c9a84c]/50 group-hover:scale-110 transition-all duration-300">
                  <Play className="w-7 h-7 text-[#0e0c0a] ml-1" fill="currentColor" />
                </div>
                {/* Ping rings */}
                <span className="absolute inset-0 rounded-full bg-[#c9a84c]/20 animate-ping" />
              </button>

              <div className="text-center">
                <p className="font-body text-[#f5f0e8] text-sm font-semibold">Watch Rachid&apos;s Introduction</p>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-[#a09890]">
                  <Clock className="w-3 h-3" />
                  <span className="font-body text-xs">2 min</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Rachid Chfirra - CELTA Prep Morocco Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full absolute inset-0"
            />
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#0e0c0a]/80 backdrop-blur-sm flex items-center justify-center hover:bg-[#0e0c0a] transition-colors border border-[#2a2725]"
            >
              <X className="w-4 h-4 text-[#f5f0e8]" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function InstructorSection() {
  return (
    <section className="py-16 md:py-28 bg-[#f5f0e8] relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a84c]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Video */}
            <div className="order-2 lg:order-1">
              <VideoIntroduction />
            </div>

            {/* Story */}
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 px-4 py-1.5 rounded-full mb-6">
                <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-semibold">Your Instructor</span>
              </div>

              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0e0c0a] mb-6 leading-tight">
                I went through CELTA alone.{' '}
                <span className="text-[#b85c38]">So you don&apos;t have to.</span>
              </h2>

              <div className="font-body text-[#6b6560] space-y-4 leading-relaxed mb-8">
                <p>
                  When I started my CELTA journey, there was no one in Morocco who could tell me what to expect.
                  No prep course. No local mentor. No one who understood what it meant to be a Moroccan teacher
                  facing an international assessment.
                </p>
                <p>
                  I passed — but not without struggle. I made mistakes that could have been avoided.
                  I felt anxieties that proper preparation would have dissolved.
                </p>
                <p className="text-[#0e0c0a] font-semibold">
                  I built CELTA Prep Morocco so every Moroccan teacher after me has what I didn&apos;t:
                  preparation, support, and the confidence that comes from knowing exactly what you&apos;re walking into.
                </p>
              </div>

              {/* Credentials grid */}
              <div className="flex flex-wrap gap-2 mb-6">
                {credentials.map((cred, i) => (
                  <div key={i} className="inline-flex items-center gap-2 glass border border-[#d4cdc0] px-3 py-1.5 rounded-full hover:border-[#c9a84c]/50 transition-colors duration-200">
                    <Award className="w-3.5 h-3.5 text-[#c9a84c]" />
                    <span className="font-body text-xs text-[#0e0c0a] font-medium">{cred.label}</span>
                  </div>
                ))}
              </div>

              {/* Location row */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#d4cdc0]">
                <Globe className="w-4 h-4 text-[#6b6560]" />
                <span className="font-body text-sm text-[#6b6560]">Based in Vietnam · Teaching since 2019 · Moroccan 🇲🇦</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
