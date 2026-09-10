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
  ? rawSiteUrl
  : `https://${rawSiteUrl}`;

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
  // Schema 1: Organization Schema
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: event.name,
    url: siteUrl,
    logo: `${siteUrl}/logos/tanzania-buildcon-logo.png`,
  };

  // Schema 2: Website Schema
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: event.name,
    url: siteUrl,
  };

  // Schema 3: Event Schema (Google Search par Dates & Venue Snippet Dikhane Ke Liye)
  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "ExhibitionEvent",
    name: event.name,
    description: event.descriptor,
    startDate: event.dates.start, // Format: YYYY-MM-DD
    endDate: event.dates.end,     // Format: YYYY-MM-DD
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.venue.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.venue.city,
        addressCountry: event.venue.country || "TZ",
      },
    },
    organizer: {
      "@type": "Organization",
      name: event.name,
      url: siteUrl,
    },
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
        {/* Structured Data / Rich Snippets for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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