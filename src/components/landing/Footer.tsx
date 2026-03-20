'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { getWhatsAppLink } from './constants'

// Terms Content Component
function TermsContent() {
  return (
    <div className="font-body text-sm text-[#6b6560] space-y-4 max-h-[60vh] overflow-y-auto">
      <h4 className="font-display text-lg font-bold text-[#0e0c0a]">Terms of Service</h4>
      
      <p><strong>1. Acceptance of Terms</strong></p>
      <p>By accessing and using CELTA Prep Morocco services, you accept and agree to be bound by the terms and provision of this agreement.</p>
      
      <p><strong>2. Program Enrollment</strong></p>
      <p>Enrollment in our programs is confirmed upon receipt of payment. All fees are non-refundable except as outlined in our guarantee policy.</p>
      
      <p><strong>3. Program Content</strong></p>
      <p>All materials, videos, and resources provided are for personal use only. Sharing, distributing, or reproducing content without permission is prohibited.</p>
      
      <p><strong>4. Guarantee Policy</strong></p>
      <p>Our CELTA Confidence Guarantee requires completion of all 4 weeks and the mock simulation day. Continued support is provided at our discretion based on demonstrated effort and participation.</p>
      
      <p><strong>5. Intellectual Property</strong></p>
      <p>All content, trademarks, and materials are the property of CELTA Prep Morocco and are protected by copyright laws.</p>
      
      <p><strong>6. Limitation of Liability</strong></p>
      <p>CELTA Prep Morocco provides preparation services only. We do not guarantee CELTA certification or employment outcomes.</p>
      
      <p><strong>7. Contact</strong></p>
      <p>For questions about these terms, contact us via WhatsApp.</p>
    </div>
  )
}

// Privacy Content Component
function PrivacyContent() {
  return (
    <div className="font-body text-sm text-[#6b6560] space-y-4 max-h-[60vh] overflow-y-auto">
      <h4 className="font-display text-lg font-bold text-[#0e0c0a]">Privacy Policy</h4>
      
      <p><strong>1. Information We Collect</strong></p>
      <p>We collect information you provide directly, including name, email address, and payment information when you enroll in our programs.</p>
      
      <p><strong>2. How We Use Your Information</strong></p>
      <p>We use your information to provide and improve our services, communicate with you about your enrollment, and send relevant updates about CELTA preparation.</p>
      
      <p><strong>3. Data Security</strong></p>
      <p>We implement appropriate security measures to protect your personal information from unauthorized access or disclosure.</p>
      
      <p><strong>4. Third-Party Services</strong></p>
      <p>We may use third-party services (e.g., payment processors, email services) that have their own privacy policies.</p>
      
      <p><strong>5. Cookies</strong></p>
      <p>We use cookies to improve your experience on our website and analyze site traffic.</p>
      
      <p><strong>6. Your Rights</strong></p>
      <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us.</p>
      
      <p><strong>7. Changes to This Policy</strong></p>
      <p>We may update this policy periodically. Continued use of our services constitutes acceptance of any changes.</p>
      
      <p><strong>8. Contact</strong></p>
      <p>For privacy-related questions, contact us via WhatsApp.</p>
    </div>
  )
}

export function Footer() {
  const [showTerms, setShowTerms] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)

  return (
    <>
      <footer className="py-8 bg-[#0e0c0a] border-t border-[#2a2725]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <a href="/" className="flex items-center gap-3">
              <img 
                src="/logo.svg?v=2" 
                alt="CELTA Prep Morocco" 
                className="h-10 w-auto"
              />
              <span className="font-display text-lg text-[#f5f0e8]">CELTA Prep Morocco</span>
            </a>
            
            <p className="font-body text-sm text-[#6b6560]">
              © {new Date().getFullYear()} Rachid Chfirra. All rights reserved.
            </p>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowTerms(true)}
                className="font-body text-sm text-[#a09890] hover:text-[#c9a84c] transition-colors"
              >
                Terms
              </button>
              <button 
                onClick={() => setShowPrivacy(true)}
                className="font-body text-sm text-[#a09890] hover:text-[#c9a84c] transition-colors"
              >
                Privacy
              </button>
              <a 
                href={getWhatsAppLink("Hi Rachid, I have a question about CELTA Prep Morocco")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-[#a09890] hover:text-[#c9a84c] transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Terms Dialog */}
      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-2xl bg-white border-[#d4cdc0]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-[#0e0c0a]">Terms of Service</DialogTitle>
            <DialogDescription className="font-body text-[#6b6560]">
              Please read these terms carefully before using our services.
            </DialogDescription>
          </DialogHeader>
          <TermsContent />
          <Button
            onClick={() => setShowTerms(false)}
            className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold"
          >
            I Understand
          </Button>
        </DialogContent>
      </Dialog>

      {/* Privacy Dialog */}
      <Dialog open={showPrivacy} onOpenChange={setShowPrivacy}>
        <DialogContent className="max-w-2xl bg-white border-[#d4cdc0]">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl text-[#0e0c0a]">Privacy Policy</DialogTitle>
            <DialogDescription className="font-body text-[#6b6560]">
              How we collect, use, and protect your information.
            </DialogDescription>
          </DialogHeader>
          <PrivacyContent />
          <Button
            onClick={() => setShowPrivacy(false)}
            className="bg-[#c9a84c] text-[#0e0c0a] hover:bg-[#b8973b] font-body font-semibold"
          >
            I Understand
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
