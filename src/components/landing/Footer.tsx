'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { getWhatsAppLink } from './constants'
import { MessageCircle, BookOpen, Globe, Mail } from 'lucide-react'

function TermsContent() {
  return (
    <div className="font-body text-sm text-[#6b6560] space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <p><strong className="text-[#0e0c0a]">1. Acceptance of Terms</strong><br />By accessing and using CELTA Prep Morocco services, you accept and agree to be bound by the terms of this agreement.</p>
      <p><strong className="text-[#0e0c0a]">2. Program Enrollment</strong><br />Enrollment is confirmed upon receipt of payment. All fees are non-refundable except as outlined in our guarantee policy.</p>
      <p><strong className="text-[#0e0c0a]">3. Program Content</strong><br />All materials, videos, and resources are for personal use only. Sharing, distributing, or reproducing content without permission is prohibited.</p>
      <p><strong className="text-[#0e0c0a]">4. Guarantee Policy</strong><br />Our CELTA Confidence Guarantee requires completion of all 4 weeks and the mock simulation day. Continued support is provided based on demonstrated participation.</p>
      <p><strong className="text-[#0e0c0a]">5. Intellectual Property</strong><br />All content, trademarks, and materials are the property of CELTA Prep Morocco and are protected by copyright laws.</p>
      <p><strong className="text-[#0e0c0a]">6. Limitation of Liability</strong><br />CELTA Prep Morocco provides preparation services only. We do not guarantee CELTA certification or employment outcomes.</p>
      <p><strong className="text-[#0e0c0a]">7. Contact</strong><br />For questions about these terms, contact us via WhatsApp.</p>
    </div>
  )
}

function PrivacyContent() {
  return (
    <div className="font-body text-sm text-[#6b6560] space-y-4 max-h-[60vh] overflow-y-auto pr-2">
      <p><strong className="text-[#0e0c0a]">1. Information We Collect</strong><br />We collect information you provide directly, including name, email address, and payment information when you enroll.</p>
      <p><strong className="text-[#0e0c0a]">2. How We Use Your Information</strong><br />We use your information to provide and improve our services, communicate about your enrollment, and send relevant CELTA prep updates.</p>
      <p><strong className="text-[#0e0c0a]">3. Data Security</strong><br />We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
      <p><strong className="text-[#0e0c0a]">4. Third-Party Services</strong><br />We may use third-party services (payment processors, email services) that have their own privacy policies.</p>
      <p><strong className="text-[#0e0c0a]">5. Your Rights</strong><br />You may request access to, correction of, or deletion of your personal data at any time by contacting us.</p>
      <p><strong className="text-[#0e0c0a]">6. Contact</strong><br />For privacy-related questions, contact us via WhatsApp.</p>
    </div>
  )
}

const footerLinks = [
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#faq', label: 'FAQ' },
]

export function Footer() {
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <>
      <footer className="bg-[#0e0c0a] border-t border-[#1a1816] relative overflow-hidden">
        {/* Top gold line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Main footer content */}
          <div className="py-12 grid md:grid-cols-3 gap-10 border-b border-[#1a1816]">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center shadow-md">
                  <BookOpen className="w-4 h-4 text-white" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-display font-bold text-[#f5f0e8] text-sm">CELTA Prep Morocco</p>
                  <p className="font-body text-[#c9a84c] text-[10px] uppercase tracking-widest font-semibold">By Rachid Chfirra</p>
                </div>
              </div>
              <p className="font-body text-sm text-[#6b6560] leading-relaxed mb-4">
                The only CELTA preparation program designed specifically for Moroccan teachers. 94% first-attempt pass rate.
              </p>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#6b6560]" />
                <span className="font-body text-xs text-[#6b6560]">Serving teachers across Morocco & MENA</span>
              </div>
            </div>

            {/* Nav links */}
            <div>
              <p className="font-body text-xs text-[#6b6560] uppercase tracking-widest font-semibold mb-4">Navigation</p>
              <ul className="space-y-2.5">
                {footerLinks.map(link => (
                  <li key={link.href}>
                    <a href={link.href} className="font-body text-sm text-[#a09890] hover:text-[#c9a84c] transition-colors duration-200">
                      {link.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button onClick={() => setShowTerms(true)} className="font-body text-sm text-[#a09890] hover:text-[#c9a84c] transition-colors duration-200">Terms</button>
                </li>
                <li>
                  <button onClick={() => setShowPrivacy(true)} className="font-body text-sm text-[#a09890] hover:text-[#c9a84c] transition-colors duration-200">Privacy</button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <p className="font-body text-xs text-[#6b6560] uppercase tracking-widest font-semibold mb-4">Get in Touch</p>
              <a
                href={getWhatsAppLink("Hi Rachid, I want to learn more about CELTA Prep Morocco")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-shine inline-flex items-center gap-2 bg-[#25D366] text-white font-body font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-[#1ebe5d] transition-all duration-200 shadow-md mb-4"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Rachid
              </a>
              <p className="font-body text-xs text-[#6b6560] leading-relaxed">
                Response within 24 hours. Questions about enrollment, payment plans, or the program — all welcome.
              </p>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs text-[#6b6560]">
              © {new Date().getFullYear()} Rachid Chfirra · CELTA Prep Morocco. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              <span className="font-body text-xs text-[#6b6560]">Currently accepting students</span>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-2xl bg-white border-[#d4cdc0]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-[#0e0c0a]">Terms of Service</DialogTitle>
            <DialogDescription className="font-body text-[#6b6560]">Please read these terms carefully before using our services.</DialogDescription>
          </DialogHeader>
          <TermsContent />
          <Button onClick={() => setShowTerms(false)} className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold">I Understand</Button>
        </DialogContent>
      </Dialog>

      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-w-2xl bg-white border-[#d4cdc0]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-[#0e0c0a]">Privacy Policy</DialogTitle>
            <DialogDescription className="font-body text-[#6b6560]">How we collect, use, and protect your information.</DialogDescription>
          </DialogHeader>
          <PrivacyContent />
          <Button onClick={() => setShowPrivacy(false)} className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold">I Understand</Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
