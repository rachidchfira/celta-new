'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  CheckCircle2 
} from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { bookletPreviews } from './constants'
import type { Booklet } from './types'

// Booklet Card Component
function BookletCard({
  booklet,
  onDownload,
  isDownloading,
  email
}: {
  booklet: Booklet
  onDownload: (bookletId: string) => void
  isDownloading: boolean
  email: string
}) {
  return (
    <Card className="bg-white border-[#d4cdc0] shadow-lg hover:shadow-xl transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-20 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center flex-shrink-0">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-display text-lg font-semibold text-[#0e0c0a] mb-2 group-hover:text-[#b85c38] transition-colors">
              {booklet.title}
            </h3>
            <p className="font-body text-sm text-[#6b6560] mb-4">
              {booklet.description}
            </p>
            <Button
              onClick={() => onDownload(booklet.id)}
              disabled={isDownloading}
              className="w-full bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold"
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Download Free
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
        setMessage({ type: 'error', text: data.error || 'Something went wrong' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to subscribe. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = async (bookletId: string) => {
    setIsDownloading(bookletId)
    
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, bookletId })
      })

      const data = await response.json()

      if (response.ok && data.downloadUrl) {
        const link = document.createElement('a')
        link.href = data.downloadUrl
        link.download = ''
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(null)
    }
  }

  const iconMap: Record<string, React.ElementType> = {
    FileText: FileText,
    BookOpen: BookOpen,
    Target: Target
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-[#e8e0d0] to-[#f5f0e8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-[#c9a84c] text-[#0e0c0a] font-body">
              <Sparkles className="w-3 h-3 mr-1" />
              Free Resources
            </Badge>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-6">
              Get Free CELTA Preparation Materials
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-2xl mx-auto">
              Enter your email below and get instant access to our exclusive preparation booklets — 
              designed specifically for Moroccan teachers preparing for CELTA.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          {!isSubscribed ? (
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-[#d4cdc0]">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                {bookletPreviews.map((item, index) => {
                  const Icon = iconMap[item.icon]
                  return (
                    <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-[#f5f0e8]">
                      <Icon className="w-8 h-8 text-[#c9a84c]" />
                      <div>
                        <p className="font-body font-semibold text-[#0e0c0a] text-sm">{item.title}</p>
                        <p className="font-body text-xs text-[#6b6560]">{item.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-medium text-[#0e0c0a] mb-1 block">
                      Your Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="font-body border-[#d4cdc0] focus:border-[#c9a84c] focus:ring-[#c9a84c]"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-[#0e0c0a] mb-1 block">
                      Email Address <span className="text-[#b85c38]">*</span>
                    </label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="font-body border-[#d4cdc0] focus:border-[#c9a84c] focus:ring-[#c9a84c]"
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full font-body font-semibold text-lg py-6 bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b]"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <Mail className="w-5 h-5 mr-2" />
                  )}
                  Get Free Booklets
                </Button>
                
                {message && (
                  <p className={`font-body text-sm text-center ${
                    message.type === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {message.text}
                  </p>
                )}
                
                <p className="font-body text-xs text-center text-[#6b6560]">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-[#c9a84c]/20 rounded-xl p-4 border border-[#c9a84c] text-center">
                <CheckCircle2 className="w-8 h-8 text-[#c9a84c] mx-auto mb-2" />
                <p className="font-body text-[#0e0c0a] font-semibold">{message?.text}</p>
              </div>
              
              <div className="grid md:grid-cols-1 gap-4">
                {booklets.map((booklet) => (
                  <BookletCard
                    key={booklet.id}
                    booklet={booklet}
                    onDownload={handleDownload}
                    isDownloading={isDownloading === booklet.id}
                    email={email}
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
