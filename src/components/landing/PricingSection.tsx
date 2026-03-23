'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight, Zap, Shield, Users, Crown } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { getWhatsAppLink } from './constants'
import { useRouter } from 'next/navigation'

const pricingTiers = [
  {
    name: "Self-Study",
    price: "79",
    description: "For independent learners on a budget.",
    icon: Users,
    accentColor: "#6b6560",
    features: [
      'Full recorded curriculum access',
      'All templates and materials',
      'Community WhatsApp group',
      'Self-paced learning'
    ],
    ctaMessage: "Hi Rachid, I'm interested in the Self-Study program ($79 USD). Can you tell me more?",
    ctaText: "Join the Course",
    isOnlinePurchase: true
  },
  {
    name: "Full Prep Program",
    price: "149",
    description: "The complete preparation experience.",
    icon: Zap,
    accentColor: "#c9a84c",
    isPopular: true,
    features: [
      'All live Zoom sessions',
      '2× personal teaching feedback',
      'Priority WhatsApp support',
      'Full mock teaching day',
      'All 4 assignments reviewed',
      'Limited to 12 students'
    ],
    ctaMessage: "Hi Rachid, I'm interested in the Full Prep Program ($149 USD). What's included?",
    ctaText: "Get Started"
  },
  {
    name: "VIP Intensive",
    price: "249",
    description: "Maximum support for maximum results.",
    icon: Crown,
    accentColor: "#b85c38",
    features: [
      'Everything in Full Program',
      '5× private 1-on-1 sessions',
      'All assignments polished with you',
      'Same-day WhatsApp response',
      'Post-CELTA career strategy call',
      'DELTA pathway roadmap',
      'Max 3 students per cohort'
    ],
    ctaMessage: "Hi Rachid, I'm interested in the VIP Intensive ($249 USD). I'd like to discuss if it's right for me.",
    ctaText: "Apply Now"
  }
]

function PricingCard({
  name, price, description, features, isPopular = false,
  ctaMessage, ctaText, isOnlinePurchase = false, icon: Icon, accentColor
}: {
  name: string; price: string; description: string; features: string[]
  isPopular?: boolean; ctaMessage: string; ctaText: string
  isOnlinePurchase?: boolean; icon: any; accentColor: string
}) {
  const router = useRouter()

  return (
    <div className={`relative h-full flex flex-col ${isPopular ? 'pricing-popular rounded-2xl' : ''}`}>
      {isPopular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] text-xs font-body font-bold px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap tracking-wide uppercase">
            ✦ Most Popular ✦
          </div>
        </div>
      )}

      <Card className={`relative h-full flex flex-col overflow-hidden border-2 transition-all duration-300 ${
        isPopular ? 'border-[#c9a84c] bg-white' : 'border-[#d4cdc0] bg-white hover:border-[#c9a84c]/50'
      }`}>
        {/* Top gradient stripe */}
        <div className="h-1.5 w-full" style={{
          background: isPopular
            ? 'linear-gradient(90deg, #c9a84c, #e8c96a, #c9a84c)'
            : `linear-gradient(90deg, ${accentColor}80, ${accentColor}40)`
        }} />

        {/* Background glow for popular */}
        {isPopular && (
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#c9a84c]/5 rounded-full blur-2xl pointer-events-none" />
        )}

        <CardContent className="p-7 flex flex-col h-full relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${accentColor}15` }}>
                <Icon className="w-5 h-5" style={{ color: accentColor }} />
              </div>
              <h3 className="font-display text-2xl font-bold text-[#0e0c0a]">{name}</h3>
              <p className="font-body text-[#6b6560] text-sm mt-1">{description}</p>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6 pb-6 border-b border-[#e8e0d0]">
            <div className="flex items-end gap-1">
              <span className="font-body text-lg text-[#6b6560] mb-1">$</span>
              <span className="font-display text-5xl font-bold text-[#0e0c0a] stat-number leading-none">{price}</span>
              <span className="font-body text-[#6b6560] mb-1 ml-1">USD</span>
            </div>
            {isPopular && (
              <p className="font-body text-xs text-[#c9a84c] font-semibold mt-2">
                💳 Payment plans available · Split into 2
              </p>
            )}
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8 flex-grow">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4.5 h-4.5 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                <span className="font-body text-sm text-[#0e0c0a] leading-snug">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          {isOnlinePurchase ? (
            <Button
              onClick={() => router.push('/course')}
              className="btn-shine w-full font-body font-semibold text-base py-6 transition-all duration-300"
              style={{
                background: isPopular ? 'linear-gradient(135deg, #c9a84c, #b8973b)' : '#0e0c0a',
                color: isPopular ? '#0e0c0a' : '#f5f0e8'
              }}
            >
              {ctaText}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              asChild
              className="btn-shine w-full font-body font-semibold text-base py-6 transition-all duration-300"
              style={{
                background: isPopular ? 'linear-gradient(135deg, #c9a84c, #b8973b)' : '#0e0c0a',
                color: isPopular ? '#0e0c0a' : '#f5f0e8'
              }}
            >
              <a href={getWhatsAppLink(ctaMessage)} target="_blank" rel="noopener noreferrer">
                {ctaText}
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-28 bg-[#f5f0e8] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#c9a84c]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#b85c38]/10 border border-[#b85c38]/25 px-4 py-1.5 rounded-full mb-6">
              <Shield className="w-3.5 h-3.5 text-[#b85c38]" />
              <span className="font-body text-xs text-[#b85c38] uppercase tracking-widest font-semibold">Transparent Pricing</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-5">
              Choose Your{' '}
              <span className="text-[#c9a84c]">Preparation Level</span>
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-2xl mx-auto">
              Three options. One goal: walk into CELTA ready to pass.
              No hidden fees. Payment plans available.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6 items-start pt-6">
          {pricingTiers.map((tier, index) => (
            <AnimatedSection key={index} className={`stagger-${index + 1}`}>
              <PricingCard
                name={tier.name}
                price={tier.price}
                description={tier.description}
                features={tier.features}
                isPopular={tier.isPopular}
                ctaMessage={tier.ctaMessage}
                ctaText={tier.ctaText}
                isOnlinePurchase={tier.isOnlinePurchase}
                icon={tier.icon}
                accentColor={tier.accentColor}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 glass rounded-xl px-6 py-4 shadow-sm border border-white/60">
              <div className="w-8 h-8 rounded-full bg-[#c9a84c]/15 flex items-center justify-center">
                <span className="text-base">💬</span>
              </div>
              <span className="font-body text-[#6b6560] text-sm">
                Not sure which option is right for you?{' '}
                <a
                  href={getWhatsAppLink("Hi Rachid, I'm not sure which CELTA prep option is right for me. Can you help?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b85c38] font-semibold hover:underline ml-0.5"
                >
                  Let&apos;s talk on WhatsApp →
                </a>
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
