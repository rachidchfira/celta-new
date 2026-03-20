'use client'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Shield, MessageCircle, ArrowRight, Clock } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { getWhatsAppLink } from './constants'

export function FinalCTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#c9a84c] to-[#b85c38]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Your CELTA journey doesn&apos;t have to be a lonely struggle.
          </h2>
          <p className="font-body text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            In 4 weeks, you could be walking into your CELTA course with complete confidence, 
            knowing exactly what to expect and how to succeed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              asChild
              size="lg"
              className="font-body font-semibold text-lg px-10 py-7 bg-[#0e0c0a] text-[#f5f0e8] hover:bg-[#1a1816] shadow-xl"
            >
              <a href={getWhatsAppLink("Hi Rachid, I'm ready to start preparing for CELTA. How do I enroll?")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Enroll Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm font-body mb-8">
            <span className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Continued support until you pass
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Response within 24 hours
            </span>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
            <p className="font-body text-white/90 text-sm mb-3">
              Payment methods available for Morocco and MENA region:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['Bank Transfer', 'Cash Deposit', 'PayPal', 'Wise'].map((method) => (
                <Badge key={method} variant="outline" className="border-white/30 text-white font-body">
                  {method}
                </Badge>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
