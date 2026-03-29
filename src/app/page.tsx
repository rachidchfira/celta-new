'use client'

import { useEffect } from 'react'
import {
  SocialProofNotification,
  FloatingWhatsApp,
  MobileStickyCTA,
  MobileNav,
  HeroSection,
  QuizSection,
  LeadMagnetSection,
  ProblemSection,
  SolutionSection,
  DoctorTeaser,
  TestimonialsSection,
  CurriculumSection,
  PersonaSection,
  InstructorSection,
  StatsSection,
  OfferSection,
  PricingSection,
  GuaranteeSection,
  FAQSection,
  FinalCTASection,
  Footer,
} from '@/components/landing'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f0e8]">
      {/* Mobile Navigation */}
      <MobileNav />
      
      {/* Social Proof Notifications */}
      <SocialProofNotification />
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
      
      {/* Mobile Sticky CTA */}
      <MobileStickyCTA />

      {/* Hero Section with Instructor Card */}
      <HeroSection />

      {/* Quiz Section */}
      <QuizSection />

      {/* Lead Magnet Section */}
      <LeadMagnetSection />

      {/* Problem Agitation Section */}
      <ProblemSection />

      {/* Solution Introduction Section */}
      <SolutionSection />

      {/* Lesson Plan Doctor Teaser */}
      <DoctorTeaser />

      {/* Social Proof Testimonials */}
      <TestimonialsSection />

      {/* Curriculum Section */}
      <CurriculumSection />

      {/* Who This Is For Section */}
      <PersonaSection />

      {/* Instructor Section with Video */}
      <InstructorSection />

      {/* Stats Section */}
      <StatsSection />

      {/* What You Get Section */}
      <OfferSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* Guarantee Section */}
      <GuaranteeSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Footer with Terms/Privacy */}
      <Footer />
    </div>
  )
}
