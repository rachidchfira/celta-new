'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  CheckCircle2, ArrowRight, MessageCircle, Star, Shield,
  FileText, BookOpen, Award, ChevronDown, ChevronUp,
  AlertTriangle, Zap, Lock, Clock
} from 'lucide-react'
import { getWhatsAppLink } from '@/components/landing/constants'

// ── DATA ────────────────────────────────────────────────────────────────────

const assignments = [
  {
    number: '01',
    title: 'Focus on the Learner',
    subtitle: 'Assignment 1',
    pages: '12 pages',
    description: 'A complete model assignment analysing a real learner profile — language background, key errors, learning priorities. Includes trainer annotations showing exactly which phrases earned marks and which would have caused a resubmission.',
    annotations: 14,
    verdict: 'Pass A standard',
    color: '#c9a84c',
    highlights: [
      'Learner error analysis with linguistic justification',
      'Needs prioritisation using CELTA criteria language',
      'Annotated trainer comments on every key paragraph',
      'Common mistake: what 80% of candidates write instead'
    ]
  },
  {
    number: '02',
    title: 'Lessons from the Classroom',
    subtitle: 'Assignment 2',
    pages: '9 pages',
    description: 'Model reflective commentary on a teaching practice lesson. The hardest assignment to write because it requires you to be critical of yourself in a way that actually demonstrates competence. Fully annotated to show the balance.',
    annotations: 11,
    verdict: 'Pass B standard',
    color: '#b85c38',
    highlights: [
      'The exact reflection framework CELTA trainers want to see',
      'How to critique your lesson without destroying your grade',
      'Language of professional reflection — specific phrases',
      'Before/after: weak draft vs passing version side by side'
    ]
  },
  {
    number: '03',
    title: 'Language-Related Tasks',
    subtitle: 'Assignment 3',
    pages: '15 pages',
    description: 'Complete grammar analysis assignment covering form, meaning, use and pronunciation (FMUP) for three language items. The most technical assignment — most candidates fail here because they confuse description with analysis.',
    annotations: 18,
    verdict: 'Pass A standard',
    color: '#c9a84c',
    highlights: [
      'Full FMUP analysis for 3 language items, annotated line by line',
      'CCQs that actually work — with trainer explanation of why',
      'Anticipated learner errors with linguistic reasoning',
      'The difference between description and analysis — shown, not told'
    ]
  },
  {
    number: '04',
    title: 'Classroom Skills Development',
    subtitle: 'Assignment 4',
    pages: '10 pages',
    description: 'Reflective account of skill development across the course. Most candidates write vague generalities. This model shows how to use specific lesson moments as evidence — the technique that separates a pass from a resubmission.',
    annotations: 9,
    verdict: 'Pass B standard',
    color: '#b85c38',
    highlights: [
      'Evidence-based reflection using real lesson moments',
      'How to write about improvement without sounding weak',
      'Specific skill descriptors linked to CELTA criteria',
      'The opening paragraph formula trainers reward every time'
    ]
  }
]

const valueStack = [
  { item: '4 complete model CELTA assignments', value: '$120' },
  { item: '52 trainer annotations explaining every mark', value: '$80' },
  { item: '"Before vs after" drafts showing common mistakes', value: '$60' },
  { item: 'CELTA academic language phrase bank', value: '$40' },
  { item: 'Resubmission risk checklist for each assignment', value: '$30' },
]

const faqs = [
  {
    q: 'Are these real CELTA assignments that actually passed?',
    a: 'Yes. These are model assignments written to CELTA standard, structured exactly as Cambridge assessors expect. They are not copied from real candidates — they are purpose-built teaching examples with annotation layers added by a CELTA-certified trainer.'
  },
  {
    q: 'Will using these get me in trouble for academic dishonesty?',
    a: 'No. These are model examples for study purposes — exactly like model essays in any writing course. You are not submitting these. You are reading them to understand what a passing assignment looks like before writing your own. This is standard exam preparation practice.'
  },
  {
    q: 'I already registered for CELTA and it starts in 3 weeks. Is it too late?',
    a: 'This bundle is most valuable in the 2–4 weeks before your CELTA starts. Reading the models now means you walk in knowing what the assignments should look like — not discovering it under pressure on week 2.'
  },
  {
    q: 'How is this different from free examples I can find online?',
    a: 'Most free examples online have no annotations — you see the output but not the thinking. This bundle shows you WHY each section works, what the trainer was rewarding, and what a weak version of the same paragraph looks like. That\'s the difference between copying and learning.'
  },
  {
    q: 'How do I receive the bundle after paying?',
    a: 'Send your payment via WhatsApp to Rachid. You\'ll receive the PDF bundle directly in the same chat within 2 hours — usually much faster. No account creation, no waiting.'
  },
]

