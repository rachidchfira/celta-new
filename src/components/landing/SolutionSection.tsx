import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, XCircle, ArrowRight, Clock, Video, MessageCircle, FileText } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

export function SolutionSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c] font-body">
              The Solution
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-6">
              CELTA Prep Morocco
            </h2>
            <p className="font-body text-lg md:text-xl text-[#6b6560] max-w-3xl mx-auto mb-8">
              The only CELTA preparation program designed specifically for Moroccan teachers — 
              by a Moroccan teacher who passed CELTA and knows exactly what you&apos;re going through.
            </p>
          </div>
        </AnimatedSection>

        {/* What You Get */}
        <AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Clock, title: '4 Weeks', desc: 'Structured preparation' },
              { icon: Video, title: 'Live Sessions', desc: 'Not just recordings' },
              { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Questions answered daily' },
              { icon: FileText, title: 'Assignment Help', desc: 'All 4 reviewed' }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 border border-[#d4cdc0] text-center">
                <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-[#c9a84c]" />
                </div>
                <h4 className="font-display font-semibold text-[#0e0c0a]">{item.title}</h4>
                <p className="font-body text-sm text-[#6b6560]">{item.desc}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#d4cdc0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#0e0c0a]">What You&apos;ll Master</h3>
              </div>
              <ul className="font-body text-[#6b6560] space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Every CELTA assessment criterion — and exactly how to meet it</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Lesson planning that impresses assessors (with templates)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>CCQs, ICQs, and staging that show you know what you&apos;re doing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>All 4 written assignments — reviewed before submission</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                  <span>Real teaching practice with honest, constructive feedback</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#d4cdc0]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="font-display text-xl font-semibold text-[#0e0c0a]">What This Is NOT</h3>
              </div>
              <ul className="font-body text-[#6b6560] space-y-3">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>NOT a generic TEFL course — this is 100% CELTA-specific</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>NOT pre-recorded videos you watch alone — live interaction matters</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>NOT a pass guarantee without work — you must participate</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>NOT for CELTA holders — this is preparation, not advanced training</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-red-400 mt-1 flex-shrink-0" />
                  <span>NOT a CELTA replacement — you still take the real course</span>
                </li>
              </ul>
            </div>
          </AnimatedSection>
        </div>

        <AnimatedSection>
          <div className="bg-gradient-to-r from-[#c9a84c] to-[#b85c38] rounded-2xl p-8 md:p-12 text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Our Promise to You
            </h3>
            <p className="font-body text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-6">
              After 4 weeks, you will walk into your CELTA course knowing exactly what assessors expect, 
              confident in your teaching practice, and prepared to pass on your first attempt — 
              <span className="font-semibold"> or we continue working with you for free until you do.</span>
            </p>
            <Button
              asChild
              size="lg"
              className="font-body font-semibold bg-white text-[#0e0c0a] hover:bg-[#f5f0e8]"
            >
              <a href="#pricing">
                See Pricing Options
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
