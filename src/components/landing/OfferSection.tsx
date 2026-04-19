import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Video, BookOpen, Target, MessageCircle, Users, Sparkles, MapPin, Award, ArrowRight, CheckCircle2 } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { offerItems } from './constants'
import { getWhatsAppLink } from './constants'

const iconMap: Record<string, React.ElementType> = {
  Video, BookOpen, Target, MessageCircle, Users, Sparkles, MapPin, Award
}

export function OfferSection() {
  return (
    <section className="py-16 md:py-28 bg-[#f5f0e8] relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-25" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#b85c38]/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-semibold">What You Get</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-5">
              Everything You Need to{' '}
              <span className="text-[#c9a84c]">Pass CELTA</span>
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-2xl mx-auto">
              Here&apos;s exactly what&apos;s included when you join the Full Prep Program.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-white rounded-3xl shadow-xl border border-[#d4cdc0] overflow-hidden">
            {/* Header bar */}
            <div className="relative bg-gradient-to-r from-[#0e0c0a] via-[#1a1816] to-[#0e0c0a] px-8 py-6 overflow-hidden">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)', backgroundSize: '20px 20px' }} />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h3 className="font-display text-2xl font-bold text-[#f5f0e8]">Full Prep Program Includes</h3>
                  <p className="font-body text-sm text-[#a09890] mt-1">4 weeks · Live sessions · Lifetime access</p>
                </div>
                <div className="flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/30 px-4 py-2 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a84c]" />
                  <span className="font-body text-sm text-[#c9a84c] font-semibold">8 items included</span>
                </div>
              </div>
            </div>

            {/* Items grid */}
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-3">
                {offerItems.map((item, index) => {
                  const Icon = iconMap[item.icon]
                  return (
                    <div key={index} className="group flex items-start gap-4 p-4 rounded-2xl bg-[#f5f0e8] border border-[#e8e0d0] hover:border-[#c9a84c]/50 hover:bg-[#faf7f2] transition-all duration-200">
                      <div className="w-10 h-10 rounded-xl bg-white border border-[#d4cdc0] flex items-center justify-center flex-shrink-0 shadow-sm group-hover:border-[#c9a84c]/50 group-hover:shadow-md transition-all duration-200">
                        <Icon className="w-5 h-5 text-[#c9a84c]" />
                      </div>
                      <div>
                        <p className="font-body font-semibold text-[#0e0c0a] text-sm">{item.title}</p>
                        <p className="font-body text-xs text-[#6b6560] mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Price + CTA */}
              <div className="mt-8 pt-6 border-t border-[#d4cdc0]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="font-body text-sm text-[#6b6560]">Full Prep Program</p>
                    <p className="font-body text-xs text-[#a09890] mt-0.5">4 weeks of live instruction + all materials + support</p>
                    <div className="flex items-baseline gap-1 mt-2">
                      <span className="font-body text-xl text-[#6b6560]">$</span>
                      <span className="font-display text-5xl font-bold text-[#0e0c0a] stat-number">149</span>
                      <span className="font-body text-[#6b6560]">USD</span>
                    </div>
                    <p className="font-body text-xs text-[#c9a84c] font-semibold mt-1">💳 Payment plans available</p>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    className="btn-shine font-body font-bold text-base px-10 py-6 bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#d4b96a] hover:to-[#c9a84c] shadow-lg shadow-[#c9a84c]/25 transition-all duration-300"
                  >
                    <a href={getWhatsAppLink("Hi Rachid, I'm interested in the Full Prep Program ($149 USD). What's included?")} target="_blank" rel="noopener noreferrer">
                      Get Started Today
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
