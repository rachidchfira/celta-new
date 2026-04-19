// Types for the landing page

export interface Booklet {
  id: string
  title: string
  description: string
  coverImage?: string | null
}

export interface CourseLesson {
  id: string
  title: string
  description: string | null
  youtubeId: string
  duration: number
  order: number
  moduleId: string
}

export interface CourseModule {
  id: string
  title: string
  description: string | null
  order: number
  lessons: CourseLesson[]
}

export interface Enrollment {
  id: string
  email: string
  name: string | null
  enrolledAt: string
  progress: number
  completedLessons: number
  totalLessons: number
}

export interface LessonProgress {
  lessonId: string
  completed: boolean
}

export interface QuizAnswer {
  text: string
  score: number
}

export interface QuizQuestion {
  question: string
  options: QuizAnswer[]
}

export interface SocialProofEvent {
  type: 'enrollment' | 'download' | 'quiz'
  name: string
  location: string
  action: string
}

export interface Testimonial {
  quote: string
  name: string
  location: string
  result?: string
}

export interface WeekData {
  week: number
  title: string
  outcomes: string[]
  feeling: string
}

export interface PricingTier {
  name: string
  price: string
  description: string
  features: string[]
  isPopular?: boolean
  ctaMessage: string
  limited?: boolean
}

export interface Persona {
  icon: React.ElementType
  title: string
  description: string
  cta: string
}

export interface FAQ {
  q: string
  a: string
}
