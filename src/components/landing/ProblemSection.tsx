import { AnimatedSection } from './AnimatedSection'
import { AlertTriangle, ArrowRight } from 'lucide-react'

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
    <section className="py-16 md:py-24 bg-[#0e0c0a] relative overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#b85c38]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c9a84c]/6 rounded-full blur-3xl" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#b85c38]/20 border border-[#b85c38]/30 px-4 py-1.5 rounded-full mb-6">
              <AlertTriangle className="w-3.5 h-3.5 text-[#b85c38]" />
              <span className="font-body text-xs text-[#b85c38] uppercase tracking-widest font-medium">Sound familiar?</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0e8] mb-6 leading-tight">
              The Truth About{' '}
              <span className="text-[#c9a84c]">CELTA in Morocco</span>
            </h2>
            <p className="font-body text-lg md:text-xl text-[#a09890] max-w-3xl mx-auto">
              Every year, talented Moroccan teachers like you face the same fears. 
              These aren&apos;t random worries — they&apos;re the real barriers holding you back.
            </p>
          </div>
        </AnimatedSection>
        
        <div className="space-y-4">
          {problems.map((problem, index) => (
            <AnimatedSection key={index}>
              <div className="problem-card bg-[#1a1816] rounded-2xl p-6 border border-[#2a2725] group cursor-default relative overflow-hidden">
                {/* Left accent line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#b85c38]/0 via-[#b85c38] to-[#b85c38]/0 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#b85c38]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#b85c38]/25 transition-colors duration-300">
                    <AlertTriangle className="w-5 h-5 text-[#b85c38]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-lg md:text-xl text-[#f5f0e8] italic mb-2 font-semibold">{problem.fear}</p>
                    <p className="font-body text-[#a09890] leading-relaxed">{problem.reality}</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#2a2725] group-hover:text-[#b85c38] group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        
        <AnimatedSection>
          <div className="mt-14 text-center">
            <div className="inline-block bg-gradient-to-r from-[#c9a84c]/10 via-[#c9a84c]/20 to-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-2xl px-8 py-6">
              <p className="font-display text-xl md:text-2xl text-[#f5f0e8] font-semibold mb-2">
                But here&apos;s what happens when you stop preparing alone...
              </p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#c9a84c]/40 max-w-[80px]" />
                <p className="font-body text-lg text-[#c9a84c] font-semibold">
                  44 out of 47 students passed CELTA on their first attempt.
                </p>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#c9a84c]/40 max-w-[80px]" />
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
