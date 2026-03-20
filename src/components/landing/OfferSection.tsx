import { Badge } from '@/components/ui/badge'
import { Video, BookOpen, Target, MessageCircle, Users, Sparkles, MapPin, Award } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { offerItems } from './constants'

// Icon map for dynamic icon rendering
const iconMap: Record<string, React.ElementType> = {
  Video: Video,
  BookOpen: BookOpen,
  Target: Target,
  MessageCircle: MessageCircle,
  Users: Users,
  Sparkles: Sparkles,
  MapPin: MapPin,
  Award: Award
}

export function OfferSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c] font-body">
              What You Get
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-6">
              Everything You Need to Pass CELTA
            </h2>
            <p className="font-body text-lg text-[#6b6560]">
              Here&apos;s exactly what&apos;s included when you join the Full Prep Program.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="bg-white rounded-2xl shadow-xl border border-[#d4cdc0] overflow-hidden">
            <div className="bg-gradient-to-r from-[#c9a84c] to-[#b8973b] p-6 text-center">
              <h3 className="font-display text-2xl font-bold text-[#0e0c0a]">Full Prep Program Includes</h3>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-4">
                {offerItems.map((item, index) => {
                  const Icon = iconMap[item.icon]
                  return (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-[#f5f0e8]">
                      <Icon className="w-6 h-6 text-[#c9a84c] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-body font-semibold text-[#0e0c0a]">{item.title}</p>
                        <p className="font-body text-sm text-[#6b6560]">{item.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <div className="mt-8 pt-6 border-t border-[#d4cdc0]">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-body text-[#6b6560]">Full Prep Program</p>
                    <p className="font-body text-sm text-[#a09890]">4 weeks of live instruction + materials + support</p>
                  </div>
                  <div className="text-center md:text-right">
                    <p className="font-body text-[#0e0c0a] font-semibold">Your investment</p>
                    <p className="font-display text-4xl font-bold text-[#c9a84c]">$150 USD</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
