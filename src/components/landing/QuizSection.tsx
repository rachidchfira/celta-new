'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { 
  Zap, 
  Clock, 
  Users, 
  Shield, 
  Target, 
  ArrowRight, 
  TrendingUp, 
  Sparkles, 
  MessageCircle, 
  CheckCircle2, 
  Loader2, 
  Download, 
  FileText 
} from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { getWhatsAppLink, quizQuestions } from './constants'
import type { Booklet, QuizAnswer } from './types'

// Quiz Question Component
function QuizQuestion({ 
  question, 
  options, 
  onAnswer,
  questionNumber,
  totalQuestions
}: { 
  question: string
  options: QuizAnswer[]
  onAnswer: (score: number, text: string) => void
  questionNumber: number
  totalQuestions: number
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Badge className="bg-[#c9a84c] text-[#0e0c0a]">
          Question {questionNumber} of {totalQuestions}
        </Badge>
        <Progress value={(questionNumber / totalQuestions) * 100} className="w-24 h-2 bg-[#e8e0d0]" />
      </div>
      <h3 className="font-display text-xl md:text-2xl font-bold text-[#0e0c0a]">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option.score, option.text)}
            className="w-full text-left p-4 rounded-xl border-2 border-[#d4cdc0] hover:border-[#c9a84c] hover:bg-[#f5f0e8] transition-all duration-200 group"
          >
            <span className="font-body text-[#0e0c0a] group-hover:text-[#b85c38]">{option.text}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// Quiz Completion Form Component - Shows results and form to get booklets
function QuizCompletionForm({ 
  score,
  total,
  email,
  setEmail,
  onSubmit,
  isLoading
}: { 
  score: number
  total: number
  email: string
  setEmail: (email: string) => void
  onSubmit: () => void
  isLoading: boolean
}) {
  const percentage = (score / total) * 100
  let result = { title: '', description: '', color: '', cta: '' }

  if (percentage >= 80) {
    result = {
      title: 'Excellent! You\'re CELTA-Ready! 🎉',
      description: 'Your background shows strong preparation for CELTA. You\'re ready to excel!',
      color: 'text-green-600',
      cta: 'Join the Full Prep Program to maximize your success'
    }
  } else if (percentage >= 60) {
    result = {
      title: 'Good Foundation! 🌟',
      description: 'You have a solid base, but there are areas to strengthen before CELTA.',
      color: 'text-[#c9a84c]',
      cta: 'The Full Prep Program will fill your knowledge gaps'
    }
  } else if (percentage >= 40) {
    result = {
      title: 'Growing Potential! 📚',
      description: 'You\'re on the right path, but focused preparation would significantly help.',
      color: 'text-[#b85c38]',
      cta: 'We recommend the Full Prep Program to build your confidence'
    }
  } else {
    result = {
      title: 'Starting Your Journey! 🚀',
      description: 'CELTA is achievable for you with the right preparation and support.',
      color: 'text-[#b85c38]',
      cta: 'The Full Prep Program is perfect for your starting point'
    }
  }

  return (
    <div className="text-center space-y-5">
      {/* Result Header */}
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38]">
        <TrendingUp className="w-8 h-8 text-white" />
      </div>
      <h3 className={`font-display text-xl font-bold ${result.color}`}>{result.title}</h3>
      <p className="font-body text-sm text-[#6b6560]">{result.description}</p>
      
      {/* Score Display */}
      <div className="bg-[#e8e0d0] rounded-xl p-3">
        <p className="font-body text-xs text-[#0e0c0a] mb-1">Your CELTA Readiness Score</p>
        <p className="font-display text-3xl font-bold text-[#c9a84c]">{score}/{total}</p>
        <p className="font-body text-xs text-[#6b6560]">{Math.round(percentage)}% ready</p>
      </div>
      
      <p className="font-body text-sm text-[#0e0c0a] font-semibold">{result.cta}</p>
      
      {/* Free Booklets Section */}
      <div className="pt-3 border-t border-[#d4cdc0]">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-[#c9a84c]" />
          <p className="font-body text-sm font-semibold text-[#0e0c0a]">Get Your Free CELTA Prep Guides</p>
        </div>
        <div className="bg-[#f5f0e8] rounded-lg p-3 mb-3">
          <div className="flex flex-wrap justify-center gap-1.5">
            <Badge className="bg-[#c9a84c] text-[#0e0c0a] text-xs">See Your Learner</Badge>
            <Badge className="bg-[#c9a84c] text-[#0e0c0a] text-xs">Think Like a CELTA Trainer</Badge>
            <Badge className="bg-[#c9a84c] text-[#0e0c0a] text-xs">The CELTA MINDSET</Badge>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="font-body border-[#d4cdc0] focus:border-[#c9a84c] text-sm"
          />
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold whitespace-nowrap"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Get Guide'
            )}
          </Button>
        </div>
      </div>
      
      <Button
        asChild
        className="w-full bg-[#0e0c0a] text-[#f5f0e8] hover:bg-[#2a2725] font-body font-semibold py-5"
      >
        <a href={getWhatsAppLink(`Hi Rachid, I scored ${score}/${total} on the CELTA Readiness Quiz and I'd like to discuss my preparation options.`)} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="w-4 h-4 mr-2" />
          Discuss Your Results with Rachid
        </a>
      </Button>
    </div>
  )
}

