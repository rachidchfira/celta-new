// Google Analytics Utilities
// GA4 Measurement ID - Replace with your actual ID
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Type declaration for window.gtag
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === 'undefined') return;
  
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
  });
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window === 'undefined') return;
  window.gtag?.('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

// Track custom events
export const trackEvent = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Predefined event tracking functions
export const trackCTAClick = (ctaName: string, location: string) => {
  trackEvent({
    action: 'cta_click',
    category: 'CTA',
    label: `${ctaName} - ${location}`,
  });
};

export const trackQuizCompletion = (score: number, total: number) => {
  trackEvent({
    action: 'quiz_completed',
    category: 'Quiz',
    label: `${score}/${total}`,
    value: score,
  });
};

export const trackEmailSignup = (source: string) => {
  trackEvent({
    action: 'email_signup',
    category: 'Lead Generation',
    label: source,
  });
};

export const trackPricingCardView = (planName: string) => {
  trackEvent({
    action: 'pricing_card_view',
    category: 'Pricing',
    label: planName,
  });
};

export const trackVideoPlay = (videoName: string) => {
  trackEvent({
    action: 'video_play',
    category: 'Video',
    label: videoName,
  });
};

export const trackDownload = (resourceName: string) => {
  trackEvent({
    action: 'download',
    category: 'Resource',
    label: resourceName,
  });
};
