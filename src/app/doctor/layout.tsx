import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CELTA Lesson Plan Doctor | Free AI Diagnostic',
  description: 'Get expert AI feedback on your CELTA lesson plan in seconds. 7 specialist diagnostic tools analyse your aims, staging, MFPA, and task progression — exactly like a senior CELTA trainer.',
  openGraph: {
    title: 'CELTA Lesson Plan Doctor',
    description: 'Free AI-powered CELTA lesson plan analysis. Instant verdict, diagnostic scores, and priority fixes.',
    type: 'website',
  },
}

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
  return children
}
