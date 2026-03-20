import { AnimatedSection } from './AnimatedSection'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Target, FileText, MessageCircle, Users, Award, CheckCircle2, Heart } from 'lucide-react'

// Curriculum modules matching actual course
const curriculumModules = [
  {
    module: 1,
    title: "Introduction to CELTA",
    lessons: ["What CELTA Is & How It Works", "The 5 Key Units You'll Master"],
    feeling: "After Module 1: You understand exactly what CELTA demands and how to prepare for it."
  },
  {
    module: 2,
    title: "Lesson Architecture",
    lessons: ["Building CELTA-Standard Lessons", "PPP, TTT & Guided Discovery Frameworks"],
    feeling: "After Module 2: You can plan lessons that meet CELTA criteria every time."
  },
  {
    module: 3,
    title: "Grammar & Vocabulary",
    lessons: ["FMUP Framework (Form, Meaning, Use, Pronunciation)", "CCQs & Language Analysis"],
    feeling: "After Module 3: You teach grammar with confidence using proven frameworks."
  },
  {
    module: 4,
    title: "Receptive Skills",
    lessons: ["Reading Lessons (Gist → Detail)", "Listening Lessons Without Suffering"],
    feeling: "After Module 4: Receptive skills lessons are clear and structured."
  },
  {
    module: 5,
    title: "Productive Skills",
    lessons: ["Speaking Lessons Framework", "Writing Lessons That Work"],
    feeling: "After Module 5: You balance accuracy and fluency like a pro."
  },
  {
    module: 6,
    title: "Teaching Practice Survival",
    lessons: ["The Safe Planning Formula", "Handling Tutor Feedback"],
    feeling: "After Module 6: You're ready for TP with systems that work."
  },
  {
    module: 7,
    title: "Written Assignments",
    lessons: ["All 4 Assignments Explained", "Avoiding Resubmissions"],
    feeling: "After Module 7: Written work is no longer a mystery."
  },
  {
    module: 8,
    title: "CELTA Survival Guide",
    lessons: ["How to Get Pass A", "Staying Sane During CELTA"],
    feeling: "After Module 8: You're fully prepared to succeed."
  }
]

export function CurriculumSection() {
  return (
    <section id="curriculum" className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c] font-body">
              The Program
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-6">
              8 Modules. 9 Video Lessons. Complete Preparation.
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-2xl mx-auto">
              Each module is designed to build on the last, taking you from uncertainty to complete CELTA readiness.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {curriculumModules.map((module, index) => (
            <AnimatedSection key={index}>
              <div className="bg-[#f5f0e8] rounded-xl p-5 border border-[#d4cdc0] hover:shadow-lg transition-all duration-300 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center">
                    <span className="font-display font-bold text-[#0e0c0a] text-sm">{module.module}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-[#0e0c0a]">{module.title}</h3>
                </div>
                <ul className="space-y-1 mb-3">
                  {module.lessons.map((lesson, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                      <span className="font-body text-[#6b6560]">{lesson}</span>
                    </li>
                  ))}
                </ul>
                <p className="font-body text-xs text-[#b85c38] italic pt-2 border-t border-[#d4cdc0]">
                  {module.feeling}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection>
          <div className="mt-8 text-center">
            <p className="font-body text-[#6b6560]">
              <strong className="text-[#0e0c0a]">Total:</strong> 9 video lessons • ~6 hours of content • Lifetime access
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
