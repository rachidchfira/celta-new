import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/providers/AuthProvider";
import { GA_MEASUREMENT_ID } from "@/lib/ga";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://celtaprepmorocco.com/#organization",
      "name": "CELTA Prep Morocco",
      "url": "https://celtaprepmorocco.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://celtaprepmorocco.com/logo.png"
      },
      "founder": {
        "@type": "Person",
        "name": "Rachid Chfirra",
        "jobTitle": "CELTA Certified Trainer",
        "description": "CELTA Certified trainer with 5+ years of EFL teaching experience across Morocco and Vietnam"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "MA",
        "addressRegion": "Morocco"
      },
      "sameAs": [
        "https://www.linkedin.com/in/rachid-chfirra",
        "https://wa.me/84703027485"
      ]
    },
    {
      "@type": "Course",
      "@id": "https://celtaprepmorocco.com/#course",
      "name": "CELTA Prep Morocco",
      "description": "The only CELTA preparation program designed specifically for Moroccan teachers. A 4-week live online program covering CELTA assessment criteria, teaching practice, and written assignment guidance.",
      "provider": {
        "@type": "Organization",
        "@id": "https://celtaprepmorocco.com/#organization"
      },
      "instructor": {
        "@type": "Person",
        "name": "Rachid Chfirra"
      },
      "timeRequired": "P4W",
      "educationalLevel": "Professional Development",
      "occupationalCredentialAwarded": "CELTA Preparation Certificate",
      "offers": [
        {
          "@type": "Offer",
          "name": "Self-Study Support",
          "price": "80",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Full Prep Program",
          "price": "150",
          "priceCurrency": "USD",
          "availability": "https://schema.org/LimitedAvailability"
        },
        {
          "@type": "Offer",
          "name": "VIP Intensive",
          "price": "350",
          "priceCurrency": "USD",
          "availability": "https://schema.org/LimitedAvailability"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "47",
        "bestRating": "5"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://celtaprepmorocco.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "I've never taught before. Is this program too advanced for me?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This program was specifically designed for people exactly like you. About 60% of our students have never formally taught before. We start from the fundamentals and build up."
          }
        },
        {
          "@type": "Question",
          "name": "Will this actually help me pass CELTA?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Everything in this program is CELTA-specific. We don't teach 'good teaching' — we teach 'what CELTA assessors look for.' 94% of our students pass on their first attempt."
          }
        },
        {
          "@type": "Question",
          "name": "Do you offer payment plans?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. For the Full Program and VIP tiers, we can split payment into 2 installments. Contact us via WhatsApp to discuss payment options."
          }
        }
      ]
    },
    {
      "@type": "Product",
      "@id": "https://celtaprepmorocco.com/#product",
      "name": "CELTA Prep Morocco - Full Prep Program",
      "description": "4-week live online CELTA preparation program for Moroccan teachers",
      "brand": {
        "@type": "Brand",
        "name": "CELTA Prep Morocco"
      },
      "offers": {
        "@type": "Offer",
        "price": "80",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "seller": {
          "@id": "https://celtaprepmorocco.com/#organization"
        }
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "47"
      }
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL("https://celtaprepmorocco.com"),
  title: {
    default: "CELTA Prep Morocco | Pass CELTA on Your First Attempt",
    template: "%s | CELTA Prep Morocco"
  },
  description: "The only CELTA preparation program designed specifically for Moroccan teachers. Join Rachid Chfirra's 4-week intensive program with 94% first-attempt pass rate. Limited to 12 students per cohort.",
  keywords: [
    "CELTA Morocco",
    "CELTA preparation",
    "CELTA course Morocco",
    "English teacher training Morocco",
    "TEFL certification Morocco",
    "TESOL Morocco",
    "CELTA prep course",
    "Rachid Chfirra",
    "CELTA Pass B",
    "CELTA first attempt pass",
    "teach English abroad Morocco",
    "CELTA Casablanca",
    "CELTA Rabat"
  ],
  authors: [{ name: "Rachid Chfirra", url: "https://celtaprepmorocco.com" }],
  creator: "Rachid Chfirra",
  publisher: "CELTA Prep Morocco",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["fr_MA", "ar_MA"],
    url: "https://celtaprepmorocco.com",
    siteName: "CELTA Prep Morocco",
    title: "CELTA Prep Morocco | Pass CELTA on Your First Attempt",
    description: "The only CELTA preparation program designed specifically for Moroccan teachers. 94% first-attempt pass rate. Limited cohorts.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CELTA Prep Morocco - Professional CELTA Preparation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CELTA Prep Morocco | Pass on Your First Attempt",
    description: "The only CELTA prep program for Moroccan teachers. 94% pass rate. Limited spots.",
    images: ["/og-image.png"],
    creator: "@celtaprepmorocco",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://celtaprepmorocco.com",
  },
  category: "Education",
  classification: "Teacher Training",
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.svg", type: "image/svg+xml" }],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://img.youtube.com" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg?v=2" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        {/* Canonical URL */}
        <link rel="canonical" href="https://celtaprepmorocco.com" />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${outfit.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
