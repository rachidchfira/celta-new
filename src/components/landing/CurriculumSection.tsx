'use client'

import { AnimatedSection } from './AnimatedSection'
import { CheckCircle2, ChevronRight } from 'lucide-react'

const curriculumModules = [
  {
    module: 1,
    title: "Introduction to CELTA",
    lessons: ["What CELTA Is & How It Works", "The 5 Key Units You'll Master"],
    feeling: "The mystery is gone. You finally understand what CELTA actually demands."
  },
  {
    module: 2,
    title: "Lesson Architecture",
    lessons: ["Building CELTA-Standard Lessons", "PPP, TTT & Guided Discovery Frameworks"],
    feeling: "You can plan lessons that meet CELTA criteria every time."
  },
  {
    module: 3,
    title: "Grammar & Vocabulary",
    lessons: ["FMUP Framework (Form, Meaning, Use, Pronunciation)", "CCQs & Language Analysis"],
    feeling: "You teach grammar with confidence using proven frameworks."
  },
  {
    module: 4,
    title: "Receptive Skills",
    lessons: ["Reading Lessons (Gist → Detail)", "Listening Lessons Without Suffering"],
    feeling: "Receptive skills lessons are clear, structured, and purposeful."
  },
  {
    module: 5,
    title: "Productive Skills",
    lessons: ["Speaking Lessons Framework", "Writing Lessons That Work"],
    feeling: "You balance accuracy and fluency like a pro."
  },
  {
    module: 6,
    title: "Teaching Practice Survival",
    lessons: ["The Safe Planning Formula", "Handling Tutor Feedback"],
    feeling: "You're ready for TP with systems that actually work."
  },
  {
    module: 7,
    title: "Written Assignments",
    lessons: ["All 4 Assignments Explained", "Avoiding Resubmissions"],
    feeling: "Written work is no longer a mystery — it's a process."
  },
  {
    module: 8,
    title: "CELTA Survival Guide",
    lessons: ["How to Get Pass A", "Staying Sane During CELTA"],
    feeling: "You're fully prepared. Not hoping — knowing."
  }
]

const goldModules = [1, 2, 3, 4]

export function CurriculumSection() {
  return (
    <section id="curriculum" className="py-16 md:py-28 bg-white relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 dot-pattern opacity-20" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a84c]/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 px-4 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]" />
              <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-semibold">The Program</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-5">
              8 Modules.{' '}
              <span className="text-[#c9a84c]">Complete Preparation.</span>
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-2xl mx-auto">
              Each module builds on the last — from uncertainty to complete CELTA readiness in 4 weeks.
            </p>
          </div>
        </AnimatedSection>

        {/* Module grid with connector line */}
        <div className="relative">
          {/* Vertical connector line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-[#c9a84c]/60 via-[#c9a84c]/20 to-transparent -translate-x-1/2 pointer-events-none" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {curriculumModules.map((mod, index) => {
              const isGold = goldModules.includes(mod.module)
              return (
                <AnimatedSection key={index} className={`stagger-${(index % 4) + 1}`}>
                  <div className={`group relative h-full rounded-2xl border-2 transition-all duration-300 overflow-hidden cursor-default
                    ${isGold
                      ? 'bg-[#f5f0e8] border-[#d4cdc0] hover:border-[#c9a84c]/70 hover:shadow-lg hover:shadow-[#c9a84c]/10'
                      : 'bg-[#0e0c0a] border-[#2a2725] hover:border-[#c9a84c]/40 hover:shadow-lg hover:shadow-[#c9a84c]/10'
                    }`}
                  >
                    {/* Top accent */}
                    <div className="h-1 w-full bg-gradient-to-r from-[#c9a84c]/60 via-[#c9a84c] to-[#c9a84c]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="p-5">
                      {/* Module number */}
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#b8973b] flex items-center justify-center shadow-md flex-shrink-0">
                          <span className="font-display font-bold text-[#0e0c0a] text-sm">{mod.module}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 ${isGold ? 'text-[#c9a84c]' : 'text-[#c9a84c]/60'}`} />
                      </div>

                      {/* Title */}
                      <h3 className={`font-display text-base font-bold mb-3 leading-tight ${isGold ? 'text-[#0e0c0a]' : 'text-[#f5f0e8]'}`}>
                        {mod.title}
                      </h3>

                      {/* Lessons */}
                      <ul className="space-y-2 mb-4">
                        {mod.lessons.map((lesson, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                            <span className={`font-body text-xs leading-snug ${isGold ? 'text-[#6b6560]' : 'text-[#a09890]'}`}>
                              {lesson}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* Feeling */}
                      <div className={`pt-3 border-t ${isGold ? 'border-[#d4cdc0]' : 'border-[#2a2725]'}`}>
                        <p className="font-body text-xs text-[#c9a84c] italic leading-snug">
                          ✦ {mod.feeling}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              )
            })}
          </div>
        </div>

        {/* Bottom summary bar */}
        <AnimatedSection>
          <div className="mt-12 flex flex-wrap justify-center gap-8 items-center bg-[#f5f0e8] rounded-2xl border border-[#d4cdc0] px-8 py-5">
            {[
              { num: '8', label: 'Modules' },
              { num: '9+', label: 'Video lessons' },
              { num: '~6h', label: 'Of content' },
              { num: '∞', label: 'Lifetime access' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-2xl font-bold text-[#c9a84c] stat-number">{item.num}</p>
                <p className="font-body text-xs text-[#6b6560] mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
