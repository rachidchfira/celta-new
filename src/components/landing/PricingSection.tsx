'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckCircle2, ArrowRight, HelpCircle } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { getWhatsAppLink } from './constants'
import { useRouter } from 'next/navigation'

const pricingTiers = [
  {
    name: "Self-Study",
    price: "80",
    description: "For independent learners on a budget.",
    features: [
      'Full recorded curriculum access',
      'All templates and materials',
      'Community WhatsApp group',
      'Self-paced learning'
    ],
    ctaMessage: "Hi Rachid, I'm interested in the Self-Study program ($80 USD). Can you tell me more?",
    ctaText: "Join the Course",
    isOnlinePurchase: true
  },
  {
    name: "Full Prep Program",
    price: "150",
    description: "The complete preparation experience.",
    isPopular: true,
    features: [
      'All live Zoom sessions',
      '2× personal teaching feedback',
      'Priority WhatsApp support',
      'Full mock teaching day',
      'All 4 assignments reviewed'
    ],
    ctaMessage: "Hi Rachid, I'm interested in the Full Prep Program ($150 USD). What's included?",
    ctaText: "Get Started"
  },
  {
    name: "VIP Intensive",
    price: "350",
    description: "Maximum support for maximum results.",
    features: [
      'Everything in Full Program',
      '5× private 1-on-1 sessions',
      'All assignments polished with you',
      'Same-day WhatsApp response',
      'Post-CELTA career strategy call'
    ],
    ctaMessage: "Hi Rachid, I'm interested in the VIP Intensive ($350 USD). I'd like to discuss if it's right for me.",
    ctaText: "Apply Now"
  }
]

function PricingCard({
  name,
  price,
  description,
  features,
  isPopular = false,
  ctaMessage,
  ctaText,
  isOnlinePurchase = false
}: {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  ctaMessage: string
  ctaText: string
  isOnlinePurchase?: boolean
}) {
  const router = useRouter()
  
  const handleButtonClick = () => {
    if (isOnlinePurchase) {
      router.push('/course')
    }
  }

  return (
    <Card className={`relative bg-white border-2 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col ${
      isPopular ? 'border-[#c9a84c] scale-105 z-10' : 'border-[#d4cdc0]'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-[#c9a84c] text-[#0e0c0a] px-4 py-1 font-semibold">
            Most Popular
          </Badge>
        </div>
      )}
      <CardContent className="p-6 md:p-8 flex flex-col h-full">
        <div className="mb-4">
          <h3 className="font-display text-2xl font-bold text-[#0e0c0a] mb-1">{name}</h3>
          <p className="font-body text-[#6b6560] text-sm">{description}</p>
        </div>
        <div className="mb-6">
          <span className="font-display text-4xl md:text-5xl font-bold text-[#0e0c0a]">${price}</span>
          <span className="font-body text-[#6b6560]"> USD</span>
        </div>
        <ul className="space-y-3 mb-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#c9a84c] mt-0.5 flex-shrink-0" />
              <span className="font-body text-[#0e0c0a]">{feature}</span>
            </li>
          ))}
        </ul>
        {isOnlinePurchase ? (
          <Button
            onClick={handleButtonClick}
            className={`w-full font-body font-semibold text-lg py-6 ${
              isPopular 
                ? 'bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b]' 
                : 'bg-[#0e0c0a] text-[#f5f0e8] hover:bg-[#2a2725]'
            }`}
          >
            {ctaText}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        ) : (
          <Button
            asChild
            className={`w-full font-body font-semibold text-lg py-6 ${
              isPopular 
                ? 'bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b]' 
                : 'bg-[#0e0c0a] text-[#f5f0e8] hover:bg-[#2a2725]'
            }`}
          >
            <a href={getWhatsAppLink(ctaMessage)} target="_blank" rel="noopener noreferrer">
              {ctaText}
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export function PricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-[#e8e0d0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#b85c38] text-white font-body">
              Transparent Pricing
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-6">
              Choose Your Preparation Level
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-2xl mx-auto">
              Three options. One goal: walk into CELTA ready to pass. No hidden fees. Payment plans available.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-3 gap-6 items-stretch">
          {pricingTiers.map((tier, index) => (
            <AnimatedSection key={index}>
              <PricingCard
                name={tier.name}
                price={tier.price}
                description={tier.description}
                features={tier.features}
                isPopular={tier.isPopular}
                ctaMessage={tier.ctaMessage}
                ctaText={tier.ctaText}
                isOnlinePurchase={tier.isOnlinePurchase}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-white rounded-lg px-6 py-4 shadow border border-[#d4cdc0]">
              <HelpCircle className="w-5 h-5 text-[#c9a84c]" />
              <span className="font-body text-[#6b6560]">
                Not sure which option is right for you? 
                <a 
                  href={getWhatsAppLink("Hi Rachid, I'm not sure which CELTA prep option is right for me. Can you help?")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#b85c38] hover:underline ml-1"
                >
                  Let&apos;s talk
                </a>
              </span>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
