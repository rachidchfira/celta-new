import { Shield, CheckCircle2 } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

export function GuaranteeSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="bg-gradient-to-br from-[#0e0c0a] to-[#1a1816] rounded-3xl p-8 md:p-12 text-center border border-[#2a2725]">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c9a84c] mb-6">
              <Shield className="w-8 h-8 text-[#0e0c0a]" />
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#f5f0e8] mb-6">
              The CELTA Confidence Guarantee
            </h2>
            
            <p className="font-body text-lg md:text-xl text-[#a09890] mb-6 max-w-2xl mx-auto">
              Complete all 4 weeks and the mock teaching day. If you don&apos;t pass CELTA on your first attempt, 
              I&apos;ll provide additional 1-on-1 support at <span className="text-[#c9a84c] font-semibold">no extra cost</span> until you do.
            </p>
            
            <p className="font-body text-[#6b6560] mb-8 max-w-xl mx-auto">
              This includes: additional teaching practice sessions, assignment reviews, and WhatsApp support through your next CELTA attempt.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 text-[#f5f0e8]">
                <CheckCircle2 className="w-5 h-5 text-[#c9a84c]" />
                <span className="font-body">Additional sessions included</span>
              </div>
              <div className="flex items-center gap-2 text-[#f5f0e8]">
                <CheckCircle2 className="w-5 h-5 text-[#c9a84c]" />
                <span className="font-body">Support until you pass</span>
              </div>
              <div className="flex items-center gap-2 text-[#f5f0e8]">
                <CheckCircle2 className="w-5 h-5 text-[#c9a84c]" />
                <span className="font-body">No extra cost</span>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
