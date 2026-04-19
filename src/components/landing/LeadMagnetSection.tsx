'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { 
  Sparkles, 
  FileText, 
  BookOpen, 
  Target, 
  Mail, 
  Loader2, 
  Download, 
  CheckCircle2,
  Lock
} from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import type { Booklet } from './types'

const bookletPreviews = [
  { icon: FileText,  title: 'See Your Learner',            desc: 'Assignment 1 guide' },
  { icon: BookOpen,  title: 'Think Like a CELTA Trainer',  desc: 'Insider perspective' },
  { icon: Target,    title: 'The CELTA Mindset',           desc: 'Mental resilience' }
]

function BookletCard({
  booklet,
  onDownload,
  isDownloading,
}: {
  booklet: Booklet
  onDownload: (bookletId: string) => void
  isDownloading: boolean
}) {
  return (
    <Card className="premium-card bg-white border-[#d4cdc0] shadow-md hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-5">
        <div className="flex items-center gap-4">
          <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center flex-shrink-0 shadow-md">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-base font-bold text-[#0e0c0a] mb-0.5 group-hover:text-[#b85c38] transition-colors leading-tight">
              {booklet.title}
            </h3>
            <p className="font-body text-xs text-[#6b6560] mb-3 leading-snug">
              {booklet.description}
            </p>
            <Button
              onClick={() => onDownload(booklet.id)}
              disabled={isDownloading}
              size="sm"
              className="btn-shine bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#d4b96a] hover:to-[#c9a84c] font-body font-semibold shadow-sm"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5 mr-1.5" />
              )}
              {isDownloading ? 'Preparing...' : 'Download PDF'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function LeadMagnetSection() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isDownloading, setIsDownloading] = useState<string | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [booklets, setBooklets] = useState<Booklet[]>([])
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [downloadError, setDownloadError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      })

      const data = await response.json()

      if (response.ok) {
        setBooklets(data.booklets)
        setIsSubscribed(true)
        setMessage({ type: 'success', text: data.message })
      } else {
        setMessage({ type: 'error', text: data.error || 'Something went wrong. Please try again.' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Connection error. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async (bookletId: string) => {
    setIsDownloading(bookletId)
    setDownloadError(null)

    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, bookletId })
      })

      const data = await response.json()

      if (response.ok && data.downloadUrl) {
        // Open in new tab — works reliably across all browsers and mobile
        window.open(data.downloadUrl, '_blank')
      } else {
        setDownloadError(data.error || 'Download failed. Please try again.')
      }
    } catch {
      setDownloadError('Connection error. Please try again.')
    } finally {
      setIsDownloading(null)
    }
  }

  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #e8e0d0 0%, #f5f0e8 50%, #e8e0d0 100%)' }}>
      <div className="absolute inset-0 dot-pattern opacity-25" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c9a84c]/6 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/15 border border-[#c9a84c]/40 px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#c9a84c]" />
              <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-semibold">Free Resources</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-5">
              Get 3 Free CELTA{' '}
              <span className="text-[#c9a84c]">Prep Booklets</span>
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-2xl mx-auto">
              Enter your email and get instant access — exclusively designed for Moroccan teachers preparing for CELTA.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          {!isSubscribed ? (
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-[#d4cdc0] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a84c] via-[#d4b96a] to-[#c9a84c]" />

              {/* Booklet previews */}
              <div className="grid md:grid-cols-3 gap-3 mb-8">
                {bookletPreviews.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 rounded-2xl bg-[#f5f0e8] border border-[#e8e0d0]">
                    <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/15 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-[#c9a84c]" />
                    </div>
                    <div>
                      <p className="font-body font-semibold text-[#0e0c0a] text-sm leading-tight">{item.title}</p>
                      <p className="font-body text-xs text-[#6b6560]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-semibold text-[#0e0c0a] mb-1.5 block">Your Name</label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="font-body border-[#d4cdc0] focus:border-[#c9a84c] rounded-xl h-11"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-semibold text-[#0e0c0a] mb-1.5 block">
                      Email Address <span className="text-[#b85c38]">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="font-body border-[#d4cdc0] focus:border-[#c9a84c] rounded-xl h-11"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="btn-shine w-full font-body font-bold text-base py-6 bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#d4b96a] hover:to-[#c9a84c] shadow-lg shadow-[#c9a84c]/25 transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Mail className="w-5 h-5 mr-2" />
                  )}
                  {isLoading ? 'Unlocking your booklets...' : 'Get My Free Booklets →'}
                </Button>

                {message && (
                  <p className={`font-body text-sm text-center font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {message.text}
                  </p>
                )}

                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <Lock className="w-3 h-3 text-[#a09890]" />
                  <p className="font-body text-xs text-center text-[#a09890]">
                    No spam. Unsubscribe anytime. Your email is safe.
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Success banner */}
              <div className="bg-gradient-to-r from-[#c9a84c]/20 to-[#b85c38]/10 rounded-2xl p-5 border border-[#c9a84c]/40 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-[#c9a84c]/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-[#c9a84c]" />
                </div>
                <div>
                  <p className="font-body font-bold text-[#0e0c0a]">{message?.text}</p>
                  <p className="font-body text-sm text-[#6b6560]">Click any booklet below to open your PDF.</p>
                </div>
              </div>

              {downloadError && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                  <p className="font-body text-sm text-red-600">{downloadError}</p>
                </div>
              )}

              {/* Booklet cards */}
              <div className="grid gap-3">
                {booklets.map((booklet) => (
                  <BookletCard
                    key={booklet.id}
                    booklet={booklet}
                    onDownload={handleDownload}
                    isDownloading={isDownloading === booklet.id}
                  />
                ))}
              </div>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  )
}
