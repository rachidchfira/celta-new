'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import {
  Play,
  Clock,
  CheckCircle2,
  Lock,
  LogIn,
  Loader2,
  Video,
  Award,
  MessageCircle,
  FileText,
  ChevronRight,
  Mail,
  User,
  Sparkles,
  Target,
  BookOpen,
  Globe
} from 'lucide-react'

// Types
interface Lesson {
  id: string
  title: string
  description: string | null
  youtubeId: string
  duration: number
  order: number
  moduleId: string
  hasQuiz: boolean
}

interface Module {
  id: string
  title: string
  description: string | null
  order: number
  lessons: Lesson[]
}

interface Enrollment {
  id: string
  email: string
  name: string | null
  enrolledAt: string
  progress: number
  completedLessons: number
  totalLessons: number
}

interface LessonProgress {
  lessonId: string
  completed: boolean
  watchTime: number
}

// WhatsApp number
const WHATSAPP_NUMBER = '84703027485'
const getWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

// Course modules - Intro + 8 Modules with real YouTube videos
const DEMO_MODULES: Module[] = [
  {
    id: 'module-intro',
    title: 'Cambridge CELTA Guide: The 5 Key Units & Essential Skills You Need to Master Teaching',
    description: 'Comprehensive guide to the Cambridge Intensive CELTA Course covering all 5 key units.',
    order: 0,
    lessons: [
      {
        id: 'lesson-intro',
        title: 'Cambridge CELTA Guide: The 5 Key Units & Essential Skills',
        description: 'The 5 Key Units & Essential Skills You Need to Master Teaching.',
        youtubeId: 'KSyL7V3ODT4',
        duration: 26,
        order: 1,
        moduleId: 'module-intro',
        hasQuiz: false
      }
    ]
  },
  {
    id: 'module-1',
    title: 'Introduction to my complete CELTA UNLOCKED Preparation Course',
    description: 'Complete overview of the CELTA UNLOCKED preparation program.',
    order: 1,
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Introduction to CELTA UNLOCKED Preparation Course',
        description: 'Introduction to the complete CELTA UNLOCKED Preparation Course.',
        youtubeId: 'usqsM5IIoqo',
        duration: 34,
        order: 1,
        moduleId: 'module-1',
        hasQuiz: false
      }
    ]
  },
  {
    id: 'module-2',
    title: 'CELTA UNLOCKED – Lesson Architecture',
    description: 'How to Build a CELTA-Standard Lesson Every Time.',
    order: 2,
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'CELTA UNLOCKED – Lesson Architecture',
        description: 'Learn to deliver safe, predictable, pass-grade lessons.',
        youtubeId: '8bWD0J8C-TU',
        duration: 50,
        order: 1,
        moduleId: 'module-2',
        hasQuiz: false
      }
    ]
  },
  {
    id: 'module-3',
    title: 'How to Teach Grammar & Vocabulary the CELTA Way',
    description: 'Master the FMUP framework and effective CCQs.',
    order: 3,
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'How to Teach Grammar & Vocabulary the CELTA Way',
        description: 'Learn exactly how Cambridge expects grammar and vocabulary to be taught.',
        youtubeId: 'M6etT6bg5XE',
        duration: 60,
        order: 1,
        moduleId: 'module-3',
        hasQuiz: false
      }
    ]
  },
  {
    id: 'module-4',
    title: 'CELTA Skills Lessons - Reading & Listening',
    description: 'Master receptive skills lessons.',
    order: 4,
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'CELTA Skills Lessons - Reading & Listening',
        description: 'Learn the exact receptive-skills structure tutors expect.',
        youtubeId: 'qZwvc5BlDRo',
        duration: 40,
        order: 1,
        moduleId: 'module-4',
        hasQuiz: false
      }
    ]
  },
  {
    id: 'module-5',
    title: 'How to Teach Speaking & Writing (Productive Skills)',
    description: 'Master productive skills lessons.',
    order: 5,
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'How to Teach Speaking & Writing (Productive Skills)',
        description: 'Learn the CELTA structure for productive skills lessons.',
        youtubeId: '_govkbNLKOI',
        duration: 42,
        order: 1,
        moduleId: 'module-5',
        hasQuiz: false
      }
    ]
  },
  {
    id: 'module-6',
    title: 'TP Survival & Feedback Mastery',
    description: 'Frameworks for Teaching Practice success.',
    order: 6,
    lessons: [
      {
        id: 'lesson-6-1',
        title: 'TP Survival & Feedback Mastery',
        description: 'Master teaching practice with proven frameworks.',
        youtubeId: 'lwt8VIH7_5E',
        duration: 41,
        order: 1,
        moduleId: 'module-6',
        hasQuiz: false
      }
    ]
  },
  {
    id: 'module-7',
    title: 'Assignments Masterclass: How to Pass All 4',
    description: 'Complete guide to all 4 CELTA written assignments.',
    order: 7,
    lessons: [
      {
        id: 'lesson-7-1',
        title: 'Assignments Masterclass: How to Pass All 4',
        description: 'Learn what tutors look for and how to structure your work.',
        youtubeId: '13tz3E9dThg',
        duration: 38,
        order: 1,
        moduleId: 'module-7',
        hasQuiz: false
      }
    ]
  },
  {
    id: 'module-8',
    title: 'CELTA Survival Guide: How to Stay Sane & Get a Pass A',
    description: 'Essential tips for surviving CELTA.',
    order: 8,
    lessons: [
      {
        id: 'lesson-8-1',
        title: 'CELTA Survival Guide: How to Stay Sane & Get a Pass A',
        description: 'Strategies for time management, self-care, and achieving the best possible grade.',
        youtubeId: 'elQSAx2LbMQ',
        duration: 29,
        order: 1,
        moduleId: 'module-8',
        hasQuiz: false
      }
    ]
  }
]

