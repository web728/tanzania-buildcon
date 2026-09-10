import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { event } from "@/config/event";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { Analytics } from "@/components/ui/Analytics";
import { InitialSiteLoader } from "@/components/ui/InitialSiteLoader";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || event.website;
const siteUrl = rawSiteUrl.startsWith("http://") || rawSiteUrl.startsWith("https://")
  ? rawSiteUrl.replace(/\/$/, "")
  : `https://${rawSiteUrl.replace(/\/$/, "")}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  // Google Search Verification
  verification: {
    google: "fvgeKPlfhI9tgn9H1afLFZdKbjHXd16CoEX6JlIv4ik",
  },

  // Canonical Tag for Search Engines
  alternates: {
    canonical: "/",
  },

  title: {
    default: `${event.name} | ${event.dates.display}, ${event.venue.fullLocation}`,
    template: `%s | ${event.shortName}`,
  },
  description: `${event.descriptor}. ${event.dates.display} at ${event.venue.fullLocation}. ${event.brandLines.main}`,

  // Indexing rules for Google
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

  keywords: [
    "Tanzania construction exhibition",
    "building exhibition Tanzania",
    "construction expo Tanzania",
    "building materials exhibition Tanzania",
    "construction machinery expo Tanzania",
    "Dar es Salaam construction exhibition",
    "Tanzania Buildcon",
    "Tanzania Buildcon International Expo",
    "East Africa construction trade show",
  ],

  openGraph: {
    type: "website",
    siteName: event.name,
    title: event.name,
    description: event.descriptor,
    url: siteUrl,
    locale: "en_US",
    images: [
      {
        url: "/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${event.name} Banner`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: event.name,
    description: event.descriptor,
    images: ["/images/og/og-default.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Combined Master Schema (Organization + WebSite + SiteNavigationElement)
  const masterGraphSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": event.name,
        "url": siteUrl,
        "logo": `${siteUrl}/logos/tanzania-buildcon-logo.png`,
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": event.name,
        "publisher": { "@id": `${siteUrl}/#organization` },
      },
      // Navigation Schema for Google Sitelinks (Sub-headings in search)
      {
        "@type": "SiteNavigationElement",
        "@id": `${siteUrl}/#header-nav`,
        "name": [
          "Exhibition Profile",
          "Book A Stand",
          "Who Should Exhibit",
          "Register To Visit",
          "Why Visit",
          "About Expo"
        ],
        "url": [
          `${siteUrl}/exhibition-profile`,
          `${siteUrl}/book-a-stand`,
          `${siteUrl}/who-should-exhibit`,
          `${siteUrl}/register-to-visit`,
          `${siteUrl}/who-should-visit`,
          `${siteUrl}/about`
        ]
      }
    ],
  };

  // 2. Fully Compliant Event Schema (All Google Warnings Fixed)
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    "@id": `${siteUrl}/#event`,
    "name": event.name,
    "alternateName": event.shortName,
    "description": event.descriptor,
    "startDate": event.dates.start,
    "endDate": event.dates.end,
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "url": siteUrl,
    "image": `${siteUrl}/images/og/og-default.jpg`,
    "location": {
      "@type": "Place",
      "name": event.venue.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": event.venue.name,
        "addressLocality": event.venue.city,
        "addressCountry": event.venue.country || "TZ",
      },
    },
    "organizer": {
      "@type": "Organization",
      "name": "Futurex Trade Fair & Events Pvt. Ltd.",
      "url": siteUrl,
    },
    // Fixes 'performer' missing warning
    "performer": {
      "@type": "Organization",
      "name": "Futurex Trade Fair & Events Pvt. Ltd.",
    },
    // Fixes 'price', 'priceCurrency', and 'validFrom' warnings
    "offers": [
      {
        "@type": "Offer",
        "name": "Visitor Registration",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": `${siteUrl}/register-to-visit`,
        "validFrom": "2026-01-01",
      },
      {
        "@type": "Offer",
        "name": "Exhibitor Space Booking",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": `${siteUrl}/book-a-stand`,
        "validFrom": "2026-01-01",
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-white text-brand-dark font-sans"
        suppressHydrationWarning
      >
        {/* Master Schema: Organization + Website + Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(masterGraphSchema) }}
        />
        {/* Complete Warning-Free Event Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
        />

        {/* Initial First-Load Experience Preloader */}
        <InitialSiteLoader />

        {children}
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}