export function QuizSection() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [booklets, setBooklets] = useState<Booklet[]>([])

  const handleAnswer = (answerScore: number, _answerText: string) => {
    const newScore = score + answerScore
    setScore(newScore)

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleSubmitResults = async () => {
    if (!email) return
    
    setIsLoading(true)
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: '' })
      })

      const data = await response.json()

      if (response.ok) {
        setBooklets(data.booklets)
        setSubmitted(true)
      } else {
        // Still show success even on error for UX
        setSubmitted(true)
      }
    } catch {
      setSubmitted(true)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async (bookletId: string) => {
    if (!email) return
    
    const booklet = booklets.find(b => b.id === bookletId)
    if (!booklet) return

    // Track download
    try {
      await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookletId, email })
      })
    } catch {
      // Continue with download even if tracking fails
    }

    // Create download link
    const link = document.createElement('a')
    link.href = `/downloads/${bookletId}.pdf`
    link.download = `${booklet.title}.pdf`
    link.click()
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setEmail('')
    setSubmitted(false)
    setBooklets([])
    setIsLoading(false)
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0e0c0a] to-[#1a1816]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-[#c9a84c] text-[#0e0c0a] font-body">
                <Zap className="w-3 h-3 mr-1" />
                Free Assessment
              </Badge>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f0e8] mb-4">
                Are You CELTA Ready?
              </h2>
              <p className="font-body text-lg text-[#a09890] max-w-2xl mx-auto mb-8">
                Take our 2-minute quiz to discover your CELTA readiness score and get personalized recommendations.
              </p>
              
              <Button
                onClick={() => setIsOpen(true)}
                size="lg"
                className="font-body font-semibold text-lg px-10 py-7 bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b]"
              >
                <Target className="w-5 h-5 mr-2" />
                Take the Free Quiz
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              
              <div className="flex justify-center gap-6 mt-6 text-sm font-body text-[#a09890]">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  2 minutes
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Join 47+ teachers
                </span>
                <span className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  No email required
                </span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg bg-white border-[#d4cdc0]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-[#0e0c0a]">CELTA Readiness Quiz</DialogTitle>
            <DialogDescription className="font-body text-[#6b6560]">
              Answer 7 quick questions to discover your readiness level.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            {!showResults ? (
              <QuizQuestion
                question={quizQuestions[currentQuestion].question}
                options={quizQuestions[currentQuestion].options}
                onAnswer={handleAnswer}
                questionNumber={currentQuestion + 1}
                totalQuestions={quizQuestions.length}
              />
            ) : !submitted ? (
              <QuizCompletionForm
                score={score}
                total={quizQuestions.length * 4}
                email={email}
                setEmail={setEmail}
                onSubmit={handleSubmitResults}
                isLoading={isLoading}
              />
            ) : (
              <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-display text-xl font-bold text-[#0e0c0a]">You&apos;re In! 🎉</h3>
                <p className="font-body text-[#6b6560]">Your free CELTA Prep Guides are ready for download:</p>
                
                <div className="space-y-3 text-left">
                  {booklets.map((booklet) => (
                    <div key={booklet.id} className="flex items-center gap-3 p-3 bg-[#f5f0e8] rounded-lg">
                      <FileText className="w-6 h-6 text-[#c9a84c] flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-body text-sm font-semibold text-[#0e0c0a]">{booklet.title}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleDownload(booklet.id)}
                        className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
                
                <Button
                  asChild
                  className="w-full bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold mt-4"
                >
                  <a href={getWhatsAppLink("Hi Rachid, I just completed the CELTA Readiness Quiz and got my free guides. Can we discuss my preparation options?")} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 w-4 mr-2" />
                    Discuss with Rachid on WhatsApp
                  </a>
                </Button>
                <Button
                  variant="outline"
                  onClick={resetQuiz}
                  className="w-full font-body"
                >
                  Take Quiz Again
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
