// Google Analytics utilities

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || ''

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export const trackEvent = (
  action: string,
  category: string,
  label: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && GA_MEASUREMENT_ID) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Track CTA clicks
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent('click', 'CTA', `${ctaName} - ${location}`)
}

// Track quiz completion
export const trackQuizCompletion = (score: number, total: number) => {
  trackEvent('complete', 'Quiz', `Score: ${score}/${total}`, score)
}

// Track email signup
export const trackEmailSignup = (source: string) => {
  trackEvent('signup', 'Email', source)
}

// Track pricing card view
export const trackPricingCardView = (tier: string) => {
  trackEvent('view', 'Pricing', tier)
}

// Track video play
export const trackVideoPlay = (videoName: string) => {
  trackEvent('play', 'Video', videoName)
}

// Track download
export const trackDownload = (resourceName: string) => {
  trackEvent('download', 'Resource', resourceName)
}

// Track WhatsApp click
export const trackWhatsAppClick = (context: string) => {
  trackEvent('click', 'WhatsApp', context)
}

// Declare gtag on window
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event',
      targetIdOrAction: string,
      config?: Record<string, unknown>
    ) => void
  }
}
