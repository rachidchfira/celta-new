'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, MessageCircle } from 'lucide-react'
import { getWhatsAppLink } from './constants'

const navLinks = [
  { label: 'Curriculum', href: '#curriculum' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' }
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-md' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img 
                src="/logo.svg?v=2" 
                alt="CELTA Prep Morocco" 
                className="h-10 w-auto"
              />
              <span className="font-display font-bold text-[#0e0c0a] text-sm hidden sm:block">
                CELTA Prep Morocco
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-[#6b6560] hover:text-[#0e0c0a] transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Button
                asChild
                size="sm"
                className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body"
              >
                <a href={getWhatsAppLink("Hi Rachid, I want to learn more about CELTA Prep Morocco")} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center hover:bg-[#e8e0d0] transition-colors"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="w-6 h-6 text-[#0e0c0a]" />
              ) : (
                <Menu className="w-6 h-6 text-[#0e0c0a]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`fixed top-16 right-0 bottom-0 w-72 max-w-[80vw] z-40 bg-white shadow-2xl transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="p-6 space-y-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block font-body text-lg text-[#0e0c0a] hover:text-[#c9a84c] transition-colors py-2 border-b border-[#e8e0d0]"
            >
              {link.label}
            </a>
          ))}
          
          <div className="pt-4 space-y-3">
            <Button
              asChild
              className="w-full bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body"
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
              className="w-full border-[#0e0c0a] text-[#0e0c0a] hover:bg-[#0e0c0a] hover:text-white font-body"
            >
              <a href="/course" onClick={() => setIsOpen(false)}>
                Preview Course
              </a>
            </Button>
          </div>
        </nav>
      </div>
    </>
  )
}
