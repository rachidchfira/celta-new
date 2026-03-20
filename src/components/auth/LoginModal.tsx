'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Mail,
  LogIn,
  Loader2,
  MessageCircle
} from 'lucide-react'

// WhatsApp number
const WHATSAPP_NUMBER = '84703027485'
const getWhatsAppLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

interface LoginModalProps {
  onLogin: (email: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function LoginModal({ onLogin, isLoading, error }: LoginModalProps) {
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onLogin(email)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0e0c0a] to-[#1a1816] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white border-[#d4cdc0]">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="font-display text-2xl text-[#0e0c0a]">Access Your Course</CardTitle>
          <CardDescription className="font-body text-[#6b6560]">
            Enter your email to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="font-body text-sm font-medium text-[#0e0c0a] flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="font-body border-[#d4cdc0] focus:border-[#c9a84c]"
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="font-body text-sm text-red-600">{error}</p>
              </div>
            )}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Accessing...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
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
