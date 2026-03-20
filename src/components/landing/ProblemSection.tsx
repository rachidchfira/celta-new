import { AnimatedSection } from './AnimatedSection'
import { AlertTriangle } from 'lucide-react'

const problems = [
  {
    fear: '"I\'ll embarrass myself in front of the assessors."',
    reality: 'Most CELTA candidates freeze during their first teaching practice. Without preparation, you won\'t know how to handle the pressure.'
  },
  {
    fear: '"What if I waste 15,000–25,000 MAD and fail?"',
    reality: 'CELTA costs are significant. Without proper preparation, you\'re gambling with your investment — and your future.'
  },
  {
    fear: '"My written assignments won\'t be good enough."',
    reality: '4 written assignments. Each one has specific criteria. Most candidates underestimate these and lose easy marks.'
  },
  {
    fear: '"There\'s no one in Morocco who understands CELTA."',
    reality: 'Until now. You\'ve been trying to prepare using resources designed for British, American, or European contexts.'
  }
]

export function ProblemSection() {
  return (
    <section className="py-16 md:py-24 bg-[#0e0c0a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0e8] mb-6">
              The Truth About CELTA in Morocco
            </h2>
            <p className="font-body text-lg md:text-xl text-[#a09890] max-w-3xl mx-auto">
              Every year, talented Moroccan teachers like you face the same fears. 
              These aren&apos;t random worries — they&apos;re the real barriers holding you back.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="space-y-6">
          {problems.map((problem, index) => (
            <AnimatedSection key={index}>
              <div className="bg-[#1a1816] rounded-xl p-6 border border-[#2a2725] hover:border-[#b85c38] transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#b85c38]/20 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-[#b85c38]" />
                  </div>
                  <div>
                    <p className="font-body text-lg md:text-xl text-[#f5f0e8] italic mb-2">{problem.fear}</p>
                    <p className="font-body text-[#a09890]">{problem.reality}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection>
          <div className="mt-12 text-center">
            <p className="font-body text-xl md:text-2xl text-[#f5f0e8] font-semibold mb-4">
              But here&apos;s what happens when you stop preparing alone...
            </p>
            <p className="font-body text-lg text-[#c9a84c]">
              44 out of 47 students passed CELTA on their first attempt after completing this program.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
