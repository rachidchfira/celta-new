import { Badge } from '@/components/ui/badge'
import { GraduationCap, BookOpen, Target } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

// Persona Card Component
function PersonaCard({
  icon: Icon,
  title,
  description,
  cta
}: {
  icon: React.ElementType
  title: string
  description: string
  cta: string
}) {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-[#d4cdc0] hover:shadow-xl transition-all duration-300">
      <div className="w-14 h-14 rounded-full bg-[#e8e0d0] flex items-center justify-center mb-4">
        <Icon className="w-7 h-7 text-[#b85c38]" />
      </div>
      <h3 className="font-display text-xl md:text-2xl font-semibold text-[#0e0c0a] mb-3">{title}</h3>
      <p className="font-body text-[#6b6560] mb-4">{description}</p>
      <p className="font-body text-[#b85c38] font-medium italic">{cta}</p>
    </div>
  )
}

// Personas data
const personas = [
  {
    icon: GraduationCap,
    title: "The Ambitious Graduate",
    description: "You're finishing your English degree at a Moroccan university. You want to teach internationally — Vietnam, Korea, the Gulf, Europe — but you've never taught formally. CELTA feels like something 'other people' do, and you're not sure if you qualify.",
    cta: "If that's you, this program was built for you."
  },
  {
    icon: BookOpen,
    title: "The Novice Teacher",
    description: "You're already teaching at a private school or language center in Morocco. You don't have formal certification. Every day brings a whisper of impostor syndrome. You've known CELTA would change your career for 2 years now — but you don't know where to start.",
    cta: "If that's you, this program was built for you."
  },
  {
    icon: Target,
    title: "The Second-Chance Candidate",
    description: "You tried CELTA before. Maybe you withdrew. Maybe you didn't pass. You know you can do this — you just need someone to show you exactly what went wrong and how to fix it before you try again. You're not giving up on your dream.",
    cta: "If that's you, this program was built for you."
  }
]

export function PersonaSection() {
  return (
    <section className="py-16 md:py-24 bg-[#e8e0d0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#b85c38] text-white font-body">
              Who This Is For
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-6">
              This Program Was Built For You If...
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-6">
          {personas.map((persona, index) => (
            <AnimatedSection key={index}>
              <PersonaCard
                icon={persona.icon}
                title={persona.title}
                description={persona.description}
                cta={persona.cta}
              />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
