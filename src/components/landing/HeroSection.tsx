'use client'

import { Button } from '@/components/ui/button'
import { 
  Users, 
  Star, 
  MessageCircle, 
  Award, 
  Play,
  ChevronDown,
  TrendingUp,
  Globe
} from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { getWhatsAppLink } from './constants'

function CredentialBadge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm border border-[#d4cdc0] hover:border-[#c9a84c] transition-colors duration-200">
      <Award className="w-3.5 h-3.5 text-[#c9a84c]" />
      <span className="font-body text-xs text-[#0e0c0a] font-medium">{text}</span>
    </div>
  )
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
        ))}
      </div>
      <span className="font-body text-sm font-bold text-[#0e0c0a]">{rating}</span>
      <span className="font-body text-xs text-[#6b6560]">({reviews} reviews)</span>
    </div>
  )
}

function SocialAvatar({ initials, delay = 0 }: { initials: string; delay?: number }) {
  return (
    <div 
      className="w-9 h-9 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center text-white text-xs font-bold border-2 border-white -ml-2 first:ml-0 shadow-md"
      style={{ animationDelay: `${delay}s` }}
    >
      {initials}
    </div>
  )
}

function InstructorCard() {
  return (
    <div className="relative">
      {/* Background glow layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/20 to-[#b85c38]/15 rounded-3xl transform rotate-2 blur-sm" />
      <div className="absolute inset-0 bg-gradient-to-tl from-[#b85c38]/10 to-transparent rounded-3xl transform -rotate-1" />
      
      {/* Main card */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-6 md:p-8 border border-[#d4cdc0]/80 overflow-hidden">
        {/* Subtle dot pattern top right */}
        <div className="absolute top-0 right-0 w-32 h-32 dot-pattern opacity-40 rounded-3xl" />
        
        {/* Header */}
        <div className="text-center mb-5 relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-[#c9a84c]/10 px-3 py-1 rounded-full mb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="font-body text-xs text-[#6b6560] uppercase tracking-widest font-medium">Your Instructor</span>
          </div>
          
          {/* Avatar with glow ring */}
          <div className="relative inline-flex items-center justify-center mb-4">
            <div className="w-32 h-32 rounded-full p-1 animate-glow-ring" style={{ background: 'linear-gradient(135deg, #c9a84c, #b85c38, #c9a84c)' }}>
              <div className="w-full h-full rounded-full overflow-hidden">
                <img 
                  src="/instructor.jpeg" 
                  alt="Rachid Chfirra - CELTA Prep Instructor"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-[#c9a84c] to-[#b8973b] rounded-full p-2 shadow-lg">
              <Award className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h3 className="font-display text-2xl font-bold text-[#0e0c0a]">Rachid Chfirra</h3>
          <p className="font-body text-sm font-medium" style={{ color: '#b85c38' }}>CELTA Certified · DELTA Candidate</p>
          
          <div className="flex items-center justify-center gap-1.5 mt-1.5">
            <Globe className="w-3 h-3 text-[#6b6560]" />
            <span className="font-body text-xs text-[#6b6560]">Teaching in 5+ countries</span>
          </div>
        </div>
        
        {/* Star Rating */}
        <div className="mb-5">
          <StarRating rating={4.9} reviews={38} />
        </div>
        
        {/* Credential Tags */}
        <div className="flex flex-wrap gap-2 justify-center mb-5">
          <CredentialBadge text="CELTA Certified" />
          <CredentialBadge text="TESOL" />
          <CredentialBadge text="Train the Trainer" />
          <CredentialBadge text="5+ Years EFL" />
        </div>
        
        {/* Testimonial Quote */}
        <div className="bg-gradient-to-br from-[#f5f0e8] to-[#e8e0d0] rounded-2xl p-4 mb-5 relative overflow-hidden">
          <div className="absolute top-0 left-2 quote-mark-bg font-display leading-none">"</div>
          <p className="font-body text-sm text-[#0e0c0a] italic leading-relaxed relative z-10">
            Passed first attempt. Rachid&apos;s approach is completely different from anything I&apos;d found online.
          </p>
          <div className="mt-3 pt-3 border-t border-[#d4cdc0]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center text-white text-xs font-bold">F</div>
              <div>
                <p className="font-body text-xs font-semibold text-[#0e0c0a]">Fatima Z., Casablanca</p>
                <p className="font-body text-xs text-[#c9a84c] font-medium">✓ CELTA Pass A</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Social Proof Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-[#d4cdc0]">
          <div className="flex">
            <SocialAvatar initials="FZ" />
            <SocialAvatar initials="AM" delay={0.1} />
            <SocialAvatar initials="KH" delay={0.2} />
            <SocialAvatar initials="YB" delay={0.3} />
            <div className="w-9 h-9 rounded-full bg-[#e8e0d0] flex items-center justify-center text-[#6b6560] text-xs font-bold border-2 border-white -ml-2">+40</div>
          </div>
          <div className="text-right">
            <p className="font-body text-xs text-[#0e0c0a] font-semibold">44 teachers</p>
            <p className="font-body text-xs text-[#6b6560]">enrolled this month</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function StatItem({ number, label, icon: Icon, showDivider = true }: { number: string; label: string; icon?: any; showDivider?: boolean }) {
  return (
    <div className="flex items-center">
      <div className="text-center px-4 sm:px-5">
        <div className="font-display text-2xl md:text-3xl font-bold text-[#0e0c0a] stat-number">{number}</div>
        <div className="font-body text-xs text-[#6b6560] mt-0.5">{label}</div>
      </div>
      {showDivider && (
        <div className="h-10 w-px bg-gradient-to-b from-transparent via-[#d4cdc0] to-transparent" />
      )}
    </div>
  )
}

export function HeroSection() {
  return (
    <>
      <header className="relative overflow-hidden pt-16 mesh-gradient">
        {/* Rich layered background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ede5d8] via-[#f5f0e8] to-[#e8e0d0]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a84c]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b85c38]/8 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a84c]/4 rounded-full blur-3xl" />
        
        {/* Dot pattern overlay */}
        <div className="absolute inset-0 dot-pattern opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Hero Copy */}
            <div className="text-center lg:text-left">
              {/* Trust Badge */}
              <AnimatedSection className="stagger-1">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="inline-flex items-center gap-2.5 glass px-4 py-2.5 rounded-full shadow-md border border-[#c9a84c]/40">
                    <div className="flex -space-x-1">
                      {['FZ','AM','KH'].map(i => (
                        <div key={i} className="w-5 h-5 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center text-white text-[8px] font-bold border border-white">{i[0]}</div>
                      ))}
                    </div>
                    <span className="font-body text-sm text-[#0e0c0a]">Trusted by <span className="font-bold text-[#c9a84c]">47+</span> Moroccan teachers</span>
                    <TrendingUp className="w-3.5 h-3.5 text-[#c9a84c]" />
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Headline */}
              <AnimatedSection className="stagger-2">
                <h1 className="font-display text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#0e0c0a] leading-[1.1] mb-4">
                  Pass{' '}
                  <span className="gold-shimmer">CELTA</span>
                  {' '}on your<br />
                  <span className="relative">
                    first attempt
                    <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 300 6" preserveAspectRatio="none">
                      <path d="M0 3 Q75 6 150 3 Q225 0 300 3" stroke="#c9a84c" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                    </svg>
                  </span>
                </h1>
              </AnimatedSection>
              
              {/* Subtext */}
              <AnimatedSection className="stagger-3">
                <p className="font-body text-base md:text-lg text-[#6b6560] mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Even if you&apos;ve never taught before.{' '}
                  <span className="text-[#0e0c0a] font-semibold bg-[#c9a84c]/10 px-1.5 py-0.5 rounded">
                    94% of our students pass first time
                  </span>{' '}
                  — the difference is preparing with someone who&apos;s already done it.
                </p>
              </AnimatedSection>
              
              {/* CTA Buttons */}
              <AnimatedSection className="stagger-4">
                <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-8">
                  <Button
                    asChild
                    size="lg"
                    className="btn-shine font-body font-semibold text-base px-7 py-6 bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-white hover:from-[#b8973b] hover:to-[#a8872b] shadow-lg shadow-[#c9a84c]/30 hover:shadow-xl hover:shadow-[#c9a84c]/40 transition-all duration-300"
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
                    className="font-body font-semibold text-base px-7 py-6 border-2 border-[#0e0c0a] text-[#0e0c0a] hover:bg-[#0e0c0a] hover:text-white transition-all duration-300"
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
                  <div className="inline-flex items-center glass rounded-2xl border border-white/60 shadow-lg overflow-hidden">
                    <StatItem number="47" label="teachers trained" />
                    <StatItem number="94%" label="pass rate" />
                    <StatItem number="4.9★" label="rating" showDivider={false} />
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Scroll hint */}
              <AnimatedSection className="stagger-5">
                <div className="flex justify-center lg:justify-start mt-10 opacity-40">
                  <ChevronDown className="w-5 h-5 text-[#6b6560] animate-bounce" />
                </div>
              </AnimatedSection>
            </div>
            
            {/* Hero Visual - Instructor Card */}
            <AnimatedSection className="stagger-2">
              <div className="animate-float">
                <InstructorCard />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </header>
    </>
  )
}
