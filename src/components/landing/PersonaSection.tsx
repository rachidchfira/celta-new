import { Badge } from '@/components/ui/badge'
import { GraduationCap, BookOpen, Target, ArrowRight } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const personas = [
  {
    icon: GraduationCap,
    number: '01',
    title: "The Ambitious Graduate",
    description: "You're finishing your English degree at a Moroccan university. You want to teach internationally — Vietnam, Korea, the Gulf, Europe — but you've never taught formally. CELTA feels like something 'other people' do. You check Instagram at night wondering if you'll ever get out.",
    cta: "This program was built for you.",
    accentColor: '#c9a84c',
    bg: 'bg-[#f5f0e8]',
    border: 'border-[#d4cdc0]'
  },
  {
    icon: BookOpen,
    number: '02',
    title: "The Novice Teacher",
    description: "You're already teaching at a private school or language center in Morocco. You don't have formal certification. Every day brings a whisper of impostor syndrome. You've known CELTA would change your career for 2 years now — but you don't know where to start.",
    cta: "This program was built for you.",
    accentColor: '#b85c38',
    bg: 'bg-[#0e0c0a]',
    border: 'border-[#2a2725]',
    dark: true
  },
  {
    icon: Target,
    number: '03',
    title: "The Second-Chance Candidate",
    description: "You tried CELTA before. Maybe you withdrew. Maybe you didn't pass. You know you can do this — you just need someone to show you exactly what went wrong and how to fix it before you try again. You're not giving up on your dream.",
    cta: "This program was built for you.",
    accentColor: '#c9a84c',
    bg: 'bg-[#f5f0e8]',
    border: 'border-[#d4cdc0]'
  }
]

export function PersonaSection() {
  return (
    <section className="py-16 md:py-28 bg-[#e8e0d0] relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-25" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[#c9a84c]/6 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#b85c38]/10 border border-[#b85c38]/25 px-4 py-1.5 rounded-full mb-6">
              <span className="font-body text-xs text-[#b85c38] uppercase tracking-widest font-semibold">Who This Is For</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-5">
              Recognise{' '}
              <span className="text-[#b85c38]">Yourself?</span>
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-xl mx-auto">
              This program was designed around three specific teachers. One of them is you.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, index) => {
            const Icon = persona.icon
            return (
              <AnimatedSection key={index} className={`stagger-${index + 1}`}>
                <div className={`premium-card group relative h-full rounded-3xl border-2 ${persona.bg} ${persona.border} overflow-hidden`}>
                  {/* Top gradient bar */}
                  <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${persona.accentColor}60, ${persona.accentColor}, ${persona.accentColor}60)` }} />

                  {/* Subtle bg dot for dark cards */}
                  {persona.dark && (
                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                  )}

                  <div className="p-7 relative z-10">
                    {/* Number + icon row */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md" style={{ background: `${persona.accentColor}15`, border: `1px solid ${persona.accentColor}30` }}>
                        <Icon className="w-7 h-7" style={{ color: persona.accentColor }} />
                      </div>
                      <span className="font-display text-5xl font-bold opacity-10" style={{ color: persona.accentColor }}>
                        {persona.number}
                      </span>
                    </div>

                    <h3 className={`font-display text-xl font-bold mb-4 leading-tight ${persona.dark ? 'text-[#f5f0e8]' : 'text-[#0e0c0a]'}`}>
                      {persona.title}
                    </h3>

                    <p className={`font-body text-sm leading-relaxed mb-6 ${persona.dark ? 'text-[#a09890]' : 'text-[#6b6560]'}`}>
                      {persona.description}
                    </p>

                    {/* CTA line */}
                    <div className="flex items-center gap-2 pt-4 border-t" style={{ borderColor: persona.dark ? '#2a2725' : '#d4cdc0' }}>
                      <ArrowRight className="w-4 h-4 flex-shrink-0" style={{ color: persona.accentColor }} />
                      <p className="font-body text-sm font-semibold italic" style={{ color: persona.accentColor }}>
                        {persona.cta}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
