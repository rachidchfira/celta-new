'use client'

import { Button } from '@/components/ui/button'
import { 
  Users, 
  Target, 
  Star, 
  MessageCircle, 
  Award, 
  Play
} from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { getWhatsAppLink } from './constants'

// Credential Badge Component
function CredentialBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-[#d4cdc0]">
      <Award className="w-3.5 h-3.5 text-[#c9a84c]" />
      <span className="font-body text-xs text-[#0e0c0a]">{text}</span>
    </div>
  )
}

// Star Rating Component
function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
        ))}
      </div>
      <span className="font-body text-sm font-semibold text-[#0e0c0a]">{rating}</span>
      <span className="font-body text-xs text-[#6b6560]">— Based on {reviews} reviews</span>
    </div>
  )
}

// Social Proof Avatar
function SocialAvatar({ initials }: { initials: string }) {
  return (
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center text-white text-xs font-bold border-2 border-white -ml-2 first:ml-0">
      {initials}
    </div>
  )
}

// Instructor Card Component
function InstructorCard() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/20 to-[#b85c38]/20 rounded-3xl transform rotate-3" />
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-[#d4cdc0]">
        {/* Header */}
        <div className="text-center mb-4">
          <p className="font-body text-xs text-[#6b6560] uppercase tracking-wider mb-3">Your Instructor</p>
          
          {/* Avatar */}
          <div className="relative inline-flex items-center justify-center mb-3">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] p-1">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src="/instructor.jpeg" 
                  alt="Rachid Chfirra - CELTA Prep Instructor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-[#c9a84c] rounded-full p-1.5">
              <Award className="w-4 h-4 text-[#0e0c0a]" />
            </div>
          </div>
          
          <h3 className="font-display text-xl font-bold text-[#0e0c0a]">Rachid Chfirra</h3>
          <p className="font-body text-sm text-[#b85c38]">CELTA Certified | DELTA Candidate</p>
        </div>
        
        {/* Star Rating */}
        <div className="mb-4">
          <StarRating rating={4.9} reviews={38} />
        </div>
        
        {/* Credential Tags */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-4">
          <CredentialBadge text="CELTA Certified" />
          <CredentialBadge text="TESOL" />
          <CredentialBadge text="Train the Trainer" />
          <CredentialBadge text="5+ Years EFL" />
        </div>
        
        {/* Testimonial Quote */}
        <div className="bg-[#f5f0e8] rounded-xl p-4 mb-4">
          <p className="font-body text-sm text-[#0e0c0a] italic leading-relaxed">
            &ldquo;Passed first attempt. Rachid&apos;s approach is completely different from anything I&apos;d found online.&rdquo;
          </p>
          <div className="mt-2 pt-2 border-t border-[#d4cdc0]">
            <p className="font-body text-xs text-[#6b6560]">
              <span className="font-semibold text-[#0e0c0a]">Fatima Z., Casablanca</span> · CELTA Pass A
            </p>
          </div>
        </div>
        
        {/* Social Proof Footer */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="flex">
            <SocialAvatar initials="FZ" />
            <SocialAvatar initials="AM" />
            <SocialAvatar initials="KH" />
            <SocialAvatar initials="YB" />
          </div>
          <p className="font-body text-xs text-[#6b6560]">
            <span className="font-semibold text-[#0e0c0a]">44 teachers</span> enrolled this month
          </p>
        </div>
      </div>
    </div>
  )
}

// Stat Item Component
function StatItem({ number, label, showDivider = true }: { number: string; label: string; showDivider?: boolean }) {
  return (
    <div className="flex items-center">
      <div className="text-center px-4 sm:px-6">
        <div className="font-display text-2xl md:text-3xl font-bold text-[#0e0c0a]">{number}</div>
        <div className="font-body text-xs md:text-sm text-[#6b6560] mt-1">{label}</div>
      </div>
      {showDivider && (
        <div className="h-10 w-px bg-[#d4cdc0]" />
      )}
    </div>
  )
}

export function HeroSection() {
  return (
    <>
      <header className="relative overflow-hidden pt-16">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8e0d0] via-[#f5f0e8] to-[#e8e0d0]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#b85c38]/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            {/* Hero Copy */}
            <div className="text-center lg:text-left">
              {/* Trust Badge */}
              <AnimatedSection className="stagger-1">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-[#c9a84c] shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-[#c9a84c]" />
                    <span className="font-body text-sm text-[#0e0c0a]">Trusted by <span className="font-semibold">47+</span> Moroccan teachers</span>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Headline */}
              <AnimatedSection className="stagger-2">
                <h1 className="font-display text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#0e0c0a] leading-tight mb-4">
                  Pass <span className="text-[#c9a84c]">CELTA</span> on your first attempt
                </h1>
              </AnimatedSection>
              
              {/* Subtext */}
              <AnimatedSection className="stagger-3">
                <p className="font-body text-base md:text-lg text-[#6b6560] mb-8 max-w-xl mx-auto lg:mx-0">
                  Even if you&apos;ve never taught before.{' '}
                  <span className="text-[#0e0c0a] font-semibold">94% of our students pass first time</span> — 
                  the difference is preparing with someone who&apos;s already done it.
                </p>
              </AnimatedSection>
              
              {/* CTA Buttons */}
              <AnimatedSection className="stagger-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                  <Button
                    asChild
                    size="lg"
                    className="font-body font-semibold text-base px-6 py-6 bg-[#c9a84c] text-white hover:bg-[#b8973b]"
                  >
                    <a href="/course">
                      <Play className="w-4 h-4 mr-2" />
                      Join the Course
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="font-body font-semibold text-base px-6 py-6 border-[#0e0c0a] text-[#0e0c0a] hover:bg-[#0e0c0a] hover:text-white"
                  >
                    <a href={getWhatsAppLink("Hi Rachid, I'd like a free consultation about CELTA prep")} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Free Consultation
                    </a>
                  </Button>
                </div>
              </AnimatedSection>
              
              {/* Stats Row */}
              <AnimatedSection className="stagger-5">
                <div className="flex justify-center lg:justify-start">
                  <div className="inline-flex items-center bg-white rounded-xl border border-[#d4cdc0] shadow-sm">
                    <StatItem number="47" label="teachers trained" />
                    <StatItem number="94%" label="pass rate" />
                    <StatItem number="4.9/5" label="rating" showDivider={false} />
                  </div>
                </div>
              </AnimatedSection>
            </div>
            
            {/* Hero Visual - Instructor Card */}
            <AnimatedSection className="stagger-2">
              <InstructorCard />
            </AnimatedSection>
          </div>
        </div>
      </header>
    </>
  )
}
