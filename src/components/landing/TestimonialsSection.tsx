import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const testimonials = [
  {
    quote: "Before this program, I couldn't even explain the difference between a concept question and an instruction question. After 4 weeks, I was the one helping other CELTA candidates understand CCQs. Passed first attempt.",
    name: "Sara M.",
    location: "Casablanca",
    result: "Passed CELTA First Attempt",
    detail: "English Graduate, Hassan II University",
    initials: "SM"
  },
  {
    quote: "The mock teaching day was terrifying — exactly like the real thing. When I walked into my actual CELTA teaching practice, nothing surprised me. I knew exactly what to do. That alone was worth the investment.",
    name: "Youssef A.",
    location: "Rabat",
    result: "First Attempt Pass",
    detail: "Private School Teacher, 3 years experience",
    initials: "YA"
  },
  {
    quote: "I failed CELTA the first time. I thought I was prepared. I wasn't. This program showed me exactly what I did wrong — and how to fix it. Second attempt: Pass A. Rachid changed my career trajectory.",
    name: "Nadia B.",
    location: "Fès",
    result: "Pass A on Second Attempt",
    detail: "Now teaching in Dubai",
    initials: "NB"
  }
]

function TestimonialCard({ 
  quote, 
  name, 
  location, 
  result,
  detail,
  initials,
  index
}: { 
  quote: string
  name: string
  location: string
  result: string
  detail: string
  initials: string
  index: number
}) {
  return (
    <Card className="premium-card bg-white border-[#d4cdc0] shadow-lg h-full relative overflow-hidden group">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a84c] via-[#d4b96a] to-[#c9a84c]" />
      
      <CardContent className="p-7 flex flex-col h-full">
        {/* Stars */}
        <div className="flex gap-0.5 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />
          ))}
        </div>
        
        {/* Large quote mark */}
        <div className="absolute top-6 right-6 font-display text-7xl text-[#c9a84c]/10 leading-none select-none pointer-events-none">"</div>
        
        {/* Quote */}
        <blockquote className="font-body text-[#0e0c0a] text-base leading-relaxed mb-6 flex-grow relative z-10">
          &ldquo;{quote}&rdquo;
        </blockquote>
        
        {/* Result badge */}
        <div className="mb-5">
          <Badge className="bg-gradient-to-r from-[#b85c38] to-[#a04e2d] text-white border-0 font-body font-semibold text-xs px-3 py-1">
            ✓ {result}
          </Badge>
        </div>
        
        {/* Author */}
        <div className="mt-auto flex items-center gap-3 pt-4 border-t border-[#e8e0d0]">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center text-white font-display font-bold text-lg flex-shrink-0 shadow-md">
            {initials}
          </div>
          <div>
            <p className="font-body font-semibold text-[#0e0c0a]">{name}</p>
            <p className="font-body text-sm text-[#6b6560]">{location}</p>
            <p className="font-body text-xs text-[#a09890]">{detail}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#e8e0d0] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow-sm border border-[#d4cdc0] mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#c9a84c] text-[#c9a84c]" />
                ))}
              </div>
              <span className="font-body text-xs text-[#6b6560] font-medium">4.9/5 average rating</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-4">
              Real Teachers.{' '}
              <span className="text-[#b85c38]">Real Results.</span>
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-2xl mx-auto">
              These are actual students who prepared with us. Their words, unedited.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <AnimatedSection key={index} className={`stagger-${index + 1}`}>
              <TestimonialCard {...testimonial} index={index} />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-14 text-center">
            <div className="inline-flex flex-wrap justify-center items-center gap-0 bg-white rounded-2xl shadow-xl border border-[#d4cdc0] overflow-hidden">
              {[
                { num: '44', label: 'First-attempt passes', color: '#c9a84c' },
                { num: '3', label: 'Required extra support', color: '#b85c38' },
                { num: '47', label: 'Total students', color: '#0e0c0a' },
                { num: '5+', label: 'Countries they now teach in', color: '#6b6560' },
              ].map((stat, i) => (
                <div key={i} className={`px-8 py-5 text-center ${i < 3 ? 'border-r border-[#e8e0d0]' : ''}`}>
                  <p className="font-display text-3xl font-bold stat-number" style={{ color: stat.color }}>{stat.num}</p>
                  <p className="font-body text-xs text-[#6b6560] mt-1 whitespace-nowrap">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