// ── COMPONENTS ──────────────────────────────────────────────────────────────

function AssignmentCard({ a, index }: { a: typeof assignments[0]; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-2xl border-2 border-[#d4cdc0] overflow-hidden transition-all duration-300 hover:border-[#c9a84c]/50 hover:shadow-lg">
      {/* Header bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${a.color}80, ${a.color}, ${a.color}80)` }} />
      <div className="p-6">
        <div className="flex items-start gap-4">
          {/* Number badge */}
          <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-lg text-[#0e0c0a] shadow-md"
            style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}cc)` }}>
            {a.number}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="font-body text-xs text-[#6b6560] uppercase tracking-widest font-semibold">{a.subtitle}</span>
              <span className="font-body text-xs bg-[#f5f0e8] border border-[#d4cdc0] px-2 py-0.5 rounded-full text-[#6b6560]">{a.pages}</span>
              <span className="font-body text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${a.color}15`, color: a.color }}>{a.verdict}</span>
            </div>
            <h3 className="font-display text-xl font-bold text-[#0e0c0a] mb-2">{a.title}</h3>
            <p className="font-body text-sm text-[#6b6560] leading-relaxed mb-3">{a.description}</p>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center gap-1.5 bg-[#f5f0e8] px-3 py-1 rounded-full">
                <FileText className="w-3.5 h-3.5 text-[#c9a84c]" />
                <span className="font-body text-xs font-semibold text-[#0e0c0a]">{a.annotations} trainer annotations</span>
              </div>
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1.5 font-body text-sm font-semibold text-[#b85c38] hover:text-[#c9a84c] transition-colors duration-200"
            >
              {open ? 'Hide details' : "What's inside"}
              {open ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Expandable details */}
        {open && (
          <div className="mt-4 pt-4 border-t border-[#e8e0d0]">
            <ul className="space-y-2">
              {a.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: a.color }} />
                  <span className="font-body text-sm text-[#4a4540]">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

function FAQItem({ faq }: { faq: typeof faqs[0] }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-[#1a1816] rounded-2xl border border-[#2a2725] overflow-hidden transition-all duration-300 hover:border-[#c9a84c]/30">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-5 flex items-center justify-between gap-4"
      >
        <span className="font-body text-base font-semibold text-[#f5f0e8] leading-snug">{faq.q}</span>
        {open
          ? <ChevronUp className="w-5 h-5 text-[#c9a84c] flex-shrink-0" />
          : <ChevronDown className="w-5 h-5 text-[#6b6560] flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="px-6 pb-5">
          <p className="font-body text-sm text-[#a09890] leading-relaxed">{faq.a}</p>
        </div>
      )}
    </div>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function BundlePage() {
  const buyLink = getWhatsAppLink(
    "Hi Rachid, I want to buy the CELTA Assignment Bundle ($39). How do I pay?"
  )

  return (
    <div className="min-h-screen bg-[#f5f0e8]">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#d4cdc0]/50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center">
              <BookOpen className="w-3.5 h-3.5 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-[#0e0c0a] text-xs tracking-wide">CELTA Prep</span>
              <span className="font-body text-[#c9a84c] text-[9px] font-semibold uppercase tracking-widest">Morocco</span>
            </div>
          </a>
          <Button asChild size="sm" className="btn-shine bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] font-body font-bold shadow-md text-xs px-4">
            <a href={buyLink} target="_blank" rel="noopener noreferrer">
              Get Bundle — $39
            </a>
          </Button>
        </div>
        {/* Gold progress line */}
        <div className="h-0.5 bg-gradient-to-r from-[#c9a84c] to-[#b85c38] opacity-60" />
      </nav>

      {/* ── HERO ── */}
      <section className="pt-28 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ede5d8] via-[#f5f0e8] to-[#e8e0d0]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c9a84c]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#b85c38]/6 rounded-full blur-3xl" />
        <div className="absolute inset-0 dot-pattern opacity-20" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          {/* Urgency pill */}
          <div className="inline-flex items-center gap-2 bg-[#b85c38]/10 border border-[#b85c38]/30 px-4 py-1.5 rounded-full mb-6">
            <AlertTriangle className="w-3.5 h-3.5 text-[#b85c38]" />
            <span className="font-body text-xs text-[#b85c38] uppercase tracking-widest font-bold">Most candidates don't read a single model assignment before CELTA</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#0e0c0a] leading-[1.1] mb-6">
            See exactly what a{' '}
            <span className="gold-shimmer">passing CELTA</span>
            {' '}assignment looks like
          </h1>

          <p className="font-body text-lg md:text-xl text-[#6b6560] mb-8 max-w-2xl mx-auto leading-relaxed">
            4 complete model assignments. 52 trainer annotations. Every mark explained.
            Stop guessing what Cambridge wants — read it.
          </p>

          {/* Star row */}
          <div className="flex items-center justify-center gap-1.5 mb-8">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#c9a84c] text-[#c9a84c]" />)}
            <span className="font-body text-sm text-[#6b6560] ml-1">Used by 40+ CELTA candidates</span>
          </div>

          {/* CTA block */}
          <div className="inline-flex flex-col items-center gap-3">
            <Button asChild size="lg" className="btn-shine font-body font-bold text-lg px-12 py-7 bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#d4b96a] hover:to-[#c9a84c] shadow-2xl shadow-[#c9a84c]/30 transition-all duration-300">
              <a href={buyLink} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Get the Bundle — $39
                <ArrowRight className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <div className="flex items-center gap-4 text-xs text-[#6b6560] font-body">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Instant delivery via WhatsApp</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Delivered in under 2 hours</span>
            </div>
          </div>

          {/* Price anchor */}
          <div className="mt-6 inline-flex items-baseline gap-2">
            <span className="font-body text-sm text-[#a09890] line-through">$330 total value</span>
            <span className="font-display text-2xl font-bold text-[#0e0c0a]">$39</span>
            <span className="font-body text-sm text-[#c9a84c] font-semibold">today only</span>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-16 bg-[#0e0c0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#f5f0e8] mb-4">
              The problem no one talks about
            </h2>
            <p className="font-body text-lg text-[#a09890] leading-relaxed">
              CELTA gives you 4 written assignments. Each one has specific criteria.
              Most candidates write them without ever seeing what a passing version looks like.
              That's like sitting a driving test without ever watching someone drive.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { stat: '60%', label: 'of CELTA candidates need to resubmit at least one assignment', icon: AlertTriangle, color: '#b85c38' },
              { stat: '4', label: 'written assignments — each with criteria most candidates only understand after failing', icon: FileText, color: '#c9a84c' },
              { stat: '0', label: 'model assignment examples provided by most CELTA centres before the course starts', icon: Shield, color: '#6b6560' },
            ].map((item, i) => (
              <div key={i} className="bg-[#1a1816] rounded-2xl p-6 border border-[#2a2725] text-center">
                <item.icon className="w-8 h-8 mx-auto mb-3" style={{ color: item.color }} />
                <p className="font-display text-4xl font-bold mb-2" style={{ color: item.color }}>{item.stat}</p>
                <p className="font-body text-sm text-[#a09890] leading-snug">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-gradient-to-r from-[#c9a84c]/10 via-[#c9a84c]/20 to-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-2xl p-6 text-center">
            <p className="font-display text-xl md:text-2xl text-[#f5f0e8] font-semibold">
              This bundle solves that problem in 46 pages.
            </p>
            <p className="font-body text-sm text-[#a09890] mt-2">
              Read one passing assignment with trainer commentary. Suddenly the criteria make sense.
            </p>
          </div>
        </div>
      </section>

      {/* ── WHAT'S INSIDE ── */}
      <section className="py-16 md:py-24 bg-[#f5f0e8] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 px-4 py-1.5 rounded-full mb-5">
              <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-bold">What's inside</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0e0c0a] mb-4">
              4 assignments.{' '}
              <span className="text-[#c9a84c]">52 annotations.</span>
              {' '}Zero guessing.
            </h2>
            <p className="font-body text-lg text-[#6b6560] max-w-2xl mx-auto">
              Each assignment comes with inline trainer comments explaining every key decision — what earned marks and what would have caused a resubmission.
            </p>
          </div>

          <div className="space-y-4">
            {assignments.map((a, i) => (
              <AssignmentCard key={i} a={a} index={i} />
            ))}
          </div>

          {/* Also includes */}
          <div className="mt-8 bg-white rounded-2xl border border-[#d4cdc0] p-6 md:p-8">
            <h3 className="font-display text-xl font-bold text-[#0e0c0a] mb-5 flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#c9a84c]" />
              Also included in the bundle
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'CELTA academic language phrase bank — 60+ phrases trainers reward',
                'Resubmission risk checklist — run through it before submitting each assignment',
                '"Before vs after" drafts for Assignments 1 and 3',
                'Trainer commentary audio notes (MP3) — Rachid walks through Assignment 3 live',
                'Common mistakes index — the 22 most frequent errors that cause resubmissions',
                'Instant WhatsApp access to ask Rachid one follow-up question per assignment',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#f5f0e8] border border-[#e8e0d0]">
                  <CheckCircle2 className="w-4 h-4 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                  <span className="font-body text-sm text-[#4a4540]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE STACK ── */}
      <section className="py-16 bg-[#e8e0d0] relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20" />
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#0e0c0a] mb-3">
              What you're actually getting
            </h2>
            <p className="font-body text-[#6b6560]">If you bought each element separately from a private CELTA tutor:</p>
          </div>

          <div className="bg-white rounded-2xl border border-[#d4cdc0] overflow-hidden shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0e0c0a] to-[#1a1816] px-6 py-4">
              <div className="flex justify-between items-center">
                <span className="font-body text-sm font-semibold text-[#a09890] uppercase tracking-widest">What's included</span>
                <span className="font-body text-sm font-semibold text-[#a09890] uppercase tracking-widest">Value</span>
              </div>
            </div>

            {/* Stack items */}
            <div className="divide-y divide-[#f5f0e8]">
              {valueStack.map((item, i) => (
                <div key={i} className="flex items-center justify-between px-6 py-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#c9a84c] flex-shrink-0" />
                    <span className="font-body text-sm text-[#0e0c0a]">{item.item}</span>
                  </div>
                  <span className="font-body text-sm font-bold text-[#c9a84c] ml-4 flex-shrink-0">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="bg-[#f5f0e8] px-6 py-4 flex justify-between items-center border-t border-[#d4cdc0]">
              <span className="font-body font-bold text-[#0e0c0a]">Total value</span>
              <span className="font-body text-lg font-bold text-[#6b6560] line-through">$330</span>
            </div>

            {/* Price */}
            <div className="px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-body text-sm text-[#6b6560]">Your price today</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display text-5xl font-bold text-[#0e0c0a]">$39</span>
                  <span className="font-body text-[#c9a84c] font-semibold">USD</span>
                </div>
                <p className="font-body text-xs text-[#c9a84c] font-semibold mt-1">💳 Paid via WhatsApp — Bank Transfer, PayPal, or Wise</p>
              </div>
              <Button asChild size="lg" className="btn-shine font-body font-bold px-8 py-6 bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#d4b96a] hover:to-[#c9a84c] shadow-lg shadow-[#c9a84c]/25 transition-all duration-300 whitespace-nowrap">
                <a href={buyLink} target="_blank" rel="noopener noreferrer">
                  Get It Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16 bg-[#f5f0e8]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl font-bold text-[#0e0c0a]">What candidates said</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { quote: "I read Assignment 3 the night before my CELTA started. I finally understood what FMUP analysis actually means. My Assignment 3 passed first time.", name: "Karima B.", location: "Casablanca", result: "Assignment 3 — first attempt pass" },
              { quote: "The trainer annotations are worth 10x the price. You see a sentence and then you see why it works. That's what no YouTube video can give you.", name: "Omar T.", location: "Rabat", result: "All 4 assignments — first attempt" },
              { quote: "I had one resubmission before I found this bundle. After reading the before/after drafts, I completely rewrote my approach. Passed everything the second time.", name: "Nadia H.", location: "Fès", result: "Turned resubmissions into passes" },
            ].map((t, i) => (
              <div key={i} className="premium-card bg-white rounded-2xl p-6 border border-[#d4cdc0] shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c9a84c]/60 via-[#c9a84c] to-[#c9a84c]/60" />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[#c9a84c] text-[#c9a84c]" />)}
                </div>
                <p className="font-body text-sm text-[#0e0c0a] italic leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
                <Badge className="bg-[#b85c38] text-white text-xs mb-3">{t.result}</Badge>
                <div className="flex items-center gap-2 pt-3 border-t border-[#e8e0d0]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c9a84c] to-[#b85c38] flex items-center justify-center text-white text-xs font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-body text-xs font-semibold text-[#0e0c0a]">{t.name}</p>
                    <p className="font-body text-xs text-[#6b6560]">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS THIS FOR ── */}
      <section className="py-16 bg-[#0e0c0a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)', backgroundSize: '28px 28px' }} />
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-[#f5f0e8] text-center mb-10">
            This is for you if...
          </h2>
          <div className="space-y-3">
            {[
              "You're registered for CELTA and want to know what the assignments actually look like before you start",
              "You've started CELTA and your first assignment came back needing resubmission",
              "You can't afford the Full Prep Program right now but want the most important tool in the kit",
              "You're a strong teacher but academic writing isn't your comfort zone",
              "You want to aim for Pass A, not just Pass — and know the difference is in the assignments",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-[#1a1816] rounded-xl p-4 border border-[#2a2725]">
                <CheckCircle2 className="w-5 h-5 text-[#c9a84c] flex-shrink-0 mt-0.5" />
                <span className="font-body text-sm text-[#f5f0e8]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 bg-[#0e0c0a] relative overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />
        <div className="max-w-2xl mx-auto px-4 relative z-10">
          <h2 className="font-display text-3xl font-bold text-[#f5f0e8] text-center mb-8">Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-20 bg-[#0e0c0a] relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#c9a84c]/6 rounded-full blur-3xl" />
        <div className="max-w-2xl mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/25 px-4 py-1.5 rounded-full mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c] animate-pulse" />
            <span className="font-body text-xs text-[#c9a84c] uppercase tracking-widest font-bold">Instant delivery via WhatsApp</span>
          </div>

          <h2 className="font-display text-3xl md:text-5xl font-bold text-[#f5f0e8] mb-5 leading-tight">
            Stop writing assignments{' '}
            <span className="text-[#c9a84c]">blind.</span>
          </h2>
          <p className="font-body text-lg text-[#a09890] mb-8 max-w-xl mx-auto leading-relaxed">
            For the cost of a lunch, you get to read exactly what a passing CELTA assignment looks like — before you sit down to write yours.
          </p>

          <Button asChild size="lg" className="btn-shine font-body font-bold text-xl px-14 py-8 bg-gradient-to-r from-[#c9a84c] to-[#b8973b] text-[#0e0c0a] hover:from-[#d4b96a] hover:to-[#c9a84c] shadow-2xl shadow-[#c9a84c]/25 transition-all duration-300">
            <a href={buyLink} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-5 h-5 mr-2" />
              Get the Bundle — $39
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
          </Button>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-[#6b6560] text-sm font-body">
            <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-[#c9a84c]" /> No account needed</span>
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#c9a84c]" /> Delivered in under 2 hours</span>
            <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-[#c9a84c]" /> CELTA-certified trainer</span>
          </div>

          <div className="mt-10 pt-8 border-t border-[#2a2725]">
            <p className="font-body text-sm text-[#6b6560] mb-3">Want the full preparation experience?</p>
            <a href="/#pricing" className="font-body text-sm font-semibold text-[#c9a84c] hover:underline">
              See the Full Prep Program ($149) →
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-6 bg-[#0e0c0a] border-t border-[#1a1816]">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-[#6b6560]">
            © {new Date().getFullYear()} Rachid Chfirra · CELTA Prep Morocco
          </p>
          <a href="/" className="font-body text-xs text-[#a09890] hover:text-[#c9a84c] transition-colors">
            ← Back to main site
          </a>
        </div>
      </footer>
    </div>
  )
}
