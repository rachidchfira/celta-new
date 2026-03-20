import { SocialProofEvent, Testimonial, WeekData, PricingTier, Persona, FAQ, QuizQuestion } from './types'

// WhatsApp number
export const WHATSAPP_NUMBER = '84703027485'

// WhatsApp message generator
export const getWhatsAppLink = (message: string) => 
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`

// Social Proof Notification Data
export const socialProofEvents: SocialProofEvent[] = [
  { type: 'enrollment', name: 'Amina', location: 'Casablanca', action: 'just enrolled in the Full Prep Program' },
  { type: 'download', name: 'Youssef', location: 'Rabat', action: 'downloaded the CELTA MINDSET guide' },
  { type: 'enrollment', name: 'Fatima', location: 'Marrakech', action: 'reserved a VIP Intensive spot' },
  { type: 'download', name: 'Karim', location: 'Fès', action: 'downloaded See Your Learner guide' },
  { type: 'enrollment', name: 'Sara', location: 'Tangier', action: 'joined the Full Prep Program' },
  { type: 'download', name: 'Omar', location: 'Agadir', action: 'downloaded Think Like a CELTA Trainer' },
  { type: 'enrollment', name: 'Nadia', location: 'Casablanca', action: 'enrolled in the Self-Study program' },
  { type: 'quiz', name: 'Someone', location: 'Morocco', action: 'just completed the CELTA Readiness Quiz' },
]

// Quiz Questions
export const quizQuestions: QuizQuestion[] = [
  {
    question: "How would you describe your current English teaching experience?",
    options: [
      { text: "I have no formal teaching experience yet", score: 1 },
      { text: "I've done some tutoring or informal teaching", score: 2 },
      { text: "I've been teaching for 1-2 years without certification", score: 3 },
      { text: "I've been teaching for 3+ years professionally", score: 4 }
    ]
  },
  {
    question: "How familiar are you with CELTA assessment criteria?",
    options: [
      { text: "I've never heard of them before", score: 1 },
      { text: "I've read about them but don't fully understand", score: 2 },
      { text: "I have a basic understanding of the main criteria", score: 3 },
      { text: "I've studied them thoroughly and could explain them", score: 4 }
    ]
  },
  {
    question: "How confident are you in planning a 40-minute lesson?",
    options: [
      { text: "Not confident at all - I wouldn't know where to start", score: 1 },
      { text: "Somewhat confident, but I'd need guidance", score: 2 },
      { text: "Confident, but I want to refine my approach", score: 3 },
      { text: "Very confident - I plan lessons regularly", score: 4 }
    ]
  },
  {
    question: "What's your experience with concept checking questions (CCQs)?",
    options: [
      { text: "I don't know what CCQs are", score: 1 },
      { text: "I've heard of them but never used them", score: 2 },
      { text: "I use them occasionally but want to improve", score: 3 },
      { text: "I use them effectively in most lessons", score: 4 }
    ]
  },
  {
    question: "How would you rate your English grammar knowledge for teaching?",
    options: [
      { text: "I struggle to explain grammar rules", score: 1 },
      { text: "I know the basics but find it hard to explain", score: 2 },
      { text: "I'm comfortable with most grammar points", score: 3 },
      { text: "I can confidently explain complex grammar", score: 4 }
    ]
  },
  {
    question: "Have you ever received feedback on your teaching?",
    options: [
      { text: "Never - I haven't taught formally", score: 1 },
      { text: "Occasionally from students or peers", score: 2 },
      { text: "Regularly from colleagues or supervisors", score: 3 },
      { text: "Yes, through formal observation and training", score: 4 }
    ]
  },
  {
    question: "How do you handle unexpected situations in a learning environment?",
    options: [
      { text: "I get very anxious and struggle to adapt", score: 1 },
      { text: "I try my best but often feel overwhelmed", score: 2 },
      { text: "I can adapt with some hesitation", score: 3 },
      { text: "I stay calm and adjust naturally", score: 4 }
    ]
  }
]

// Testimonials
export const testimonials: Testimonial[] = [
  {
    quote: "I went from terrified to confident in 4 weeks. Passed CELTA first attempt. Rachid knows exactly what assessors want.",
    name: "Sara M.",
    location: "Casablanca",
    result: "Passed CELTA First Attempt"
  },
  {
    quote: "The mock teaching day was the most valuable thing I've ever done as a teacher. Nothing surprised me during the real CELTA.",
    name: "Youssef A.",
    location: "Rabat",
    result: "First Attempt Pass"
  },
  {
    quote: "I tried to prepare alone and failed. With this program I actually understood why — and fixed everything.",
    name: "Nadia B.",
    location: "Fès",
    result: "Second Attempt Success"
  }
]

// Curriculum Weeks
export const curriculumWeeks: WeekData[] = [
  {
    week: 1,
    title: "CELTA Decoded",
    outcomes: [
      "Understand every CELTA assessment criterion and what 'pass' actually looks like",
      "Learn to read and analyze lesson plans like a CELTA assessor",
      "Identify the 7 most common mistakes Moroccan teachers make",
      "Master the CELTA terminology that confuses most candidates"
    ],
    feeling: "After Week 1: The mystery is gone. You finally understand what CELTA actually demands."
  },
  {
    week: 2,
    title: "Language Systems the CELTA Way",
    outcomes: [
      "Teach grammar, vocabulary, and phonology exactly as CELTA expects",
      "Master CCQs (concept-checking questions) that demonstrate understanding",
      "Design skills-based lessons (reading, listening, speaking, writing)",
      "Create materials that show your creativity within CELTA constraints"
    ],
    feeling: "After Week 2: You're teaching differently already. Your explanations are clearer, your activities are purposeful."
  },
  {
    week: 3,
    title: "Teaching Practice Simulation",
    outcomes: [
      "Deliver micro-teaches with real peer and instructor feedback",
      "Learn to handle unexpected student behavior gracefully",
      "Practice recovering from mistakes mid-lesson without panicking",
      "Build the muscle memory of timing, staging, and transitions"
    ],
    feeling: "After Week 3: You've taught. You've been critiqued. You've improved. The fear is becoming excitement."
  },
  {
    week: 4,
    title: "Full CELTA Simulation Day",
    outcomes: [
      "Experience a complete mock teaching day exactly like real CELTA",
      "Submit and polish all 4 written assignments with feedback",
      "Develop your post-CELTA career strategy for teaching abroad",
      "Receive your readiness assessment and personalized action plan"
    ],
    feeling: "After Week 4: You're ready. Not hoping you're ready — KNOWING you're ready."
  }
]

// Pricing Tiers
export const pricingTiers: PricingTier[] = [
  {
    name: "Self-Study Support",
    price: "80",
    description: "Perfect for independent learners on a budget.",
    features: [
      'Full recorded curriculum access',
      'All templates and materials',
      'Community WhatsApp group',
      'Self-paced learning'
    ],
    ctaMessage: "Hi Rachid, I'm interested in the Self-Study Support ($80 USD). I'm from [YOUR COUNTRY]"
  },
  {
    name: "Full Prep Program",
    price: "150",
    description: "The complete preparation experience.",
    isPopular: true,
    features: [
      'All live Zoom sessions',
      '2× personal teaching feedback',
      'Priority WhatsApp support',
      'Full mock teaching day',
      'All assignments reviewed',
      'Limited to 12 students'
    ],
    ctaMessage: "Hi Rachid, I'm interested in the Full Prep Program ($150 USD). I'm from [YOUR COUNTRY]",
    limited: true
  },
  {
    name: "VIP Intensive",
    price: "350",
    description: "Maximum support for maximum results.",
    features: [
      'Everything in Full Program',
      '5× private 1-on-1 sessions',
      'All assignments polished by instructor',
      'Priority WhatsApp (same-day response)',
      'Post-CELTA job strategy call',
      'DELTA pathway roadmap',
      'Maximum 3 students'
    ],
    ctaMessage: "Hi Rachid, I'm interested in the VIP Intensive ($350 USD). I'm from [YOUR COUNTRY]",
    limited: true
  }
]

// Personas data - icons are handled in the PersonaSection component
export const personasData = [
  {
    iconKey: 'GraduationCap',
    title: "The Ambitious Graduate",
    description: "You're finishing your English degree at a Moroccan university. You want to teach internationally — Vietnam, Korea, the Gulf, Europe — but you've never taught formally. CELTA seems like something 'other people' do. You check Instagram at night wondering if you'll ever get out.",
    cta: "If that's you, this program was built for you."
  },
  {
    iconKey: 'BookOpen',
    title: "The Novice Teacher",
    description: "You're already teaching at a private school or language center in Morocco. You don't have formal certification. Every day brings a whisper of impostor syndrome. You've known CELTA would change your career for 2 years now — but you don't know where to start.",
    cta: "If that's you, this program was built for you."
  },
  {
    iconKey: 'Target',
    title: "The Second-Chance Candidate",
    description: "You tried CELTA before. Maybe you withdrew. Maybe you didn't pass. You know you can do this — you just need someone to show you exactly what went wrong and how to fix it before you try again. You're not giving up on your dream.",
    cta: "If that's you, this program was built for you."
  }
]

// FAQs
export const faqs: FAQ[] = [
  {
    q: "I've never taught before. Is this program too advanced for me?",
    a: "This program was specifically designed for people exactly like you. About 60% of our students have never formally taught before. We start from the fundamentals and build up. By Week 4, you'll be surprised how natural teaching feels."
  },
  {
    q: "Will this actually help me pass CELTA, or is it just general teaching advice?",
    a: "Everything in this program is CELTA-specific. We don't teach 'good teaching' — we teach 'what CELTA assessors look for.' The mock teaching day alone replicates the exact pressure and format you'll face. That's why 94% of our students pass on their first attempt."
  },
  {
    q: "What if I can't attend all the live sessions?",
    a: "All live sessions are recorded and available within 24 hours. However, the Full Program and VIP tiers include the mock teaching day, which we strongly recommend attending live. We schedule sessions at times that work for working teachers."
  },
  {
    q: "How is this different from free CELTA prep videos on YouTube?",
    a: "YouTube gives you information. We give you transformation. You can watch 100 videos about swimming, but you won't learn to swim until you get in the water with a coach. Our program includes actual teaching practice with real feedback — that's the difference that creates results."
  },
  {
    q: "I already registered for CELTA. Is it too late to join?",
    a: "It's never too late, but earlier is better. Ideally, complete this program 2-4 weeks before your CELTA starts. If your CELTA is sooner, contact us — we may be able to accelerate your preparation."
  },
  {
    q: "What if my English isn't perfect?",
    a: "CELTA doesn't require native-level English. It requires clear, accurate English appropriate for teaching. If you can understand this page, your English is sufficient. We'll help you identify and fix any language issues that might affect your teaching."
  },
  {
    q: "Do you offer payment plans?",
    a: "Yes. For the Full Program and VIP tiers, we can split payment into 2 installments. Contact us via WhatsApp to discuss payment options."
  },
  {
    q: "What happens after I complete the program?",
    a: "You'll receive a Certificate of Completion, a personalized readiness assessment, and (for Full and VIP tiers) continued WhatsApp support until your actual CELTA course ends. We don't abandon you after 4 weeks."
  }
]

// Problem thoughts
export const problemThoughts = [
  '"CELTA is too hard for someone with my background."',
  '"I\'ll embarrass myself teaching in front of assessors."',
  '"What if I waste thousands of dirhams and fail?"',
  '"My written assignments won\'t be good enough."',
  '"There\'s no one in Morocco who can actually prepare me for this."'
]

// Offer items
export const offerItems = [
  { icon: 'Video', title: '4 Weeks of Live Zoom Sessions', value: '8+ hours of live instruction' },
  { icon: 'BookOpen', title: 'Complete Curriculum', value: 'Every CELTA criterion covered' },
  { icon: 'Target', title: '2× Personal Teaching Feedback', value: 'Detailed video analysis' },
  { icon: 'MessageCircle', title: 'WhatsApp Support', value: 'Questions answered within 24h' },
  { icon: 'Users', title: 'Mock Teaching Day', value: 'Full CELTA simulation' },
  { icon: 'Sparkles', title: 'All 4 Assignments Reviewed', value: 'Written feedback on drafts' },
  { icon: 'MapPin', title: 'Morocco-Specific Examples', value: 'Context you can relate to' },
  { icon: 'Award', title: 'Certificate of Completion', value: 'Document your preparation' }
]

// Stats
export const stats = [
  { number: 47, suffix: '', label: 'Teachers Trained' },
  { number: 94, suffix: '%', label: 'First-Attempt Pass Rate' },
  { number: 4.9, suffix: '/5', label: 'Student Satisfaction' },
  { number: 5, suffix: '', label: 'Countries Graduates Teach In' }
]

// Lead magnet booklets preview
export const bookletPreviews = [
  { icon: 'FileText', title: 'See Your Learner', desc: 'Assignment 1 Guide' },
  { icon: 'BookOpen', title: 'Think Like a CELTA Trainer', desc: 'Insider perspective' },
  { icon: 'Target', title: 'The CELTA MINDSET', desc: 'Mental resilience' }
]