// Video Player Component
function VideoPlayer({
  lesson,
  onComplete,
  isCompleted,
  onNextLesson,
  hasNextLesson
}: {
  lesson: Lesson
  onComplete: () => void
  isCompleted: boolean
  onNextLesson?: () => void
  hasNextLesson?: boolean
}) {
  const [videoError, setVideoError] = useState(false)

  // Demo video placeholder - real videos will be added by instructor
  // Treat as demo only if no YouTube ID is set
  const isDemoVideo = !lesson.youtubeId || lesson.youtubeId.trim() === ''

  return (
    <div className="bg-[#0e0c0a] rounded-2xl overflow-hidden shadow-2xl">
      <div className="aspect-video relative">
        {isDemoVideo ? (
          // Show placeholder for demo content
          <div className="w-full h-full bg-gradient-to-br from-[#1a1816] to-[#0e0c0a] flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-[#c9a84c]/20 flex items-center justify-center mb-4">
              <Video className="w-10 h-10 text-[#c9a84c]" />
            </div>
            <p className="font-display text-xl font-bold text-[#f5f0e8] mb-2">Demo Lesson</p>
            <p className="font-body text-sm text-[#a09890] text-center max-w-md px-4">
              Video content will be added by the instructor. 
              This is a placeholder for the actual lesson video.
            </p>
            <Badge className="mt-4 bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/30">
              Click "Mark as Complete" to continue
            </Badge>
          </div>
        ) : videoError ? (
          // Show error state
          <div className="w-full h-full bg-gradient-to-br from-[#1a1816] to-[#0e0c0a] flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
              <Video className="w-10 h-10 text-red-400" />
            </div>
            <p className="font-display text-xl font-bold text-[#f5f0e8] mb-2">Video Unavailable</p>
            <p className="font-body text-sm text-[#a09890] text-center max-w-md px-4">
              This video is currently unavailable. Please contact support.
            </p>
          </div>
        ) : (
          // Show YouTube embed for real videos
          <iframe
            src={`https://www.youtube.com/embed/${lesson.youtubeId}?rel=0&modestbranding=1`}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full absolute inset-0"
            onError={() => setVideoError(true)}
          />
        )}
      </div>
      <div className="p-3 sm:p-4 md:p-6 bg-gradient-to-r from-[#1a1816] to-[#0e0c0a]">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-[#f5f0e8] leading-tight">{lesson.title}</h3>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {isCompleted && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
            {isDemoVideo && (
              <Badge className="bg-[#c9a84c]/20 text-[#c9a84c] border-[#c9a84c]/30">
                Demo
              </Badge>
            )}
          </div>
          {lesson.description && (
            <p className="font-body text-sm text-[#a09890] leading-relaxed">{lesson.description}</p>
          )}
          
          {/* Action Buttons - Always Visible */}
          <div className="flex flex-wrap items-center gap-3 mt-3 pt-4 border-t border-[#2a2725]">
            {!isCompleted ? (
              <Button
                onClick={onComplete}
                className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold text-base px-6 py-3"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Mark as Complete
              </Button>
            ) : hasNextLesson && onNextLesson ? (
              <Button
                onClick={onNextLesson}
                className="bg-[#b85c38] text-white hover:bg-[#a04b2a] font-body font-semibold text-base px-6 py-3"
              >
                Next Video
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <div className="flex items-center gap-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full py-2 px-4">
                <Award className="w-5 h-5" />
                <span className="font-body font-semibold">Course Complete!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Mobile Course Content Drawer
function MobileCourseDrawer({
  modules,
  currentLesson,
  onSelectLesson,
  completedLessons,
  isOpen,
  onToggle
}: {
  modules: Module[]
  currentLesson: Lesson | null
  onSelectLesson: (lesson: Lesson) => void
  completedLessons: Set<string>
  isOpen: boolean
  onToggle: () => void
}) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedCount = completedLessons.size

  return (
    <div className="lg:hidden">
      {/* Sticky Toggle Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-[#c9a84c] to-[#b85c38] shadow-lg flex items-center justify-center"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        ) : (
          <BookOpen className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={onToggle}
        />
      )}

      {/* Drawer Content */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`} style={{ maxHeight: '80vh' }}>
        {/* Drawer Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 rounded-full bg-[#d4cdc0]" />
        </div>

        {/* Drawer Header */}
        <div className="px-4 pb-3 border-b border-[#e8e0d0]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold text-[#0e0c0a]">Course Content</h3>
              <p className="font-body text-sm text-[#6b6560]">{completedCount}/{totalLessons} completed</p>
            </div>
            <Progress value={totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0} className="w-20 h-2" />
          </div>
        </div>

        {/* Module List with Lessons */}
        <div className="overflow-y-auto p-4" style={{ maxHeight: 'calc(80vh - 100px)' }}>
          <div className="space-y-2">
            {modules.map((module) => {
              const moduleCompleted = module.lessons.every(l => completedLessons.has(l.id))
              const moduleProgress = module.lessons.filter(l => completedLessons.has(l.id)).length
              const isExpanded = expandedModule === module.id

              return (
                <div key={module.id} className="bg-[#f5f0e8] rounded-xl overflow-hidden">
                  {/* Module Header - Click to expand */}
                  <button
                    onClick={() => setExpandedModule(isExpanded ? null : module.id)}
                    className="w-full p-3 flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      moduleCompleted
                        ? 'bg-green-500 text-white'
                        : 'bg-[#c9a84c] text-[#0e0c0a]'
                    }`}>
                      {moduleCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="font-display font-bold text-sm">{module.order}</span>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-body font-semibold text-[#0e0c0a] text-sm">
                        {module.title}
                      </p>
                      <p className="font-body text-xs text-[#6b6560]">
                        {moduleProgress}/{module.lessons.length} completed
                      </p>
                    </div>
                    <ChevronRight className={`w-5 h-5 text-[#6b6560] transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Lessons List - Show when expanded */}
                  {isExpanded && (
                    <div className="px-2 pb-2 space-y-1">
                      {module.lessons.map((lesson) => {
                        const isLessonCompleted = completedLessons.has(lesson.id)
                        const isCurrent = currentLesson?.id === lesson.id

                        return (
                          <button
                            key={lesson.id}
                            onClick={() => {
                              onSelectLesson(lesson)
                              onToggle()
                            }}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                              isCurrent
                                ? 'bg-[#c9a84c]/20 border border-[#c9a84c]'
                                : 'hover:bg-[#e8e0d0]'
                            }`}
                          >
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                              isLessonCompleted
                                ? 'bg-green-500 text-white'
                                : 'bg-[#d4cdc0] text-[#6b6560]'
                            }`}>
                              {isLessonCompleted ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : (
                                <Play className="w-3 h-3" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`font-body text-sm truncate ${
                                isCurrent ? 'text-[#c9a84c] font-semibold' : 'text-[#0e0c0a]'
                              }`}>
                                {lesson.title}
                              </p>
                            </div>
                            {isCurrent && (
                              <Badge className="bg-[#c9a84c] text-[#0e0c0a] text-xs">
                                Playing
                              </Badge>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// Desktop Course Sidebar
function CourseSidebar({
  modules,
  currentLesson,
  onSelectLesson,
  completedLessons
}: {
  modules: Module[]
  currentLesson: Lesson | null
  onSelectLesson: (lesson: Lesson) => void
  completedLessons: Set<string>
}) {
  return (
    <div className="hidden lg:block bg-white rounded-2xl border border-[#d4cdc0] shadow-lg overflow-hidden h-full">
      <div className="p-4 bg-gradient-to-r from-[#c9a84c] to-[#b85c38]">
        <h3 className="font-display text-lg font-bold text-white">Course Content</h3>
        <p className="font-body text-sm text-white/80 mt-1">
          {modules.reduce((acc, m) => acc + m.lessons.length, 0)} lessons
        </p>
      </div>
      <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
        <Accordion type="multiple" defaultValue={['module-1']} className="w-full">
          {modules.map((module) => {
            const moduleCompleted = module.lessons.every(l => completedLessons.has(l.id))
            const moduleProgress = module.lessons.filter(l => completedLessons.has(l.id)).length

            return (
              <AccordionItem key={module.id} value={module.id} className="border-b border-[#e8e0d0]">
                <AccordionTrigger className="px-4 py-3 hover:bg-[#f5f0e8] transition-colors">
                  <div className="flex items-center gap-3 text-left">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      moduleCompleted
                        ? 'bg-green-100 text-green-600'
                        : 'bg-[#e8e0d0] text-[#0e0c0a]'
                    }`}>
                      {moduleCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="font-display font-bold text-sm">{module.order}</span>
                      )}
                    </div>
                    <div>
                      <p className="font-body font-semibold text-[#0e0c0a] text-sm">
                        {module.title}
                      </p>
                      <p className="font-body text-xs text-[#6b6560]">
                        {moduleProgress}/{module.lessons.length} completed
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="space-y-1 px-2 pb-2">
                    {module.lessons.map((lesson) => {
                      const isCompleted = completedLessons.has(lesson.id)
                      const isCurrent = currentLesson?.id === lesson.id

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => onSelectLesson(lesson)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${
                            isCurrent
                              ? 'bg-[#c9a84c]/10 border border-[#c9a84c]'
                              : 'hover:bg-[#f5f0e8]'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : 'bg-[#e8e0d0] text-[#6b6560]'
                          }`}>
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-body text-sm truncate ${
                              isCurrent ? 'text-[#c9a84c] font-semibold' : 'text-[#0e0c0a]'
                            }`}>
                              {lesson.title}
                            </p>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${
                            isCurrent ? 'text-[#c9a84c]' : 'text-[#6b6560]'
                          }`} />
                        </button>
                      )
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}

// GraduationCap Icon
function GraduationCap({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.084a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M22 10v6" />
      <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
  )
}

// Login Form Component - Email-Only Access
function LoginForm({
  onLogin,
  isLoading,
  error,
  onClose
}: {
  onLogin: (email: string) => void
  isLoading: boolean
  error: string | null
  onClose: () => void
}) {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(email)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md bg-white border-[#d4cdc0] relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#e8e0d0] hover:bg-[#d4cdc0] flex items-center justify-center transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#6b6560]">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-display text-2xl text-[#0e0c0a]">Access Your Course</h2>
            <p className="font-body text-[#6b6560] mt-2">
              Enter your email to access the course
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-[#0e0c0a] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-[#d4cdc0] rounded-lg focus:border-[#c9a84c] focus:outline-none font-body text-lg"
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-body text-sm text-red-600">{error}</p>
              </div>
            )}
            <Button
              type="submit"
              disabled={isLoading || !email}
              className="w-full bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold py-6 text-lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Accessing...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 mr-2" />
                  Access Course
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#e8e0d0]">
            <p className="font-body text-sm text-[#6b6560] text-center mb-4">
              Not enrolled yet?
            </p>
            <Button
              asChild
              className="w-full bg-[#0e0c0a] text-[#f5f0e8] hover:bg-[#2a2725] font-body font-semibold"
            >
              <a href={getWhatsAppLink("Hi Rachid, I want to enroll in the CELTA PREP COURSE")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Enroll Now via WhatsApp
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Course Dashboard Component
function CourseDashboard({
  enrollment,
  modules,
  progress,
  onLogout
}: {
  enrollment: Enrollment
  modules: Module[]
  progress: LessonProgress[]
  onLogout: () => void
}) {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null)
  const [lessonProgress, setLessonProgress] = useState<LessonProgress[]>(progress)
  const [isUpdating, setIsUpdating] = useState(false)
  const [booklets, setBooklets] = useState<{ name: string; id: string; size: number }[]>([])
  const [downloadingBooklet, setDownloadingBooklet] = useState<string | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Fetch booklets on mount
  useEffect(() => {
    const fetchBooklets = async () => {
      try {
        const response = await fetch('/api/booklets')
        const data = await response.json()
        if (data.booklets && data.booklets.length > 0) {
          setBooklets(data.booklets)
        }
      } catch (error) {
        console.error('Error fetching booklets:', error)
      }
    }
    fetchBooklets()
  }, [])

  // Handle booklet download
  const handleDownload = async (filename: string) => {
    setDownloadingBooklet(filename)
    try {
      // Use the proxy endpoint for direct download
      const link = document.createElement('a')
      link.href = `/api/booklets/file?file=${encodeURIComponent(filename)}`
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading booklet:', error)
      alert('Failed to download. Please try again.')
    } finally {
      setDownloadingBooklet(null)
    }
  }

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const completedLessons = new Set(
    lessonProgress.filter(p => p.completed).map(p => p.lessonId)
  )

  // Get all lessons in order
  const allLessons = modules.flatMap(m => m.lessons)
  
  // Find next lesson
  const getNextLesson = useCallback(() => {
    if (!currentLesson) return null
    const currentIndex = allLessons.findIndex(l => l.id === currentLesson.id)
    if (currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1]
    }
    return null
  }, [currentLesson, allLessons])

  const hasNextLesson = getNextLesson() !== null

  const handleSelectLesson = useCallback((lesson: Lesson) => {
    setCurrentLesson(lesson)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleNextLesson = useCallback(() => {
    const next = getNextLesson()
    if (next) {
      handleSelectLesson(next)
    }
  }, [getNextLesson, handleSelectLesson])

  const handleCompleteLesson = useCallback(async () => {
    if (!currentLesson) return

    setIsUpdating(true)
    try {
      const response = await fetch('/api/course/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enrollmentId: enrollment.id,
          lessonId: currentLesson.id,
          completed: true
        })
      })

      if (response.ok) {
        setLessonProgress(prev => {
          const existing = prev.find(p => p.lessonId === currentLesson.id)
          if (existing) {
            return prev.map(p => p.lessonId === currentLesson.id ? { ...p, completed: true } : p)
          }
          return [...prev, { lessonId: currentLesson.id, completed: true, watchTime: 0 }]
        })
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    } finally {
      setIsUpdating(false)
    }
  }, [currentLesson, enrollment.id])

  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedCount = completedLessons.size
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Header */}
      <header className="bg-[#0e0c0a] text-white py-3 sm:py-4 px-3 sm:px-4 md:px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <a href="/" className="flex items-center gap-2 sm:gap-4 min-w-0">
            <img 
              src="/logo.svg?v=2" 
              alt="CELTA Prep Morocco" 
              className="h-8 sm:h-10 w-auto flex-shrink-0"
            />
            <div className="min-w-0">
              <h1 className="font-display text-sm sm:text-lg md:text-xl font-bold text-[#f5f0e8] truncate">CELTA PREP COURSE</h1>
              <p className="font-body text-xs text-[#a09890] hidden sm:block">CELTA Unlocked Preparation</p>
            </div>
          </a>
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden md:flex items-center gap-3">
              <div className="text-right">
                <p className="font-body text-sm text-[#a09890]">Welcome back,</p>
                <p className="font-body font-semibold text-[#f5f0e8] truncate max-w-[150px]">{enrollment.name || enrollment.email}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#c9a84c] flex items-center justify-center">
                <User className="w-5 h-5 text-[#0e0c0a]" />
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              className="text-[#a09890] hover:text-white hover:bg-white/10 font-body text-xs sm:text-sm px-2 sm:px-4"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b border-[#d4cdc0] py-2 sm:py-3 px-3 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-1 sm:mb-2">
            <span className="font-body text-xs sm:text-sm text-[#6b6560]">Your Progress</span>
            <span className="font-body text-xs sm:text-sm font-semibold text-[#c9a84c]">{progressPercent}% Complete</span>
          </div>
          <Progress value={progressPercent} className="h-1.5 sm:h-2 bg-[#e8e0d0]" />
          <p className="font-body text-xs text-[#6b6560] mt-1">
            {completedCount} of {totalLessons} lessons completed
          </p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-3 sm:p-4 md:p-6">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Video Area */}
          <div className="lg:col-span-2 space-y-4">
            {currentLesson ? (
              <VideoPlayer
                lesson={currentLesson}
                onComplete={handleCompleteLesson}
                isCompleted={completedLessons.has(currentLesson.id)}
                onNextLesson={handleNextLesson}
                hasNextLesson={hasNextLesson}
              />
            ) : (
              <Card className="bg-white border-[#d4cdc0] shadow-lg">
                <CardContent className="p-6 sm:p-8 md:p-12 text-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-[#e8e0d0] flex items-center justify-center">
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-[#c9a84c]" />
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#0e0c0a] mb-2">
                    Welcome to CELTA PREP COURSE
                  </h3>
                  <p className="font-body text-sm sm:text-base text-[#6b6560] mb-4 sm:mb-6 max-w-md mx-auto">
                    Select a lesson from the sidebar to begin your CELTA preparation journey.
                  </p>
                  <Button
                    onClick={() => {
                      const firstLesson = modules[0]?.lessons[0]
                      if (firstLesson) handleSelectLesson(firstLesson)
                    }}
                    className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start First Lesson
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Downloadable Resources */}
            <Card className="bg-white border-[#d4cdc0] shadow-lg">
              <div className="p-3 sm:p-4 bg-gradient-to-r from-[#c9a84c] to-[#b85c38]">
                <h3 className="font-display text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  Course Materials
                </h3>
                <p className="font-body text-xs sm:text-sm text-white/80">Downloadable resources to support your learning</p>
              </div>
              <CardContent className="p-3 sm:p-4">
                <div className="space-y-2 sm:space-y-3">
                  {booklets.length > 0 ? (
                    booklets.map((booklet) => (
                      <div key={booklet.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-[#f5f0e8] rounded-lg hover:bg-[#e8e0d0] transition-colors gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a84c]" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-body font-semibold text-[#0e0c0a] text-sm truncate">{booklet.name}</p>
                            <p className="font-body text-xs text-[#6b6560]">PDF • {formatSize(booklet.size)}</p>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body w-full sm:w-auto"
                          onClick={() => handleDownload(booklet.name)}
                          disabled={downloadingBooklet === booklet.name}
                        >
                          {downloadingBooklet === booklet.name ? (
                            <Loader2 className="w-4 h-4 sm:mr-1 animate-spin" />
                          ) : (
                            <FileText className="w-4 h-4 sm:mr-1" />
                          )}
                          <span className="sm:inline">Download</span>
                        </Button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6">
                      <FileText className="w-10 h-10 mx-auto text-[#a09890] mb-2" />
                      <p className="font-body text-sm text-[#6b6560]">No booklets available yet</p>
                      <p className="font-body text-xs text-[#a09890]">Materials will be added soon</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Course Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <Card className="bg-white border-[#d4cdc0]">
                <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#c9a84c]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9a84c]" />
                  </div>
                  <div>
                    <p className="font-body text-xs sm:text-sm text-[#6b6560]">Certificate</p>
                    <p className="font-body font-semibold text-[#0e0c0a] text-sm sm:text-base">Completion Certificate</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white border-[#d4cdc0]">
                <CardContent className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#b85c38]/10 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#b85c38]" />
                  </div>
                  <div>
                    <p className="font-body text-xs sm:text-sm text-[#6b6560]">Need Help?</p>
                    <a
                      href={getWhatsAppLink("Hi Rachid, I have a question about the CELTA PREP COURSE")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-body font-semibold text-[#b85c38] hover:underline text-sm sm:text-base"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="lg:col-span-1">
            <CourseSidebar
              modules={modules}
              currentLesson={currentLesson}
              onSelectLesson={handleSelectLesson}
              completedLessons={completedLessons}
            />
          </div>
        </div>
      </main>

      {/* Mobile Course Drawer */}
      <MobileCourseDrawer
        modules={modules}
        currentLesson={currentLesson}
        onSelectLesson={handleSelectLesson}
        completedLessons={completedLessons}
        isOpen={isDrawerOpen}
        onToggle={() => setIsDrawerOpen(!isDrawerOpen)}
      />
    </div>
  )
}

// Sales Page Component
function SalesPage({ onShowLogin }: { onShowLogin: () => void }) {
  const totalLessons = DEMO_MODULES.reduce((acc, m) => acc + m.lessons.length, 0)
  const totalDuration = DEMO_MODULES.reduce((acc, m) => acc + m.lessons.reduce((sum, l) => sum + l.duration, 0), 0)

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0e0c0a] to-[#1a1816] py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-[#c9a84c] text-[#0e0c0a] font-body">
              <Sparkles className="w-3 h-3 mr-1" />
              CELTA Unlocked
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#f5f0e8] mb-6">
              CELTA PREP COURSE
            </h1>
            <p className="font-body text-lg md:text-xl text-[#a09890] max-w-3xl mx-auto mb-8">
              The complete preparation course to help you ace your CELTA certification.
              Created by Rachid Chfirra, CELTA-certified trainer.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-[#c9a84c]">
                <Video className="w-5 h-5" />
                <span className="font-body">{totalLessons} Video Lessons</span>
              </div>
              <div className="flex items-center gap-2 text-[#c9a84c]">
                <Clock className="w-5 h-5" />
                <span className="font-body">{totalDuration}+ Hours</span>
              </div>
              <div className="flex items-center gap-2 text-[#c9a84c]">
                <BookOpen className="w-5 h-5" />
                <span className="font-body">{DEMO_MODULES.length} Modules</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="font-body font-semibold text-lg px-10 py-7 bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b]"
                onClick={onShowLogin}
              >
                <LogIn className="w-5 h-5 mr-2" />
                Access Course
              </Button>
              <Button
                size="lg"
                asChild
                className="font-body font-semibold text-lg px-10 py-7 bg-[#0e0c0a] text-[#f5f0e8] hover:bg-[#2a2725] border border-[#c9a84c]"
              >
                <a href={getWhatsAppLink("Hi Rachid, I want to enroll in the CELTA PREP COURSE")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Enroll Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules Overview */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0e0c0a] mb-4">
              Course Curriculum
            </h2>
            <p className="font-body text-[#6b6560] max-w-2xl mx-auto">
              A structured approach to CELTA preparation, covering everything you need to succeed.
            </p>
          </div>

          <div className="space-y-4">
            {DEMO_MODULES.map((module, index) => (
              <Card key={module.id} className="bg-white border-[#d4cdc0] shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#c9a84c] flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-bold text-[#0e0c0a]">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display text-xl font-semibold text-[#0e0c0a]">
                          {module.title}
                        </h3>
                        <Badge variant="outline" className="border-[#d4cdc0] text-[#6b6560]">
                          {module.lessons.length} lessons
                        </Badge>
                      </div>
                      <p className="font-body text-[#6b6560] mb-4">{module.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {module.lessons.slice(0, 3).map((lesson) => (
                          <div
                            key={lesson.id}
                            className="flex items-center gap-2 text-sm font-body text-[#6b6560] bg-[#f5f0e8] px-3 py-1 rounded-full"
                          >
                            <Lock className="w-3 h-3 text-[#b85c38]" />
                            {lesson.title}
                          </div>
                        ))}
                        {module.lessons.length > 3 && (
                          <div className="text-sm font-body text-[#6b6560] bg-[#f5f0e8] px-3 py-1 rounded-full">
                            +{module.lessons.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0e0c0a] mb-4">
              What You&apos;ll Get
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Video, title: 'Video Lessons', desc: 'HD quality lessons you can watch anytime' },
              { icon: FileText, title: 'Resources', desc: 'Downloadable materials and templates' },
              { icon: Target, title: 'Practice Quizzes', desc: 'Test your knowledge after each module' },
              { icon: Award, title: 'Certificate', desc: 'Certificate of completion' },
            ].map((feature, index) => (
              <Card key={index} className="bg-[#f5f0e8] border-[#d4cdc0] text-center">
                <CardContent className="p-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#c9a84c] flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-[#0e0c0a]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#0e0c0a] mb-2">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-[#6b6560]">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0e0c0a] to-[#1a1816]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-3 bg-[#c9a84c] text-[#0e0c0a] px-6 py-3 rounded-full mb-6">
            <span className="font-body text-sm">One-time payment</span>
            <span className="font-display text-2xl font-bold">$80 USD</span>
            <Badge className="bg-[#b85c38] text-white text-xs">Best Value</Badge>
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#f5f0e8] mb-4">
            Ready to Start Your CELTA Journey?
          </h2>
          <p className="font-body text-lg text-[#a09890] mb-6 max-w-2xl mx-auto">
            Join hundreds of teachers who have successfully prepared for their CELTA certification.
          </p>
          
          <div className="bg-[#1a1816] border border-[#3a3530] rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <h3 className="font-display text-lg font-semibold text-[#c9a84c] mb-3 flex items-center justify-center gap-2">
              <Globe className="w-5 h-5" />
              Pay Your Way - MENA Region
            </h3>
            <p className="font-body text-sm text-[#a09890] mb-4">
              We accept local payment methods in your country:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['🇲🇦 Morocco', '🇩🇿 Algeria', '🇪🇬 Egypt', '🇱🇾 Libya', '🇹🇳 Tunisia', '🌍 MENA Region'].map((country) => (
                <Badge key={country} variant="outline" className="border-[#3a3530] text-[#a09890] font-body">
                  {country}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              asChild
              className="font-body font-semibold text-lg px-10 py-7 bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b]"
            >
              <a href={getWhatsAppLink("Hi Rachid, I want to enroll in the CELTA PREP COURSE ($80 USD). I'm from [YOUR COUNTRY]")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Enroll Now - $80 USD
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={onShowLogin}
              className="font-body font-semibold text-lg px-10 py-7 border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c]/10"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Access Course
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Loading Spinner
function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0c0a] to-[#1a1816] flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-[#c9a84c] mx-auto mb-4" />
        <p className="font-body text-[#a09890]">Loading...</p>
      </div>
    </div>
  )
}

// Main Course Page
export default function CoursePage() {
  const [view, setView] = useState<'sales' | 'login' | 'dashboard'>('sales')
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null)
  const [modules, setModules] = useState<Module[]>(DEMO_MODULES)
  const [progress, setProgress] = useState<LessonProgress[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPageLoading, setIsPageLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedEnrollment = localStorage.getItem('course_enrollment')
    if (savedEnrollment) {
      try {
        const parsed = JSON.parse(savedEnrollment)
        setEnrollment(parsed)
        setView('dashboard')
        // Fetch fresh progress data
        fetchProgressData(parsed.email)
      } catch {
        localStorage.removeItem('course_enrollment')
      }
    }
    setIsPageLoading(false)
  }, [])

  const fetchProgressData = async (email: string) => {
    try {
      const response = await fetch('/api/course/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      if (response.ok && data.enrollment) {
        setEnrollment(data.enrollment)
        setProgress(data.progress || [])
        if (data.modules && data.modules.length > 0) {
          const apiModules = data.modules.map((m: { id: string; title: string; description: string | null; order: number; lessons: { id: string; title: string; description: string | null; youtubeId: string; duration: number; order: number; moduleId: string; hasQuiz: boolean }[] }) => ({
            ...m,
            lessons: m.lessons.map((l: { id: string; title: string; description: string | null; youtubeId: string; duration: number; order: number; moduleId: string; hasQuiz: boolean }) => ({
              id: l.id,
              title: l.title,
              description: l.description,
              youtubeId: l.youtubeId,
              duration: l.duration,
              order: l.order,
              moduleId: l.moduleId || m.id,
              hasQuiz: l.hasQuiz || false
            }))
          }))
          setModules(apiModules)
        }
      }
    } catch (error) {
      console.error('Error fetching progress:', error)
    }
  }

  const handleLogin = async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/course/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to verify enrollment')
        return
      }

      // Save to localStorage for persistence
      const enrollmentData = {
        id: data.enrollment.id,
        email: data.enrollment.email,
        name: data.enrollment.name,
        enrolledAt: data.enrollment.enrolledAt,
        progress: data.enrollment.progress,
        completedLessons: data.enrollment.completedLessons,
        totalLessons: data.enrollment.totalLessons
      }
      localStorage.setItem('course_enrollment', JSON.stringify(enrollmentData))
      
      setEnrollment(enrollmentData)
      setProgress(data.progress || [])

      // Use modules from API response if available
      if (data.modules && data.modules.length > 0) {
        const apiModules = data.modules.map((m: { id: string; title: string; description: string | null; order: number; lessons: { id: string; title: string; description: string | null; youtubeId: string; duration: number; order: number; moduleId: string; hasQuiz: boolean }[] }) => ({
          ...m,
          lessons: m.lessons.map((l: { id: string; title: string; description: string | null; youtubeId: string; duration: number; order: number; moduleId: string; hasQuiz: boolean }) => ({
            id: l.id,
            title: l.title,
            description: l.description,
            youtubeId: l.youtubeId,
            duration: l.duration,
            order: l.order,
            moduleId: l.moduleId || m.id,
            hasQuiz: l.hasQuiz || false
          }))
        }))
        setModules(apiModules)
      }

      setView('dashboard')
    } catch {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('course_enrollment')
    setEnrollment(null)
    setProgress([])
    setView('sales')
  }

  // Show loading spinner
  if (isPageLoading) {
    return <LoadingSpinner />
  }

  // Show dashboard for authenticated users
  if (view === 'dashboard' && enrollment) {
    return (
      <CourseDashboard
        enrollment={enrollment}
        modules={modules}
        progress={progress}
        onLogout={handleLogout}
      />
    )
  }

  // Show sales page with optional login modal
  return (
    <>
      <SalesPage onShowLogin={() => setView('login')} />
      {view === 'login' && (
        <LoginForm 
          onLogin={handleLogin} 
          isLoading={isLoading} 
          error={error} 
          onClose={() => setView('sales')}
        />
      )}
    </>
  )
}
