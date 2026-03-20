'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Award, Clock, Play, X } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

// Credential Badge Component
function CredentialBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-[#d4cdc0]">
      <Award className="w-4 h-4 text-[#c9a84c]" />
      <span className="font-body text-sm text-[#0e0c0a]">{text}</span>
    </div>
  )
}

// Instructor Avatar Component
function InstructorAvatar() {
  return (
    <div className="relative inline-flex items-center justify-center">
      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] p-1">
        <div className="w-full h-full rounded-full overflow-hidden">
          <img 
            src="/instructor.jpeg" 
            alt="Rachid Chfirra - CELTA Prep Instructor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="absolute -bottom-2 -right-2 bg-[#c9a84c] rounded-full p-2">
        <Award className="w-5 h-5 text-[#0e0c0a]" />
      </div>
    </div>
  )
}

// Video Introduction Component
function VideoIntroduction() {
  const [isPlaying, setIsPlaying] = useState(false)

  // YouTube video ID from https://youtu.be/usqsM5IIoqo
  const videoId = 'usqsM5IIoqo'

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#d4cdc0] bg-[#0e0c0a]">
      <div className="aspect-video relative">
        {!isPlaying ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a1816] to-[#0e0c0a]" />
            {/* Video thumbnail background */}
            <div className="absolute inset-0 opacity-30">
              <img 
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to lower quality thumbnail
                  e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                }}
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="mb-4">
                <InstructorAvatar />
              </div>
              <button
                onClick={() => setIsPlaying(true)}
                className="w-20 h-20 rounded-full bg-[#c9a84c] flex items-center justify-center hover:bg-[#b8973b] transition-all duration-300 hover:scale-110 shadow-lg group"
              >
                <Play className="w-8 h-8 text-[#0e0c0a] ml-1 group-hover:scale-110 transition-transform" />
              </button>
              <p className="font-body text-[#f5f0e8] mt-4 text-sm">
                Watch Rachid&apos;s Introduction
              </p>
              <div className="flex items-center gap-2 mt-2 text-[#a09890] text-xs font-body">
                <Clock className="w-3 h-3" />
                <span>2 min</span>
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 bg-[#0e0c0a]">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Rachid Chfirra - CELTA Prep Morocco Introduction"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full absolute inset-0"
            />
            <button
              onClick={() => setIsPlaying(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#0e0c0a]/80 flex items-center justify-center hover:bg-[#0e0c0a] transition-colors"
            >
              <X className="w-5 h-5 text-[#f5f0e8]" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function InstructorSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Video Side */}
            <div className="order-2 lg:order-1">
              <VideoIntroduction />
            </div>
            
            {/* Story Side */}
            <div className="order-1 lg:order-2">
              <Badge className="mb-4 bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c] font-body">
                Your Instructor
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0e0c0a] mb-6">
                I went through CELTA alone. So you don&apos;t have to.
              </h2>
              <div className="font-body text-[#6b6560] space-y-4 text-lg">
                <p>
                  When I started my CELTA journey, there was no one in Morocco who could tell me what to expect. 
                  No prep course. No local mentor. No one who understood what it meant to be a Moroccan teacher 
                  facing an international assessment.
                </p>
                <p>
                  I passed — but not without struggle. I made mistakes that could have been avoided. 
                  I felt anxieties that could have been dissolved with proper preparation.
                </p>
                <p>
                  After teaching across Morocco and Vietnam, earning my TESOL, completing Train the Trainer, 
                  and now pursuing my DELTA Module 2, I&apos;ve spent years understanding exactly what makes 
                  CELTA challenging — and how to make it achievable for teachers like us.
                </p>
                <p className="text-[#0e0c0a] font-semibold">
                  I built CELTA Prep Morocco because I want every Moroccan teacher after me to have what I didn&apos;t: 
                  preparation, support, and the confidence that comes from knowing exactly what you&apos;re walking into.
                </p>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-2">
                <CredentialBadge text="CELTA Certified" />
                <CredentialBadge text="TESOL Certificate" />
                <CredentialBadge text="Train the Trainer" />
                <CredentialBadge text="DELTA Module 2 Candidate" />
                <CredentialBadge text="B.A. Linguistics" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
