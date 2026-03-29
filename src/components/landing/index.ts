// Types
export type { 
  Booklet, 
  CourseLesson, 
  CourseModule, 
  Enrollment, 
  LessonProgress, 
  QuizAnswer, 
  QuizQuestion, 
  SocialProofEvent, 
  Testimonial, 
  WeekData, 
  PricingTier, 
  Persona, 
  FAQ 
} from './types'

// Constants
export { 
  WHATSAPP_NUMBER, 
  getWhatsAppLink, 
  socialProofEvents, 
  quizQuestions, 
  testimonials, 
  curriculumWeeks, 
  pricingTiers, 
  problemThoughts, 
  offerItems, 
  stats, 
  bookletPreviews,
  faqs,
  personasData
} from './constants'

// Hooks
export { useScrollAnimation, useCountdown } from './hooks'

// Components
export { AnimatedSection } from './AnimatedSection'
export { SocialProofNotification } from './SocialProofNotification'
export { FloatingWhatsApp } from './FloatingWhatsApp'
export { MobileStickyCTA } from './MobileStickyCTA'
export { MobileNav } from './MobileNav'
export { HeroSection } from './HeroSection'
export { QuizSection } from './QuizSection'
export { LeadMagnetSection } from './LeadMagnetSection'
export { ProblemSection } from './ProblemSection'
export { SolutionSection } from './SolutionSection'
export { TestimonialsSection } from './TestimonialsSection'
export { CurriculumSection } from './CurriculumSection'
export { PersonaSection } from './PersonaSection'
export { InstructorSection } from './InstructorSection'
export { StatsSection } from './StatsSection'
export { OfferSection } from './OfferSection'
export { PricingSection } from './PricingSection'
export { GuaranteeSection } from './GuaranteeSection'
export { FAQSection } from './FAQSection'
export { FinalCTASection } from './FinalCTASection'
export { Footer } from './Footer'
export { DoctorTeaser } from './DoctorTeaser'
