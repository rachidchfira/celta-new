import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Quote } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const testimonials = [
  {
    quote: "Before this program, I couldn't even explain the difference between a concept question and an instruction question. After 4 weeks, I was the one helping other CELTA candidates understand CCQs. Passed first attempt.",
    name: "Sara M.",
    location: "Casablanca",
    result: "Passed CELTA First Attempt",
    detail: "English Graduate, Hassan II University"
  },
  {
    quote: "The mock teaching day was terrifying — exactly like the real thing. When I walked into my actual CELTA teaching practice, nothing surprised me. I knew exactly what to do. That alone was worth the investment.",
    name: "Youssef A.",
    location: "Rabat",
    result: "First Attempt Pass",
    detail: "Private School Teacher, 3 years experience"
  },
  {
    quote: "I failed CELTA the first time. I thought I was prepared. I wasn't. This program showed me exactly what I did wrong — and how to fix it. Second attempt: Pass A. Rachid changed my career trajectory.",
    name: "Nadia B.",
    location: "Fès",
    result: "Pass A on Second Attempt",
    detail: "Now teaching in Dubai"
  }
]

function TestimonialCard({ 
  quote, 
  name, 
  location, 
  result,
  detail
}: { 
  quote: string
  name: string
  location: string
  result: string
  detail: string
}) {
  return (
    <Card className="bg-white border-[#d4cdc0] shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
          ))}
        </div>
        <Quote className="w-8 h-8 text-[#c9a84c]/30 mb-2" />
        <blockquote className="font-body text-[#0e0c0a] text-base md:text-lg mb-4 flex-grow italic">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-auto">
          <Badge className="bg-[#b85c38] text-white hover:bg-[#a04e2d] mb-4">
            {result}
          </Badge>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center text-white font-display font-bold">
              {name.charAt(0)}
            </div>
            <div>
              <p className="font-body font-semibold text-[#0e0c0a]">{name}</p>
              <p className="font-body text-sm text-[#6b6560]">{location}</p>
              <p className="font-body text-xs text-[#a09890]">{detail}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#e8e0d0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0e0c0a] mb-4">
              Real Teachers. Real Results.
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-2xl mx-auto">
              These are actual students who prepared with us. Their results speak for themselves.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index}>
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                location={testimonial.location}
                result={testimonial.result}
                detail={testimonial.detail}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 bg-white rounded-full px-8 py-4 shadow-lg border border-[#d4cdc0]">
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-[#c9a84c]">44</p>
                <p className="font-body text-xs text-[#6b6560]">First-attempt passes</p>
              </div>
              <div className="w-px h-10 bg-[#d4cdc0]" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-[#c9a84c]">3</p>
                <p className="font-body text-xs text-[#6b6560]">Required extra support</p>
              </div>
              <div className="w-px h-10 bg-[#d4cdc0]" />
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-[#c9a84c]">47</p>
                <p className="font-body text-xs text-[#6b6560]">Total students</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
