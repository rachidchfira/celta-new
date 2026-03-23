'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, MessageCircle, BookOpen } from 'lucide-react'
import { getWhatsAppLink } from './constants'

const navLinks = [
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' }
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setIsScrolled(scrollY > 60)
      setScrollProgress(docHeight > 0 ? (scrollY / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-[#d4cdc0]/50'
            : 'bg-transparent'
        }`}
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#c9a84c] to-[#b85c38] transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center shadow-md group-hover:shadow-[#c9a84c]/40 transition-shadow duration-300">
                <BookOpen className="w-4 h-4 text-white" strokeWidth={2} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-[#0e0c0a] text-sm tracking-wide">CELTA Prep</span>
                <span className="font-body text-[#c9a84c] text-[10px] font-semibold uppercase tracking-widest">Morocco</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-[#6b6560] hover:text-[#0e0c0a] transition-colors hover-underline"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                size="sm"
                className="btn-shine bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#b8973b] hover:to-[#a8872b] font-body font-semibold shadow-md hover:shadow-lg hover:shadow-[#c9a84c]/30 transition-all duration-300"
              >
                <a href={getWhatsAppLink("Hi Rachid, I want to learn more about CELTA Prep Morocco")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-3.5 h-3.5 mr-1.5" />
                  WhatsApp
                </a>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                isOpen
                  ? 'bg-[#0e0c0a] text-white'
                  : 'hover:bg-[#e8e0d0] text-[#0e0c0a]'
              }`}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <div className="relative w-5 h-5">
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}>
                  <X className="w-5 h-5" />
                </span>
                <span className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${isOpen ? 'opacity-0 -rotate-90' : 'opacity-100 rotate-0'}`}>
                  <Menu className="w-5 h-5" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] z-50 md:hidden transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full bg-white shadow-2xl flex flex-col">
          {/* Panel header */}
          <div className="flex items-center justify-between px-6 h-16 border-b border-[#e8e0d0]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center">
                <BookOpen className="w-3 h-3 text-white" strokeWidth={2} />
              </div>
              <span className="font-display font-bold text-[#0e0c0a] text-sm">CELTA Prep Morocco</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#e8e0d0] transition-colors"
            >
              <X className="w-4 h-4 text-[#6b6560]" />
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between font-body text-base text-[#0e0c0a] hover:text-[#c9a84c] hover:bg-[#f5f0e8] transition-all duration-200 px-4 py-3.5 rounded-xl group"
              >
                {link.label}
                <span className="text-[#d4cdc0] group-hover:text-[#c9a84c] transition-colors">→</span>
              </a>
            ))}
          </nav>

          {/* CTA buttons */}
          <div className="px-4 pb-8 pt-4 border-t border-[#e8e0d0] space-y-3">
            <Button
              asChild
              className="w-full btn-shine bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] font-body font-semibold py-6"
            >
              <a
                href={getWhatsAppLink("Hi Rachid, I want to learn more about CELTA Prep Morocco")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Contact via WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-2 border-[#0e0c0a] text-[#0e0c0a] hover:bg-[#0e0c0a] hover:text-white font-body font-semibold py-6 transition-all duration-200"
            >
              <a href="/course" onClick={() => setIsOpen(false)}>
                Preview Course
              </a>
            </Button>
            <p className="text-center font-body text-xs text-[#a09890] pt-1">
              Starting at $79 USD · Payment plans available
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
